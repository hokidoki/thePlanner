import React, { Component,Fragment } from 'react'
import moment from 'moment';

import Callendar from '../component/callendar';
import BoardHeader from '../component/scheduleBoard/scheduleBoard';

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
            <div className="boardMain">
                <BoardHeader nextMonth={this.nextMonth} prevMonth={this.prevMonth}firstDayOfThisMonth={this.state.firstDayOfThisMonth}></BoardHeader>
                <Callendar firstDayOfThisMonth={this.state.firstDayOfThisMonth}></Callendar>
            </div>
        )
    }
}

export default ScheduleBoardPage;