import React, { Component } from 'react'
import moment from 'moment';

import Callendar from '../component/callendar';

import '../style/ScheduleBoard.css'

class ScheduleBoardPage extends Component {
    state = {
        firstDayOfThisMonth : moment().date(1), // 이번 달 1일 
        today : moment().startOf('day'), // "날짜"
    }

    nextMonth = () =>{
        this.setState({
            firstDayOfThisMonth : this.state.firstDayOfThisMonth.clone().add(1,'months'),
            today : this.state.today
        })
    }
    prevMonth = ()=>{
        this.setState({
            firstDayOfThisMonth : this.state.firstDayOfThisMonth.clone().add(-1,'months'),
            today : this.state.today
        })
    }
    render() {
        return (
            <div id="SchedulBoardPage"> 
                <Callendar firstDayOfThisMonth={this.state.firstDayOfThisMonth}></Callendar>
                <div id="dummyDiv"></div>
            </div>
        )
    }
}

export default ScheduleBoardPage;