import React, { Component } from "react";
import {Grid, Link} from '@material-ui/core';
import Comments from "./Comments";
import Candidates from "./Candidates";

import UserService from "../services/user.service";

export default class BoardModerator extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      content: "",
      sh:false
    };
  }

  handleClick(e){
    let p = e.target.innerHTML;
    if(p=="Info")
      this.setState({
        sh:true
      });
    else
    this.setState({
     sh:false
   });
   
    
 }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container p-5 mt-3">
      <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
      <Link  component="button"
        variant="body2"
        onClick={this.handleClick}
      >
      <h4>Info</h4>
    </Link>
    <div>
    <Link  component="button"
          variant="body2"
          onClick={this.handleClick}
        >
      <h4>Comment</h4>
    </Link>
    </div>
        </Grid>
        <Grid item xs={12} sm={9}>
        <h5>{this.state.content}</h5>
            <h5>For your information</h5>
            {this.state.sh && ( 
            <Comments />
            )}
        <Candidates />
        </Grid>
          
      </Grid>
    </div>
    );
  }
}