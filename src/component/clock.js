import React, { Component } from 'react'
import moment from 'moment'
export default class Clock extends Component {
    state = {
        now : moment().format('YYYY-MM-DD HH-mm-ss')
    }
    render() {
        setTimeout(()=>{
            this.setState({
                now : moment().format('YYYY-MM-DD HH-mm-ss')
            })
        },1000)
        return (
            <div id="loginClock" className="clockDiv">
                <h2 id="clock">{this.state.now}</h2>
            </div>
        )
    }
}
