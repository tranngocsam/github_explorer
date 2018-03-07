import React from 'react';
import {connect} from "react-redux";
import FilesList from "./files/files_list";
import PageHeader from "./layout/page_header";
import PageFooterView from "../components/layout/page_footer_view";
import {navigateTo} from "../utils/misc";
import constants from '../constants';

class Files extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {};
  }

  componentWillReceiveProps(newProps) {
    var currentUserActionStatus = newProps.currentUserActionStatus;
    var oldActionStatus = this.props.currentUserActionStatus;
    var currentUser = newProps.currentUser;

    // Handle page redirect at page level
    if (currentUserActionStatus && currentUserActionStatus == constants.REQUEST.LOADING_SUCCESS && currentUserActionStatus != oldActionStatus) {
      // Redirect to sign in page
      if (!currentUser) {
        navigateTo("/");
      }
    }
  }

  render() {
    var filesList;
    var currentUser = this.props.currentUser;

    if (currentUser) {
      filesList = (
        <FilesList currentUser={currentUser}
                   location={this.props.location}/>
      );
    } else {
      filesList = (
        <div>Loading</div>
      );
    }
    return (
      <div className="page files-page">
        <div className="container">
          <PageHeader />

          {filesList}

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

    if (sessionStore.actionType == constants.SESSION.LOAD_CURRENT_USER) {
      props.currentUserActionStatus = sessionStore.actionStatus;
    }
  }

  return props;
}

Files = connect(stateToProps, {
})(Files);

export default Files;
