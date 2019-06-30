import React from "react";
import ReactDOM from "react-dom";
import Loader from './Loader';

import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);

    //This is the only time we do direct assignment to this.state
    this.state = {
      lat: null,
      errorMessage: ''
    };

  }

  componentDidMount () {
    window.navigator.geolocation.getCurrentPosition(
        position => this.setState({ lat: position.coords.latitude }),
        err => this.setState({ errorMessage: err.message })
    );
  }

  render() {
    if (this.state.errorMessage && !this.state.lat) {
        return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat) {
        return <SeasonDisplay lat={this.state.lat} />
    }

    return <Loader message="Please accept location request" />;
    
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
