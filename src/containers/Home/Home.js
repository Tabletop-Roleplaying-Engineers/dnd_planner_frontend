import { Calendar, Drawer } from 'antd'
import React from 'react'
import NewGameForm from 'components/NewGameForm'
import ParticipateForm from 'components/ParticipateForm'
import moment from 'moment'
import styled from 'styled-components'

const StyledImage = styled.img`
  width: 100%;
  object-fit: cover;
`

class Home extends React.PureComponent {
  state = {
    newGameFormVisibility: false,
    participateGameVisibility: false
  }
  
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
          <NewGameForm />
        </Drawer>
  
        <Drawer
          width={640}
          placement="right"
          closable={false}
          visible={this.state.participateGameVisibility}
          onClose={() => this.setState({ participateGameVisibility: false })}
        >
          <ParticipateForm />
        </Drawer>
        
        <Calendar
          disabledDate={currentDate =>
            currentDate.isBefore(moment().startOf('month')) ||
            currentDate.isAfter(moment().endOf('month'))
          }
          dateCellRender={date => <div>
            <StyledImage
              onClick={() => this.setState({ newGameFormVisibility: true })}
              src="http://dnd.wizards.com/sites/default/files/media/Xanathars_Gallery_Thumb.jpg"
            />
            
            <StyledImage
              onClick={() => this.setState({ participateGameVisibility: true })}
              src="https://i.imgur.com/lqFniyN.jpg"
            />
          </div>}
        />
      </React.Fragment>
    )
  }
}

export default Home
