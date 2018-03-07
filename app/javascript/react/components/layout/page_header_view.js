import React from "react";
import { navigateTo } from "../../utils/misc";

class PageHeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {};
  }

  render() {
    var currentUser = this.props.currentUser;
    var lis = [];
    var homePath;

    if (currentUser) {
      lis.push(
        <li key="signout"><a href="/signout">Sign out</a></li>
      );

      homePath = "/files";
    } else {
      homePath = "/";
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <a href={homePath} onClick={navigateTo}>Github file explorer</a>
          </div>
          <div className="col-md-8">
            <div className="text-right">
              <ul className="list-inline">
                {lis}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageHeaderView;
