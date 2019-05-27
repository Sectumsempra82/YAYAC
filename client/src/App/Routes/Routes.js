import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import List from '../pages/AcademyList/List';
import NewAcademy from '../pages/AcademyList/Creator/NewAcademy'

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Academies/List' component={List} />
          <Route path='/Academies/AddAcademy' component={NewAcademy} />
        </Switch>
      </div >
    )
  };
}

export default Routes;