import React, { Component } from "react";
import Form from "react-validation/build/form";
import lo from "../assets/l.png";

import{ Button, TextField, Card } from '@material-ui/core';

import CheckButton from "react-validation/build/button";



import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
  
      this.state = {
        username: "",
        password: "",
        loading: false,
        message: ""
      };
    }
  
    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      });
    }
  
    onChangePassword(e) {
      this.setState({
        password: e.target.value
      });
    }
  
    handleLogin(e) {
      e.preventDefault();
  
      this.setState({
        message: "",
        loading: true
      });
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
        AuthService.login(this.state.username, this.state.password).then(
          () => {
            this.props.history.push("/profile");
            window.location.reload();
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              loading: false,
              message: resMessage
            });
          }
        );
      } else {
        this.setState({
          loading: false
        });
      }
    }
  
    render() {
      return (
        <div className="col-md-12 mt-5 p-5">
         <Card>
         <div className="p-3 mt-2">
          
  
            <Form
              onSubmit={this.handleLogin}
              ref={c => {
                this.form = c;
              }}
            >
              <div className="form-group">
                
                  <img src={lo} height="80" width="80" />
              </div>
              <div className="form-group">
                <TextField
                  type="text"
                  name="username"
                  label="Username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  required
                  variant="outlined"
                  size="small"
                />
              </div>
  
              <div className="form-group">
                
                <TextField
                  type="password"
                  label="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  size="small"
                  required
                  variant="outlined"
                />
              </div>
  
              <div className="form-group">
                <Button
                   type="submit" variant="contained" color="primary"
                  disabled={this.state.loading}
                >
                  
                  Login
                </Button>
              </div>
  
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
            
          </div>
          </Card>
        </div>
      );
    }
}
