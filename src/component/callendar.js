import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import '../style/Calendar.css'

const DateContainner = styled.div`
    flex: 0 0 14.28%;
    color: white;
    position: relative;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    background-color : ${props => props.bgColor};
    cursor: pointer;
    &:hover{
        background-color : rgba(122, 126, 100, 0.87);
    }
`
class Callendar extends Component {

    componentDidMount(){
        
        const {match,calendarOwner} = this.props;
        console.log(this.props)
        const owner = calendarOwner !== null ? calendarOwner : match.params.id
        this.setState({
            calendarOwner : owner
        })
    }

    buildCallender = ()=>{
        const { history } = this.props;
        const firstDayOfPrevMonth = this.props.firstDayOfThisMonth.clone().day(0).startOf('day'); //전달 마지막 일요일
        let day = firstDayOfPrevMonth;
        const dateArray = [];
        for(let i = 0; i< 42; i++){
            let bgColor = "rgba(75, 74, 74, 0.87)";
            if(this.props.firstDayOfThisMonth.isBefore(day,'month') || this.props.firstDayOfThisMonth.isAfter(day,'month')){
                bgColor = "#adadadb6"
            }
            dateArray.push(
                <DateContainner bgColor={bgColor} onClick={()=>{history.push(`/main/schedule/${this.state.calendarOwner}/?date=${day.format('YYYY[_]MM[_]DD')}`)}}>
                    <div className="dateBox">
                        {day.date()}
                    </div>
                </DateContainner>
                );
            day = day.clone().add(1,'days');
        }
        return dateArray;
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
       console.log(this.state)
        return (
            <div id="calendarContainer">
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

const mapStateToProps = (state) =>{
    return {
        calendarOwner : state.callendar.callendarOwner
    }
}

export default connect(mapStateToProps,null)(withRouter(Callendar))