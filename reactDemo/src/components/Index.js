import React from 'react';
import '../App.css';

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'yuyue',
        }
    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
         console.log('Component DID MOUNT!')
    }
    componentWillReceiveProps(newProps) {
          console.log('Component WILL RECEIVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
          return true;
    }
    componentWillUpdate(nextProps, nextState) {
          console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
          console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
           console.log('Component WILL UNMOUNT!')
    }
    
    render(){
        return <div className="the_index">
           <p>
           React 组件生命周期
在本章节中我们将讨论 React 组件的生命周期。
<br/>
组件的生命周期可分成三个状态：
<br/>
Mounting：已插入真实 DOM<br/>
Updating：正在被重新渲染<br/>
Unmounting：已移出真实 DOM<br/>
<br/>
生命周期的方法有：
<br/>
componentWillMount 在渲染前调用,在客户端也在服务端。<br/>

componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
<br/>
 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。
 <br/>
componentWillReceiveProps 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
<br/>
shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。<br/> 
可以在你确认不需要更新组件时使用。<br/>

componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。<br/>

componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。<br/>

componentWillUnmount在组件从 DOM 中移除之前立刻被调用<br/>
           </p>
        </div>
    }
}
export default Index;