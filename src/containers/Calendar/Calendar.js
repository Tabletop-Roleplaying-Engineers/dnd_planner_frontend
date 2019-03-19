import { Calendar as Planner, Drawer, notification, Spin } from 'antd'
import * as R from 'ramda'
import React from 'react'
import NewGameForm from 'forms/NewGameForm'
import ParticipateForm from 'forms/ParticipateForm'
import moment from 'moment'
import { GameInfo } from 'components/GameInfo'
import { modalWidth } from 'config'
import { Mutation, Query } from 'react-apollo'
import { FETCH_GAMES_QUERY, CREATE_GAME_QUERY } from 'api'

class Calendar extends React.PureComponent {
  state = {
    newGameFormVisibility:     false,
    participateGameVisibility: false,
    selectedGame:              null
  }

  render () {
    return (
      <React.Fragment>
        <Query query={FETCH_GAMES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Spin />
            if (error) return <div>Error</div>

            const fetchedGames = R.groupBy(
              R.prop('startingDate'),
              data.games
            )

            return (
              <Planner
                onSelect={(...data) => this.setState({ newGameFormVisibility: true })}
                disabledDate={currentDate =>
                  currentDate.isBefore(moment().startOf('month')) ||
                  currentDate.isAfter(moment().endOf('month'))
                }
                dateCellRender={date => {
                  const games = fetchedGames[date.format('YYYY-MM-DD')] || []

                  return (
                    <React.Fragment>
                      {
                        games.map((game, idx) =>
                          <GameInfo
                            key={idx}
                            mb={10}
                            onClick={e => {
                              e.stopPropagation()

                              this.setState({ participateGameVisibility: true, selectedGame: game })
                            }}
                            {...game}
                          />
                        )
                      }
                    </React.Fragment>
                  )
                }}
              />
            )
          }}
        </Query>
        <Drawer
          width={modalWidth()}
          placement="right"
          closable={false}
          visible={this.state.newGameFormVisibility}
          onClose={() => this.setState({ newGameFormVisibility: false })}
        >
          <Mutation
            mutation={CREATE_GAME_QUERY}
            update={(cache, { data: { createGame } }) => {
              const { games } = cache.readQuery({ query: FETCH_GAMES_QUERY });
              cache.writeQuery({
                query: FETCH_GAMES_QUERY,
                data: { games: games.concat([createGame]) },
              });
            }}
          >
            {(createGame, { loading }) => (
              <Spin spinning={loading}>
                <NewGameForm
                  onSubmit={(game, form) => {
                    createGame({ variables: game })
                    notification.success({
                      message: 'New game added!'
                    })
                    form.resetFields()
                    this.setState({ newGameFormVisibility: false })
                  }}
                />
              </Spin>
            )}
          </Mutation>

        </Drawer>

        <Drawer
          width={modalWidth()}
          placement="right"
          closable={false}
          visible={this.state.participateGameVisibility}
          onClose={() => this.setState({ participateGameVisibility: false })}
        >
          <ParticipateForm {...this.state.selectedGame} />
        </Drawer>
      </React.Fragment>
    )
  }
}

export default Calendar
