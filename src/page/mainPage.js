import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom';

import ScheduleBoardPage from './scheduleBoardPage.js';
import ArticlePage from './schedulePage.js';
import EditorPage from './editor/editorPage';

export default class MainPage extends Component {
    render() {
        return (
            <div id="SchedulBoardPage">
                <Switch>
                    <Route path="/main/board/:id" component={ScheduleBoardPage}/>
                    <Route path="/main/article/:id" component={ArticlePage}/>
                    <Route path="/main/editor/:mode" component={EditorPage}></Route>
                </Switch>
                <div id="dummyDiv"></div>
            </div>
        )
    }
}
