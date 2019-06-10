import React from 'react';
import '../App.css';


function Welcome(props) {
    return <h3>Hello, {props.name}</h3>;
  }

class User extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'yuyue',
            itemArr: [
                {"category": "Sporting Goods", "price": "$49.99", "stocked": true, "name": "Football"},
                {"category": "Sporting Goods", "price": "$9.99", "stocked": true, "name": "Baseball"},
                {"category": "Sporting Goods", "price": "$29.99", "stocked": false, "name": "Basketball"},
                {"category": "Electronics", "price": "$99.99", "stocked": true, "name": "iPod Touch"},
                {"category": "Electronics", "price": "$399.99", "stocked": false, "name": "iPhone 5"},
                {"category": "Electronics", "price": "$199.99", "stocked": true, "name": "Nexus 7"}
              ]
        }
        this.changeName = this.changeName.bind(this)
    }
    componentWillMount(){

    }
    componentDidMount(){
        console.log('tag', 'componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。')
    }
    changeName(){
        debugger
        this.setState({
            name: Math.random()
        })
    }
    render(){
        return <div className="the_user">
            <h2>hi---user!---这里时用户名信息<button onClick={this.changeName}>点击变化名字</button></h2>
            <hr/>
            <Welcome name={this.state.name} />
            <hr/><br/>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
                <hr/>
            <p>商品信息展示如下：</p>
            <ul>
                <li><span>category</span><span>price</span><span>name</span></li>
                {this.state.itemArr.map((v,i)=>
                    <li key={i}><span>{v.category}</span>----<span>{v.price}</span>====<span>{v.name}</span></li>
                    )}
            </ul>
        </div>
    }
}
export default User;