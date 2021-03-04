import "./Candidates.css";
import React from "react";
import {Typography, Link,Checkbox} from '@material-ui/core';

function template() {
  return (
    <div className="candidates p-5">

      <h5>Candidates List</h5>
      {this.state.users.data.map((item,index)=>(
          <Checkbox
          onChange={this.handleChange}
          color="primary"
          id={index}
          value={item.username}
          
        />
      ))}
      <br />
        {this.state.users.data.map((item,index)=>(
          <strong> {item.username} </strong>
       
      ))}
      <br />
      <Link  component="button"
        variant="body2"
        onClick={this.handleClick}
      >
      <h4>Initiate Labour Contract</h4>
    </Link>     
       <h5>{this.state.content}</h5> 
    </div>
  );
};

export default template;
