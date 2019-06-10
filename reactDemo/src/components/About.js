import React from 'react';
import '../App.css';

class About extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'yuyue',
        }
    }
    componentWillMount(){

    }
    render(){
        return <div className="the_about">
            <h2>关于我们，想了解更多吗？<a href="www.baidu.com" target="_blank" >点击这里</a></h2>
            
        </div>
    }
}
export default About;