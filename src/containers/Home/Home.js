import { Calendar, Drawer } from 'antd'
import * as R from 'ramda'
import React from 'react'
import NewGameForm from 'forms/NewGameForm'
import ParticipateForm from 'forms/ParticipateForm'
import moment from 'moment'
import { GameInfo } from 'components/GameInfo'
import { Box } from 'noui/Position'
import { factions } from 'config'

const MockedData = [
  {
    image:        'http://dnd.wizards.com/sites/default/files/media/Xanathars_Gallery_Thumb.jpg',
    title:        'Орден Латної Рукавиці',
    startingDate: '2019-02-18',
    startingTime: '12:00',
    range:        [1, 4],
    players:      5,
    characters: [
      {
        id:         0,
        name:       'Kethavel',
        faction:    factions[5],
        experience: 10400,
        renown:     14
      },
      {
        id:         1,
        name:       'Rosty Di Marr',
        faction:    factions[1],
        experience: 2000,
        renown:     4
      }
    ],
    description:  `
    Duis et imperdiet ex. Integer luctus congue velit a pharetra. Vivamus in arcu tincidunt leo efficitur euismod ut sed neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla dignissim ut sem tempor elementum. In euismod, lorem nec ultrices hendrerit, nisi leo viverra orci, viverra consequat massa tortor sit amet leo. Nunc lobortis semper nulla nec eleifend. Duis finibus elementum neque, ac ornare ligula finibus vitae. Suspendisse sit amet commodo velit, ut eleifend tellus. Nunc fermentum enim elementum interdum volutpat. Morbi vel urna et quam tempor cursus. Mauris placerat mauris sed elit tincidunt, a accumsan dolor imperdiet. Pellentesque et ante ante. Pellentesque at imperdiet diam.

Morbi vel urna a ipsum rhoncus placerat. Pellentesque interdum, enim sed commodo suscipit, mauris eros venenatis nibh, quis pellentesque nibh leo vitae justo. Aenean nisl ante, molestie id vestibulum dignissim, volutpat in turpis. Pellentesque eget nunc sit amet sem mollis sollicitudin. Pellentesque a dolor mollis, hendrerit nulla congue, placerat magna. Sed sed vulputate dui, id placerat erat. Sed et nibh eu ex sagittis volutpat in non metus. Vivamus non purus id sapien rutrum imperdiet. Praesent et ligula maximus, faucibus turpis vel, ultrices risus. Donec semper neque eu metus feugiat suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec vitae odio elit. Curabitur feugiat, lectus eu egestas sagittis, nisl massa maximus neque, quis blandit sem orci id risus. Morbi suscipit mi nec nisi egestas commodo vel ac purus. Nullam accumsan ex ac velit lacinia, non tincidunt enim eleifend.
    `,
    tags:         ['AL', 'TPK']
  },
  {
    image:        'http://dnd.wizards.com/sites/default/files/media/Xanathars_Gallery_Thumb.jpg',
    title:        'Title',
    startingDate: '2019-02-18',
    startingTime: '12:00',
    range:        [1, 4],
    players:      5,
    description:  'Description',
    tags:         ['Empty']
  }
]

class Home extends React.PureComponent {
  state = {
    newGameFormVisibility:     false,
    participateGameVisibility: false,
    selectedGame:              null
  }
  
  getEventByDate = date => R.filter(R.propEq('startingDate', date.format('YYYY-MM-DD')), MockedData)
  
  render () {
    return (
      <React.Fragment>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          visible={this.state.newGameFormVisibility}
          onClose={() => this.setState({ newGameFormVisibility: false })}
        >
          <NewGameForm
            onSubmit={game => {
              MockedData.push(game)
            }}
          />
        </Drawer>
        
        <Drawer
          width={640}
          placement="right"
          closable={false}
          visible={this.state.participateGameVisibility}
          onClose={() => this.setState({ participateGameVisibility: false })}
        >
          <ParticipateForm {...this.state.selectedGame} />
        </Drawer>
        
        <Calendar
          onSelect={(...data) => this.setState({ newGameFormVisibility: true })}
          disabledDate={currentDate =>
            currentDate.isBefore(moment().startOf('month')) ||
            currentDate.isAfter(moment().endOf('month'))
          }
          dateCellRender={date => {
            const games = this.getEventByDate(date)
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
      </React.Fragment>
    )
  }
}

export default Home
