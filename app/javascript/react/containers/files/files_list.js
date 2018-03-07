import React from 'react';
import {connect} from "react-redux";
import classNames from "classnames";
import _ from "lodash";
import FilesListView from "../../components/files/files_list_view";
import ReposListView from "../../components/files/repos_list_view";
import {loadRepos, loadFiles} from "../../actions/file_actions";
import {navigateTo} from "../../utils/misc";
import constants from '../../constants';

class FilesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    _.bindAll(this, "loadFiles");
  }

  getInitialState() {
    return {};
  }

  componentWillMount() {
    var query = this.props.location.query;
    this.loadFiles(query.repo, query.path || "");
  }

  componentWillReceiveProps(newProps) {
    this.handlePathChange(newProps);
  }

  loadFiles(repo, path) {
    var currentUser = this.props.currentUser;
    var query = this.props.location.query;

    if (repo) {
      this.props.loadFiles(repo, path);
    } else {
      this.props.loadRepos(currentUser.nickname);
    }
  }

  handlePathChange(newProps) {
    var query = newProps.location.query;
    var oldQuery = this.props.location.query;

    if (query.path != oldQuery.path || query.repo != oldQuery.repo) {
      this.loadFiles(query.repo, query.path || "");

      return true;
    }
  }

  render() {
    var query = this.props.location.query;
    var path = query.path;
    var repo = query.repo;

    if (repo) {
      return (
        <FilesListView files={this.props.files}
                       repo={repo}
                       path={path}
                       loadFiles={this.loadFiles}
                       loadFilesActionStatus={this.props.loadFilesActionStatus} />
      )
    } else {
      return (
        <ReposListView repos={this.props.repos}
                       loadFiles={this.loadFiles}
                       loadReposActionStatus={this.props.loadReposActionStatus} />
      )
    }
  }
}

function stateToProps(state, ownProps) {
  let fileStore = state.fileStore;
  let props = {};

  if (fileStore) {
    props.files = fileStore.files;
    props.repos = fileStore.repos;

    if (fileStore.actionType == constants.FILE.LOAD_FILES) {
      props.loadFilesActionStatus = fileStore.actionStatus;
    } else if (fileStore.actionType == constants.FILE.LOAD_REPOS) {
      props.loadReposActionStatus = fileStore.actionStatus;
    }
  }

  return props;
}

FilesList = connect(stateToProps, {
  loadRepos,
  loadFiles
})(FilesList);

export default FilesList;
