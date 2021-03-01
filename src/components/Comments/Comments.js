import React    from "react";
import template from "./Comments.jsx";

class Comments extends React.Component {
  render() {
    return template.call(this);
  }
}

export default Comments;
