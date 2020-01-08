import React, { Component } from 'react'

export default class TermsPage extends Component {
    state = {
        agrees : 0,
        terms : [{
            title : "이메일 정보 활용에 동의합니다.",
            term : "플래너는 이메일 정보를 활용하여 고객에게 다양한 정보를 전달합니다.",
            agree : false
        },{
            title : "데이터 통계 활용에 동의합니다.",
            term : "플래너는 회원의 게시물을 활용하여 데이터 통계에 사용합니다. 회원의 게시물은 통계이외에는 활용하지 않습니다.",
            agree : false
        }]
    }

    agreeTerm = (index) => {
        const agree = this.state.terms[index].agree === true ? -1 : 1;
        const agrees = agree + this.state.agrees;
        console.log(index)
        console.log(this.state.terms.slice(0,0));
        this.setState({
            agrees : agrees,
            terms : [...this.state.terms.slice(0,index),{
                title : this.state.terms[index].title,
                term : this.state.terms[index].term,
                agree : !this.state.terms[index].agree,
            },...this.state.terms.slice(index +1 , this.state.terms.length)]
        });

        if(agrees === this.state.terms.length){
            this.props.termsAgreeAll()
        }else if(agrees === this.state.terms.length && agree === -1){
            this.props.termsAgreeAll()
        }
        
    }

    agreeAll = () => {
        const terms = this.state.terms.map((item)=>{
            return {
                title : item.title,
                term : item.term,
                agree : true,
            }
        })

        this.setState({
            agrees : 2,
            terms : terms
        })
        this.props.termsAgreeAll()
    }
    render() {
        const terms = this.state.terms.map((item,index)=>{
            return <Term title={item.title} term={item.term} agree={item.agree} agreeTerm={()=>{this.agreeTerm(index)}} key={`terms${index}`} />
        })
        return (
            <div className="termsPage">
                <h3 className="accountH3">약관 동의</h3>
                <div className="term">
                <h5 className="termTitle">약관에 모두 동의합니다.</h5><input className="termCheck" type="checkbox" checked={this.state.agrees === this.state.terms.length ? true : false}
                 onChange={this.agreeAll}></input>
                 </div>
                 {terms}
            </div>
        )
    }
}

class Term  extends Component {

    state = {
        show : true,
    }
    
    showThisTerm = () => {
        this.setState({
            show : !this.state.show
        })
    }

    render() {
        const { title, term, agree,agreeTerm} = this.props;
        const showHide = this.state.show === true ? "block" : "none";
        return (
            <div className="term">
                <div>
                    <h5 className="termTitle">{title}</h5>
                    <label className="showTermLabel" onClick={this.showThisTerm}>(내용 보기)</label>
                    <input type="checkbox" checked={agree} onChange={agreeTerm} className="termCheck"></input>
                </div>
                <div style={{'display' : `${showHide}`}}>
                    <textarea className="termArea" defaultValue={term}></textarea>
                </div>
            </div>
        )
    }
}
