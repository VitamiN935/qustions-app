import React from "react";
import classes from './Drawer.module.scss'

export default class Drawer extends React.Component {

  state = {
    links: [1, 2, 3]
  }

  renderLinks() {
    return this.state.links.map((link, idx) => {
      return (
        <li key={idx}>
          <a href="#">Link {link}</a>
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