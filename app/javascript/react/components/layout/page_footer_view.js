import React from 'react';

class PageFooterView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer page-footer">
        <div className="text-center">
          footer - Github file explorer
        </div>
      </footer>
    )
  }
}

export default PageFooterView;
