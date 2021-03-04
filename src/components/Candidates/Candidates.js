import React    from "react";
import template from "./Candidates.jsx";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

class Candidates extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
    content: "",
    users:AuthService.getCurrentUser(),
    sh:false
  };
 }
 handleChange(e){
  
   console.log(e.target.value);
 }
  render() {
    return template.call(this);
  }
  handleClick(e){
    this.setState({
      content:"Loading... please wait"
    });
    UserService.initiateContract().then(
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
}


export default Candidates;
