import React from 'react';
import '../App.css';

function Blog(props) {
    const sidebar = (
      <ul>
        {props.posts.map((post) =>
          <li key={post.id}>
            {post.title}
          </li>
        )}
      </ul>
    );
    const content = props.posts.map((post) =>
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    );
    return (
      <div>
        {sidebar}
        <hr />
        {content}
      </div>
    );
  }


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
        const numbers = [1, 2, 3, 4, 5];
        const posts = [
            {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
            {id: 2, title: 'Installation', content: 'You can install React from npm.'}
          ];
        const itemList = numbers.map((v,i)=>
                <li key={i}>数字*2-->{v*2}</li>
            )
        return <div className="the_about">
            <h2>关于我们，想了解更多吗？<a href="www.baidu.com" target="_blank" >点击这里</a></h2>
            <ul>
                {itemList}
            </ul>
            <br/><hr/>
            <Blog posts={posts} />
        </div>
    }
}
export default About;