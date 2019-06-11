import React from 'react';

import './bootstrap.min.css'
import './App.css';


// 引入组件
import Index from './components/Index';
import Table from './components/Table';
import Clock from './components/Clock';
import About from './components/About';
import User from './components/User';
import Cart from './components/Cart';
import Home from './components/Home';
import Hook from './components/Hook';
import NameForm from './components/NameForm';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
    path: "/table",
    component: Table
  },{
    path: "/cart",
    component: Cart
  },{
    path: "/hook",
    component: Hook
  }
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (         // pass the sub-routes down to keep nesting
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
                <li><Link to="/index">Index</Link></li>
                <li><Link to="/home/">Home</Link>  </li>
                <li> <Link to="/about/">About</Link></li>
                <li> <Link to="/user/">User</Link>  </li>
                <li> <Link to="/table">Table</Link> </li>
                <li><Link to="/cart">cart</Link>  </li>
                <li> <Link to="/nameForm">NameForm</Link></li>
                <li><Link to="/hook">Hook</Link></li>
              </ul>
              
      
        </header>
        
      </div>
        {/* 右边context */}
      <div className="right">
        <div className="navbar">
          <Clock/>
        </div>
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
