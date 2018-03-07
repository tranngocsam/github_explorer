import React from 'react';
import {connect} from "react-redux";
import PageHeaderView from "../../components/layout/page_header_view";
import {navigateTo} from "../../utils/misc";

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {};
  }

  render() {
    var currentUser = this.props.currentUser;

    return (
      <PageHeaderView currentUser={currentUser} />
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

PageHeader = connect(stateToProps, {
})(PageHeader);

export default PageHeader;
