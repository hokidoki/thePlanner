import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import moment from 'moment'
import queryString from 'query-string';
import ArticleHeader from '../component/scheduleBoard/ArticleHeader';
import NoneArticle from '../component/scheduleBoard/noneArticle';

class SchedulePage extends Component {

    state = {
        id : null,
        date : null,
        mounted : false
    }

    componentDidMount(){
        try{
            const {match, location} = this.props;
            const date = queryString.parse(location.search).date.replace(/_/gi,"-");
            const id = match.params.id;
            const momentedDate = moment(date).clone();
            console.log(match.params.id)
            this.setState({
                id : id,
                date : momentedDate,
                mounted : true
            })
        }catch(e){
            console.log(e)
        }
    }

    
        
    render() {
        const {location} = this.props;
        const date = queryString.parse(location.search).date.replace(/_/gi,"-");
        const momentedDate = moment(date).clone();
        return (
            <div className="boardMain">
                <ArticleHeader articleDate={momentedDate}></ArticleHeader>
                {/* <NoneArticle></NoneArticle> */}
                
            </div>
        )
    }
}

export default connect(null,null)(withRouter(SchedulePage))