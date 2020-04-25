import * as React from "react";
import { connect } from "react-redux";
import { actions } from "../redux";
import { generate } from "shortid";
import {
  Listing,
  Icon,
  Name,
  LastSaved,
  Entry,
} from "@nteract/directory-listing";

import styled from "styled-components";

const FilesListingDiv = styled.div`
  font-size: 12px;
  margin-top: 30px;

  .tag {
    margin-left: 10px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
    height: 500px;
    overflow: auto;
  }

  li {
    padding-left: 25px;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
    font-size: 12px;
  }

  li:hover {
    background-color: #79037f;
  }

  .icon {
    font-size: 8px;
    margin-right: 3px;
  }
`;

class FilesListing extends React.Component {
  constructor(props) {
    super(props);
  }

  getFileType(type) {
    if (type == "file") return "file";
    else if (type == "dir") return "directory";
  }

  handleClick = (e) => {

    const { gitref, repo, path ,setPath , fetchSource} = this.props;
    let filetype = e.target.id
    let fileName = e.target.innerText
    if(filetype == "dir")
      setPath(path +"/"+ e.target.innerText)
    if(filetype == "file")
      fetchSource({ gitref, repo, path ,fileName})
  };

  componentDidMount() {
    const { gitref, repo, path } = this.props;
    this.props.fetchFiles({ repo, gitref, path });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.repo !== this.props.repo ||
      prevProps.gitRef !== this.props.gitRef ||
      prevProps.path !== this.props.path
    ) {
      const { gitref, repo, path } = this.props;
      this.props.fetchFiles({ repo, gitref, path });
    }
  }

  render() {
    return (
      <FilesListingDiv>
        <div className="tag">Explorer</div>
        <ul>
          {this.props.files.map((file) => (
            <li key={generate()} id={file.type} onClick={this.handleClick}>
              <span className="icon">
                <Icon fileType={this.getFileType(file.type)} color="#fff" />
              </span>
              {file.name}
            </li>
          ))}
        </ul>
      </FilesListingDiv>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    repo: state.ui.repo,
    gitref: state.ui.gitref,
    source: state.ui.source,
    files: state.ui.files,
    path: state.ui.path,
  };
};

const mapDispatchToProps = {
  fetchFiles: actions.fetchFiles,
  fetchSource:actions.fetchSource,
  setPath: actions.setPath,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesListing);
