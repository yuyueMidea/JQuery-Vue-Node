import React from 'react';
import '../App.css';
class Bus extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            count: props.initialCount,
            count2: 1,
            words: ['marklar']
        };
        this.handleClick = this.handleClick.bind(this);
      }
      //离开组件前移除
componentWillUnmount(){
	console.log('tag', 'componentWillUnmount1111111')
}

//挂载
componentDidMount(){
	console.log('tag', 'componentDidMount22222')
}

      handleClick() {
        // 点击事件的处理函数
        const count2 = this.state.count2+1;
        const words = this.state.words;
        words.push('marklar' + count2);
        this.setState({
            words: words,
            count2:count2
        });
      }
      
      render() {
        return <div className="the_bus">
            <h1>Hello, {this.props.name}---<button onClick={this.handleClick}>clickMe!{this.state.count2}</button></h1>
            <p>{this.state.words.join('---')}</p>
        </div>
      }
}
export default Bus;
