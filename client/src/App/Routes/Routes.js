import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import List from '../pages/AcademyList/List';
import NewAcademy from '../pages/AcademyList/Creator/NewAcademy'

const Routes = (props) => {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Academies/List' component={List} />
            <Route path='/Academies/AddAcademy' component={NewAcademy} />
          </Switch>
        </BrowserRouter>
    )
}

export default Routes;