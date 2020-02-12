import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom';

import ScheduleBoardPage from './scheduleBoardPage.js';
import SchedulePage from './schedulePage.js';

export default class MainPage extends Component {
    render() {
        return (
            <div id="SchedulBoardPage">
                <Switch>
                    <Route path="/main/board/:id" component={ScheduleBoardPage}/>
                    <Route path="/main/schedule/:id" component={SchedulePage}/>
                </Switch>
                <div id="dummyDiv"></div>
            </div>
        )
    }
}
