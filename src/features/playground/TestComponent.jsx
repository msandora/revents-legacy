import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCounter, decrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";

const mapStateToProps = (state) => ({
  data: state.test.data,
});

// mapDispatchToProps
const actions = {
  incrementCounter,
  decrementCounter,
};

class TestComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>
          The answer is: {this.props.data} | ({data})
        </h3>
        <Button
          onClick={incrementCounter}
          positive
          content="Increment"
        ></Button>
        <Button
          onClick={decrementCounter}
          negative
          content="Decrement"
        ></Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(TestComponent);
