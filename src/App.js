import React from 'react';
import './App.scss';
import Loader from "./components/UI/Loader/Loader";
import Layout from "./hoc/Layout/Layout";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {actionAutoLogin} from "./store/Actions/actionsAuth";

const Quiz = React.lazy(() => import('./containers/Quiz/Quiz'))
const Auth = React.lazy(() => import('./containers/Auth/Auth'))
const QuizList = React.lazy(() => import('./containers/QuizList/QuizList'))
const QuizCreator = React.lazy(() => import('./containers/QuizCreator/QuizCreator'))

class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <React.Suspense fallback={<Loader/>}>
        <Switch>
          <Route path='/auth' component={Auth}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/' component={QuizList}/>
          <Redirect to={'/'}/>
        </Switch>
      </React.Suspense>

    )

    if (this.props.isLogin) {
      routes = (
        <React.Suspense fallback={<Loader/>}>
          <Switch>
            <Route path='/quiz/:id' component={Quiz}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/quizCreate' component={QuizCreator}/>
            <Route path='/' component={QuizList} exact/>
            <Redirect to={'/'}/>
          </Switch>
        </React.Suspense>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

function mapStateToProps(state) {
  return {
    isLogin: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(actionAutoLogin())
  }
}
