import React from "react";
import classes from  './Layout.module.scss'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import BackDrop from "../../components/UI/BackDrop/BackDrop";

export default class Layout extends React.Component{

  state = {
    menuIsOpen: false
  }

  toggleMenuHandle = () => {
    this.setState(prevState => ({menuIsOpen: !prevState.menuIsOpen}))
  }

  render() {
    return (
      <div className={classes.Layout}>

        <Drawer isOpen={this.state.menuIsOpen} toggleMenu={this.toggleMenuHandle}/>
        <MenuToggle toggleMenu={this.toggleMenuHandle} isOpen={this.state.menuIsOpen}/>
        <main>
          {this.props.children}
        </main>
        { this.state.menuIsOpen ? <BackDrop dropClicked={this.toggleMenuHandle}/> : null}
      </div>
    )
  }
}