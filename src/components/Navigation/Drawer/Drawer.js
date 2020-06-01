import React from "react";
import classes from './Drawer.module.scss'
import {NavLink} from 'react-router-dom'

export default class Drawer extends React.Component {

  renderLinks(links) {
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
    const links = [
      {to: '/', text: 'Список', exact: true},
    ]
    if (this.props.isLogin) {
      links.push({to: '/quizCreate', text: 'Создать тест', exact: false})
      links.push({to: '/logout', text: 'Выйти', exact: false})
    } else {
      links.push({to: '/auth', text: 'Авторизация', exact: false})
    }

    const cls = [classes.Drawer]
    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <div className={cls.join(' ')}>
        <ul>
          {this.renderLinks(links)}
        </ul>
      </div>
    )
  }
}