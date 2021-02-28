import React, { Component } from "react";
import{ Card, CardHeader,CardContent, Typography } from '@material-ui/core';

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="col-md-12 mt-5 px-5 p-5">
      <Card>
        <CardHeader
        title="Adobe Api "
        subheader="for Companies"
        >
          
        </CardHeader>
        <CardContent>
          <Typography paragraph>
          <h5>{this.state.content}</h5>
          </Typography>
           
        </CardContent>
      </Card>
      </div>
    );
  }
}