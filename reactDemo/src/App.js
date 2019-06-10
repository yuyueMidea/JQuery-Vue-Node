import React from 'react';
import './App.css';

// 引入组件
import Bus from './components/Bus';
import Clock from './components/Clock';
import About from './components/About';
import User from './components/User';
import Home from './components/Home';
import NameForm from './components/NameForm';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function Index() {
  return <div>
            <h1>hi-react!</h1>
          </div>
}

function Cart() {
  return <h3>Cart</h3>;
}
const routes = [
  {
    path: "/index",
    component: Index
  },{
    path: "/clock",
    component: Clock
  },{
    path: "/home",
    component: Home
  },{
    path: "/about",
    component: About
  },{
    path: "/user",
    component: User
  },{
    path: "/nameForm",
    component: NameForm
  },{
    path: "/bus",
    component: Bus
  },{
    path: "/cart",
    component: Cart
  }
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}



function App() {
  return (
    <div className="App">
      <Router>
        {/* 左边路由区域 */}
      <div className="left">
      
        <header className="App-header">      
          
            <ul className="nav">
            <li>
                  <Link to="/index">Index</Link>
                </li>
                <li>
                  <Link to="/clock">Clock</Link>
                </li>
                <li>
                  <Link to="/home/">Home</Link>
                </li>
                <li>
                  <Link to="/about/">About</Link>
                </li>
                <li>
                  <Link to="/user/">User</Link>
                </li>

                <li>
                  <Link to="/bus">bus</Link>
                </li>
                <li>
                  <Link to="/cart">cart</Link>
                </li>
                <li>
                  <Link to="/nameForm">NameForm</Link>
                </li>

              </ul>
              
      
        </header>
        
      </div>
        {/* 右边context */}
      <div className="right">
              {/* <Route path="/" exact component={Index} />
              <Route path="/home" exact component={Home} />
              <Route path="/about/" component={About} />
              <Route path="/users/" component={Users} /> */}
             
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
      </div>
      </Router>
      
    </div>
  );
}

export default App;
