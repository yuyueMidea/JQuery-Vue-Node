import React from 'react';
import '../App.css';
import store from './store'

import axios from 'axios';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            home:'河南省信阳市平桥区',
            resData: '',
            // statexxx: store.getState()
        }
        this.getNews = this.getNews.bind(this);
        this.plus = this.plus.bind(this);
        this.minus = this.minus.bind(this);
    }
    componentWillMount(){
        console.log('tag',this.props)
    }
    plus(){
        store.dispatch({ type: 'INCREMENT' });
        // console.log('tag+++', store.getState() )
    }
    minus(){
        // store.dispatch({ type: 'DECREMENT' });
        // console.log('tag----', store.getState() )
        this.refs.myInput.focus();
    }
    getNews(){
        axios.get('https://www.apiopen.top/journalismApi').then(v=>{
		  		console.log(v.data.data);
                this.setState({
                    resData: v.data.data
                })
                // debugger
		  	}).catch(function (error) {
				console.log(error);
			  })
			  .then(function () {
				// always executed
			  });
    }
    
    render(){
        return <div className="the_home">
            <h2>welcome---home!</h2>
            <p>我家的地址是---{this.state.home}===><input ref="myInput" className="form-control" /></p>
            <hr/><br/>
            <p>
                <button className="btn btn-primary" onClick={this.plus}>count++</button>
                <span>---</span>
                <button className="btn btn-primary" onClick={this.minus}>点我获取input框焦点</button>
                <span>{store.getState()}</span>
            </p>
            <br/><hr/>

            <p><button className="btn btn-info" onClick={this.getNews}>获取新闻</button></p>
            <hr/>

            <ul className="newsList">
                {
                    this.state.resData['tech'] && this.state.resData['tech'].map((v,i)=>
                        <li key={i}><p>
                            <span>{i}</span>
                            <img src={(v.picInfo && v.picInfo[0]) ?v.picInfo[0].url :''} alt="" />
                            <a href={v.link ?v.link:''} target="_blank" rel="noopener noreferrer"><span>{v.title}</span></a>
                            </p>
                        </li>
                    )
                }
            </ul>
          
        </div>
    }
}
export default Home;