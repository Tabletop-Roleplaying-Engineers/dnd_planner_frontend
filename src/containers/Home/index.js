import { Badge, Calendar, Drawer } from 'antd'
import React from 'react'

class Home extends React.PureComponent {
  state = {
    showModal: false
  }
  
  getListData = (value) => {
    let listData
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ]
        break
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ]
        break
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ]
        break
      default:
    }
    return listData || []
  }
  
  dateCellRender = (value) => {
    const listData = this.getListData(value)
    return (
      <ul className="events">
        {
          listData.map(item => (
            <li key={item.content} onClick={() => this.setState({ showModal: true })}>
              <Badge status={item.type} text={item.content}/>
            </li>
          ))
        }
      </ul>
    )
  }
  
  getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394
    }
  }
  
  monthCellRender = (value) => {
    const num = this.getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }
  
  render () {
    return (
      <React.Fragment>
        <Drawer
          width={640}
          placement="left"
          visible={this.state.showModal}
          onClose={() => this.setState({ showModal: false })}
        >
          123
        </Drawer>
        
        <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender}/>
      </React.Fragment>
    )
  }
}

export default Home
