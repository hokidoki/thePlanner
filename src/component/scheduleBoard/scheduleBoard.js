import React, { Component } from 'react'

export default class scheduleBoard extends Component {
    
    render() {
        const { firstDayOfThisMonth } = this.props;
        const year = firstDayOfThisMonth.year();
        const month = firstDayOfThisMonth.clone().month() + 1;
        return (
            <div id="calendarHeader">
                <h3 className="mainHeaderDate">
                    {year}년{' '}
                    {month}월
                </h3>
            <div className="mainHeaderControler">
                    <button onClick={this.props.prevMonth} />                
                    <button onClick={this.props.nextMonth} />
                </div>
            </div>
        )
    }
}