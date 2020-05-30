import React from "react";
import classes from './Drawer.module.scss'
import {NavLink} from 'react-router-dom'

const links = [
  {to: '/', text: 'Список', exact: true},
  {to: '/auth', text: 'Авторизация', exact: false},
  {to: '/quizCreate', text: 'Создать тест', exact: false},
]

export default class Drawer extends React.Component {

  renderLinks() {
    return links.map((link, idx) => {
      return (
        <li key={idx}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.props.toggleMenu}
          >
            {link.text}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]
    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <div className={cls.join(' ')}>
        <ul>
          {this.renderLinks()}
        </ul>
      </div>
    )
  }
}