import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div>
          <center>
            <p style={{ fontSize: "4rem", color: "#BEBEBE" }}>Ooops!</p>
            <p style={{ fontSize: "1rem", color: "#0a0a0a" }}>
              THIS PAGE DOESN&apos;T EXIST OR UNAVAILABLE
            </p>
            <Link
              to="/about"
              className="block mt-4 text-blue-500 hover:underline"
              onClick={() => this.setState({ hasError: false })}
            >
              Go Back
            </Link>
          </center>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
