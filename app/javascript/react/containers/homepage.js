import React from 'react';
import {connect} from "react-redux";
import PageHeader from "./layout/page_header";
import PageFooterView from "../components/layout/page_footer_view";
import {navigateTo} from "../utils/misc";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {};
  }

  componentWillReceiveProps(newProps) {
    var currentUser = newProps.currentUser;
    var oldUser = this.props.currentUser;

    // Redirect to /files page if user is logged in
    if (currentUser && (!oldUser || oldUser.nickname != currentUser.nickname)) {
      navigateTo("/files");
    }
  }

  render() {
    return (
      <div className="page home-page">
        <div className="containe">
          <PageHeader />

          <section className='section'>
            <div className='container'>
              <a href="/auth/github">Connect with Github</a>
            </div>
          </section>

          <PageFooterView />
        </div>
      </div>
    )
  }
}

function stateToProps(state, ownProps) {
  let sessionStore = state.sessionStore;
  let props = {};

  if (sessionStore) {
    props.currentUser = sessionStore.currentUser;
  }

  return props;
}

Homepage = connect(stateToProps, {
})(Homepage);

export default Homepage;
