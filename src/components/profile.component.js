import React, { Component } from "react";
import{ Card, CardHeader,CardContent, Typography } from '@material-ui/core';
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;
    
    return (
      <div className="container col-md-12 p-5 mt-3">
        <Card>
        <CardHeader
         title={currentUser.username}
          />
            
       <CardContent> 
      
        <Typography paragraph variant="h6">
          
        
        
          <strong>Id:</strong>{" "}
          {currentUser.id}
        
        
          <strong>Company:</strong>{" "}
          {currentUser.company}
        <strong>Role:</strong> 
          {currentUser.roles} 
                            
        </Typography>
        </CardContent>
        </Card>
      </div>
    );
  }
}