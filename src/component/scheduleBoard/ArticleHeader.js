import React, { Component } from 'react'

export default class ArticleHeader extends Component {
    
    render() {
        const { articleDate } = this.props;
        const year = articleDate.year();
        const month = articleDate.clone().month() + 1;
        const date = articleDate.date();
        return (
            <div className="mainHeader">
                <h3 className="mainHeaderDate">
                    {year}년{' '}
                    {month}월{' '}
                    {date}일
                </h3>
            <div className="mainHeaderControler">
                {/* 추가 해야 하는 것 : 일자 변경 버튼, 홈버튼 추가 */}
                    <button onClick={this.props.prevMonth} />                
                    <button onClick={this.props.nextMonth} />
                </div>
            </div>
        )
    }
}
