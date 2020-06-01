import React from 'react';
import './App.scss';
import Layout from "./hoc/Layout/Layout";
import {Route, Switch, withRouter, Redirect} from  'react-router-dom'
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {actionAutoLogin} from "./store/Actions/actionsAuth";

class App extends React.Component{

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/' component={QuizList}/>
        <Redirect to={'/'}/>
      </Switch>
    )

    if (this.props.isLogin) {
      routes = (
        <Switch>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/quizCreate' component={QuizCreator}/>
          <Route path='/' component={QuizList} exact/>
          <Redirect to={'/'}/>
        </Switch>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

function mapStateToProps(state) {
  return {
    isLogin: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin:() => dispatch(actionAutoLogin())
  }
}
