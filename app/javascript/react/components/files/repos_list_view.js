import React from "react";
import LoadingIcon from "../commons/loading_icon";
import {formatDate, navigateTo} from "../../utils/misc";
import constants from "../../constants";

class ReposListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {};
  }

  componentWillReceiveProps(newProps) {
    this.updateLoadReposActionStatus(newProps);
  }

  // Because loadReposActionStatus is volatile so we store its status transition in state.
  // We can set loadReposActionStatus in fileStore, but it's not neccessary for now.
  updateLoadReposActionStatus(newProps) {
    var loadReposActionStatus = newProps.loadReposActionStatus;
    var oldLoadFilesActionStatus = this.props.loadReposActionStatus;

    if (loadReposActionStatus && loadReposActionStatus != oldLoadFilesActionStatus) {
      this.setState({loadReposActionStatus: loadReposActionStatus});

      return true;
    }
  }

  render() {
    var repos = this.props.repos || [];
    var displayedFiles = [];

    if (this.state.loadReposActionStatus == constants.REQUEST.LOADING) {
      displayedFiles.push(
        <tr key="loading" className="text-center">
          <td colSpan={3}><LoadingIcon /></td>
        </tr>
      );
    } else {
      for (let i = 0; i < repos.length; i++) {
        let repo = repos[i];
        displayedFiles.push(
          <tr key={i}>
            <td><a href={"/files?repo=" + repo.full_name} onClick={navigateTo}>{repo.full_name}</a></td>
            <td>{repo.description}</td>
            <td>{formatDate(repo.created_at)}</td>
          </tr>
        );
      }

      if (repos.length == 0) {
        displayedFiles.push(
          <tr key="no_results" className="text-center">
            <td colSpan={3}>No repos found</td>
          </tr>
        );
      }
    }

    return (
      <div className="repos-list">
        <table className="table table-strip">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {displayedFiles}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReposListView;
