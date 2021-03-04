import React, { Component } from "react";
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import './App.css';
import {AppBar, Toolbar, Button, colors} from '@material-ui/core';
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
       <div className="App">
        <AppBar position="fixed"  >
          <Toolbar style={{background:'#353635'}}>
        <div>
            <Button href="/home" color="inherit" >              
                Home
            </Button>


            {showModeratorBoard && (
              <Button color="inherit" href="/mod">
                
                  Moderator Board
                
              </Button>
            )}

            {showAdminBoard && (
              <Button color="inherit" href="/admin">
               
                  Admin
                
              </Button>
            )}

            {currentUser && !showAdminBoard && (
              <Button color="inherit" href="/user">
                
                  User
                
              </Button>
            )}
          </div>
          {currentUser ? (
            <div className="ml-auto">
              <Button color="inherit" href="/profile">
                
                  {currentUser.username}
               
              </Button>
              <Button color="inherit" href="/login" onClick={this.logOut}> 
                
                  LogOut
                
              </Button>
            </div>
          ) : (
            <div className="ml-auto">
             <Button color="inherit" href="/login">
                
                  Login
                
              </Button>

              <Button color="inherit" href="/register">
                
                  Sign Up
            
              </Button>
            </div>
          )}
         </Toolbar>
         </AppBar>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
        </div>
      </Router>
    );
  }
}


export default App;
