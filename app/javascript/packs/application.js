/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import { Provider, connect } from "react-redux";
import reducer from "../react/reducers";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Homepage from "../react/containers/homepage";
import Files from "../react/containers/files";

import { loadCurrentUser } from "../react/actions/session_actions";
import constants from "../react/constants";

const middleware = [thunk];
if (process.env.NODE_ENV == "development") {
  // middleware.push(createLogger());
}
const store = createStore(reducer, applyMiddleware(...middleware));

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      currentUser: null
    };
  }

  componentWillMount() {
    this.props.loadCurrentUser();
  }

  render() {
    return <div className="app-container">{this.props.children}</div>;
  }
}

function stateToProps(state, ownProps) {
  let sessionStore = state.sessionStore;
  let props = {};

  if (sessionStore) {
    props.currentUser = sessionStore.currentUser;
    props.loadCurrentUserActionStatus = sessionStore.loadCurrentUserActionStatus;
  }

  return props;
}

Main = connect(stateToProps, {
  loadCurrentUser
})(Main);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Homepage} />
        <Route path="/files" component={Files} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
