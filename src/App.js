import React from 'react';
import './App.scss';
import Layout from "./hoc/Layout/Layout";
import {Route, Switch} from  'react-router-dom'
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";

function App() {
  return (
    <Layout>

      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/quizCreate' component={QuizCreator}/>
        <Route path='/' component={QuizList}/>
      </Switch>

    </Layout>
  );
}

export default App;
