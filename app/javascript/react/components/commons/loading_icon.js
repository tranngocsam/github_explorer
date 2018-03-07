import React from 'react';
import loadingFilePath from "../../../assets/loading.gif";

class LoadingIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img src={loadingFilePath} alt="Loading" />
    )
  }
}

export default LoadingIcon;
