import React from "react";
import LoadingIcon from "../commons/loading_icon";
import {navigateTo, humanFileSize} from "../../utils/misc";
import constants from "../../constants";

import folderIconPath from "../../../assets/folder-icon.jpg";
import fileIconPath from "../../../assets/file-icon.png";

class FilesListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {loadFilesActionStatus: this.props.loadFilesActionStatus};
  }

  componentWillReceiveProps(newProps) {
    this.updateLoadFilesActionStatus(newProps);
  }

  // Because loadFilesActionStatus is volatile so we store its status transition in state.
  // We can set loadFilesActionStatus in fileStore, but it's not neccessary for now.
  updateLoadFilesActionStatus(newProps) {
    var loadFilesActionStatus = newProps.loadFilesActionStatus;
    var oldLoadFilesActionStatus = this.props.loadFilesActionStatus;

    if (loadFilesActionStatus && loadFilesActionStatus != oldLoadFilesActionStatus) {
      this.setState({loadFilesActionStatus: loadFilesActionStatus});

      return true;
    }
  }

  render() {
    var filesAndFolders = this.props.files || [];
    var displayedFiles = [];
    var path = this.props.path;
    var folders = filesAndFolders.filter((file)=> file.type == "dir");
    var files = filesAndFolders.filter((file)=> file.type != "dir");

    if (this.state.loadFilesActionStatus == constants.REQUEST.LOADING) {
      displayedFiles.push(
        <tr key="no_results" className="text-center">
          <td colSpan={3}><LoadingIcon /></td>
        </tr>
      );
    } else {
      for (let i = 0; i < folders.length; i++) {
        let folder = folders[i];

        displayedFiles.push(
          <tr key={i}>
            <td><img src={folderIconPath} alt="Folder" width="20" /></td>
            <td><a href={"files?repo=" + this.props.repo + "&path=" + folder.path} onClick={navigateTo}>{folder.name}</a></td>
            <td></td>
          </tr>
        );
      }

      for (let i = 0; i < files.length; i++) {
        let file = files[i];

        displayedFiles.push(
          <tr key={folders.length + i}>
            <td><img src={fileIconPath} alt="File" width="20" /></td>
            <td><a href={file.download_url} target="_blank">{file.name}</a></td>
            <td>{humanFileSize(file.size)}</td>
          </tr>
        );
      }

      if (filesAndFolders.length == 0) {
        displayedFiles.push(
          <tr key="no_results" className="text-center">
            <td colSpan={3}>No files found</td>
          </tr>
        );
      }
    }

    return (
      <div className="files-list">
        <table className="table table-strip">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Name</th>
              <th>Size</th>
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

export default FilesListView;
