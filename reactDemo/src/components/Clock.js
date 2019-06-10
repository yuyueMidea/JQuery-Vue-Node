import React from 'react';
import '../App.css';

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    //   我们会在 componentWillUnmount() 生命周期方法中清除计时器
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
      tick() {
        this.setState({
          date: new Date()
        });
      }
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
         
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
  export default Clock;