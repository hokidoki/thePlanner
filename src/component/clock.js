import React, { Component } from 'react'
import moment from 'moment'
export default class Clock extends Component {

    componentDidMount(){
        this._isMount = true;
    }

    state = {
        now : moment().format('YYYY-MM-DD HH-mm-ss')
    }

    componentWillUnmount(){
        this._isMount = false
    }
    render() {
        setTimeout(()=>{
            if(this._isMount){
                this.setState({
                    now : moment().format('YYYY-MM-DD HH-mm-ss')
                })
            }
        },1000)
        return (
            <div id="loginClock" className="clockDiv">
                <h2 id="clock">{this.state.now}</h2>
            </div>
        )
    }
}
