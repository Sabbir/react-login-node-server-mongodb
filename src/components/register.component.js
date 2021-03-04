import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import lo from "../assets/l.png";
import{ Button, TextField, Card, Snackbar,MenuItem } from '@material-ui/core';

import AuthService from "../services/auth.service";




  
 
  
    
  export default class Register extends Component {
    constructor(props) {
      super(props);
      this.handleUserChange = this.handleUserChange.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeCompany = this.onChangeCompany.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeCPassword = this.onChangeCPassword.bind(this);
      this.onChangeFullname = this.onChangeFullname.bind(this);
      this.state = {
        user : [{usr:"Candidate", value:"user"},{usr:"Company", value:"admin"}],
        usertype:"",
        fullname:"",
        username: "",
        company: "",
        password: "",
        cpassword:"",
        disable:true,
        successful: false,
        open:false,
        message: "",
        fError : "",
        uError:"",
        eError:"",
        pError:"",
        cpError:""
      };

      
    }
    onChangeFullname(e) {
      let m = "";
      this.setState({
        fullname: e.target.value,
        fError: m
        
      });

    }
  
    onChangeUsername(e) {
      let m = "";
      if (e.target.value.length < 3 || e.target.value.length > 20) {
        m = "Required 3 to 20 charecters";
      }
      this.setState({
        username: e.target.value,
        uError: m
        
      });
     
      
    }
  
    onChangeCompany(e) {
      let em = "";
      if(e.target.value.length==0){
        em = "Enter a Company name.";
      }
      this.setState({
        company: e.target.value,
        eError: em
        
      });
    }
  
    onChangePassword(e) {
      let p = "";
      if (e.target.value.length < 6 || e.target.value.length > 40) {
         p = "Required 6 to 40 charecters";
      }
      this.setState({
        password: e.target.value,
        pError: p
        
      });
    }

    onChangeCPassword(e) {
      let p = "";
      
      if (this.state.password != e.target.value) {
         p = "Password mismatch";
      }
      this.setState({
        cpassword: e.target.value,
        cpError: p
        
      });
      
    }

    handleClose(e){
      this.setState({
        message:"",
        open: false
       
      });
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
        }
      );
                
    }

    handleUserChange(e){
      let p = "";
      let v = e.target.value;
      this.state.disable = true;
      if(v=="user")
        this.state.disable=false;
      this.setState({
        usertype: e.target.value,
        usError: p
        
      });
    }
  
    handleRegister(e) {
      e.preventDefault();
      this.setState({
        message: "",
        successful: false,
        open:true
      });
  
      this.form.validateAll();
      let c = this.state.pError || this.state.uError || this.state.uError || this.state.eError || this.state.cpError;
     
      if (this.checkBtn.context._errors.length === 0 && c=="") {
         
        AuthService.register(
          this.state.fullname,
          this.state.username,
          this.state.company,
          this.state.password,
          this.state.usertype
        ).then(
          response => {
            
            this.setState({
              message: response.data.message,
              successful: true
              
            });
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);
            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
      }
      else{
        this.setState({
          message:"error/s in input", 
          open:true
                      
        });
      }
    }
  
    render() {
      return (
        <div className="col-md-12 p-5 mt-3">
          <Card>
          <div className="p-3 mt-2">
          
  
            <Form
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c;
              }}
            >
              <div className="form-group">
                
                <img src={lo} height="80" width="80" />
            </div>
              
                <div>
                <div className="form-group">
                    
                    <TextField
                      select
                      label="Select a User"
                      value={this.state.usertype}
                      onChange={this.handleUserChange}
                      error= {this.state.usError}
                      helperText={"Select a user type"}
                      name="user"
                      variant="outlined"
                      size="small"
                      required
                  
                    >
                      {this.state.user.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.usr}
                        </MenuItem>
                      ))}
                  </TextField>
                  </div>

                  <div className="form-group">
                    
                    <TextField
                      disabled={this.state.disable}
                      type="text"
                      label="Full name"
                      name="fullname"
                      value={this.state.fullname}
                      error= {this.state.fError}
                      helperText={this.state.fError}
                      onChange={this.onChangeFullname}
                      variant="outlined"
                      size="small"
                      
                  
                    />
                  </div>

                  <div className="form-group">
                    
                    <TextField
                      type="text"
                      label="Username"
                      name="username"
                      value={this.state.username}
                      error= {this.state.uError}
                      helperText={this.state.uError}
                      onChange={this.onChangeUsername}
                      variant="outlined"
                      size="small"
                      required
                  
                    />
                  </div>
  
                  <div className="form-group">
                   
                    <TextField
                      type="text"
                    
                      label="Company"
                      name="company"
                      value={this.state.company}
                      onChange={this.onChangeCompany}
                      required
                      error={this.state.eError}
                      helperText={this.state.eError}
                      variant="outlined" size="small"
                    />
                  </div>
  
                  <div className="form-group">
                    
                    <TextField
                      type="password"
                      label="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      required
                      error={this.state.pError}
                      helperText={this.state.pError}
                      variant="outlined" size = "small"
                    />
                  </div>

                  <div className="form-group">
                    
                    <TextField
                      type="password"
                      label="Confirm Password"
                      name="cpassword"
                      value={this.state.cpassword}
                      onChange={this.onChangeCPassword}
                      required
                      error={this.state.cpError}
                      helperText={this.state.cpError}
                      variant="outlined" size = "small"
                    />
                  </div>
  
                  <div className="form-group">
                    <Button 
                    type="submit" variant="contained" disabled={this.state.loading}
                    color="primary" >
                      Sign Up</Button>
                  </div>
                </div>
              
  
              {this.state.message && (
                <div className="p-3">
                  <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <div 
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
                    </div>
                  </Snackbar>
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

  