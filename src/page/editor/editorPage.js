import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import moment from 'moment'
import queryString from 'query-string';
import ArticleHeader from '../../component/scheduleBoard/ArticleHeader';
import MemoEditor from '../../component/editor/memoEditor';
import '../../style/editor.css';
class EditorPage extends Component {

    state = {
        mode : null,
        date : null,
        editorHtml : '',
        mounted : false
    }

    componentDidMount(){
        try{
            const {match, location} = this.props;
            const date = queryString.parse(location.search).date.replace(/_/gi,"-");
            const mode = match.params.mode;
            const momentedDate = moment(date).clone();
            console.log(match.params.mode)
            this.setState({
                mode : mode,
                date : momentedDate,
                mounted : true
            })
        }catch(e){
            console.log(e)
        }
    }

    handleChange = (html) => {
        this.setState({ editorHtml: html });
    }
        
    render() {
        const {location} = this.props;
        const date = queryString.parse(location.search).date.replace(/_/gi,"-");
        const momentedDate = moment(date).clone();
        return (
            <div className="boardMain editorPage">
                <ArticleHeader articleDate={momentedDate} ></ArticleHeader>
                <MemoEditor editorHtml={this.state.editorHtml} handleChange={this.handleChange}></MemoEditor>
            </div>
        )
    }
}

export default connect(null,null)(withRouter(EditorPage))