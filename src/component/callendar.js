import React, { Component } from 'react'
import '../style/Calendar.css'
export default class Callendar extends Component {

    buildCallender = ()=>{
        const firstDayOfPrevMonth = this.props.firstDayOfThisMonth.clone().day(0).startOf('day'); //전달 마지막 일요일
        let day = firstDayOfPrevMonth;
        const dateArray = [];
        for(let i = 0; i< 42; i++){
            dateArray.push(
            <div className="dateContainner">
                <div className="dateBox">
                    {day.date()}
                </div>
            </div>);
            day = day.clone().add(1,'days');
        }
        return dateArray;
        // console.log(dummyArray);
    }

    dayOfWeek = () =>{
        const dayOfWeek = ["일","월","화","수","목","금","토"];

        return dayOfWeek.map((day)=>{
            let color = "black";
            if(day ==="일"){
               color = "red"; 
            }else if(day === "토"){
                color = "blue"
            }
            return <div className="dayOfWeek" style={{"color" : color}}>{day}</div>
        });
    }
    render() {
        const { firstDayOfThisMonth } = this.props;

        const year = firstDayOfThisMonth.year();
        const month = firstDayOfThisMonth.month();
        return (
            <div id="calendarContainer">
                <div id="calendarHeader">
                    <h3 id="calendarYearMonth">
                        {year}년{' '}
                        {month}월
                    </h3>
                    <div id="calendarButtonContainer">
                        <button onClick={this.prevMonth} />                
                        <button onClick={this.nextMonth} />
                    </div>
                </div>
                <div id="week">
                    {this.dayOfWeek()}
                </div>
                <div id="dateOfWeek">
                    {this.buildCallender()}
                </div>
            </div>
        )
    }
}
