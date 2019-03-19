import { PureComponent } from 'react'
import { history } from '../../routing'
import { withRouter } from 'react-router-dom'

class Home extends PureComponent {
  componentDidMount() {
    const pagePath = localStorage.getItem('FIRST_PAGE')
    history.push(pagePath || '/dashboard')
  }

  render() {
    return null
  }
}

export default withRouter(Home)