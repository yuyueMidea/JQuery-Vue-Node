import React from 'react';
import '../App.css';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            home:'河南省信阳市平桥区',
        }
    }
    componentWillMount(){

    }
    render(){
        return <div className="the_home">
            <h2>welcome---home!</h2>
            <p>我家的地址是---{this.state.home}</p>
          
        </div>
    }
}
export default Home;