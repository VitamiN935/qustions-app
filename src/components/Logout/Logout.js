import React, {Component} from 'react'
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import {actionLogout} from "../../store/Actions/actionsAuth";

class Logout extends Component {

  componentDidMount() {
    this.props.logout()
  }

  render() {
    return <Redirect to={'/'}/>
  }
}

export default connect(null, mapDispatchToProps)(Logout)

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(actionLogout())
  }
}

