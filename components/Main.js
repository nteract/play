import * as React from "react";
import Head from "next/head";
import Router, { withRouter } from "next/router";
import dynamic from "next/dynamic";
const CodeMirrorEditor = dynamic(import("@nteract/editor"), {
  ssr: false,
});

import { Display } from "@nteract/display-area";
import { Outputs } from "@nteract/presentational-components";
import { connect } from "react-redux";
import objectPath from "object-path";

import { actions } from "../redux";
import * as utils from "../utils";

import { KernelUI } from "./kernelUI";
import { BinderConsole } from "./consoles";
import FilesListing from "./FilesListing";
import styled from "styled-components";

const NTERACT_LOGO_URL =
  "https://media.githubusercontent.com/media/nteract/logos/master/nteract_logo_cube_book/exports/images/svg/nteract_logo_wide_purple_inverted.svg";

const emptyList = [];

const Layout = styled.div`
  min-height: calc(100vh);
  display: grid;
  grid-template-rows: 45px auto 1fr;
  grid-template-columns: 1fr 3fr 3fr;
  grid-row-gap: 00px;
  grid-column-gap: 0px;
  grid-template-areas:
    "side header header"
    "side Console Console"
    "side PlayEditor PlayOutputs";
  font-size: 14px;
`;

const Header = styled.header`
  --header-height: 42px;
  display: flex;
  justify-content: space-between;
  background-color: black;
  grid-area: header;

  button,
  div {
    vertical-align: middle;
  }

  button {
    padding: 0px 16px;
    border: none;
    outline: none;
    border-radius: unset;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    height: var(--header-height);
    font-family: Monaco, monospace;
  }

  button:active,
  button:focus {
    background-color: rgba(255, 255, 255, 0.1);
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #d7d7d7;
  }

  button:disabled {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.1);
  }
`;

const PlayEditor = styled.div`
  grid-area: PlayEditor;
  position: absolute;
  width: 42%;
  height: auto;
`;

const PlayOutputs = styled.div`
  grid-area: PlayOutputs;
  position: absolute;
  right: 0px;
  width: 44%;
  height: auto;
`;
const Body = styled.div``;

const Console = styled.div`
  grid-area: Console;
  min-height: 0px;
`;

const Side = styled.div`
  grid-area: side;
  background-color: black;
  min-height: 50px;
  color: #fff;
  .nteract-logo {
    width: 90px;
    display: block;
    margin: auto;
    margin-top: 5px;
  }
`;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gitrefValue: props.router.query.gitref || props.gitref,
      repoValue: props.router.query.repo || props.repo,
      sourceValue: props.source,
      path: props.path,
    };
    if (props.router.query.gitref || props.router.query.repo) {
      props.initalizeFromQuery({
        gitref: props.router.query.gitref,
        repo: props.router.query.repo,
      });
    }
  }
  componentDidMount() {
    const { activateServer, fetchFiles } = this.props;
    const { gitrefValue: gitref, repoValue: repo, path } = this.state;
    const serverId = utils.makeServerId({ gitref, repo });
    activateServer({ serverId, repo, gitref });
    fetchFiles({ repo, gitref, path });
  }

  componentDidUpdate(prevProps) {
    // When the gitref or repo change, update the URL params
    if (
      this.props.gitref !== prevProps.gitref ||
      this.props.repo !== prevProps.repo
    ) {
      let { gitref, repo, path } = this.props;
      this.props.fetchFiles({ repo, gitref, path });

      const newLocation = {
        pathname: Router.pathname,
        query: {
          gitref: this.props.gitref,
          repo: this.props.repo,
        },
      };

      Router.push(
        // We have to specify both the `href` (what it really is)
        newLocation,
        // and what location we want the users to see `as`
        newLocation,
        // in order to change the URL without running getInitialProps
        // ref: https://github.com/zeit/next.js#shallow-routing
        { shallow: true }
        // While still providing something that is copy-pastable in the URL bar
      );
    }
    if (this.props.source !== this.state.sourceValue) {
      this.setState({
        sourceValue: this.props.source,
      });
    }
  }

  handleEditorChange = (source) => {
    this.setState({ sourceValue: source });
  };
  handleRepoChange = (event) => {
    this.setState({ repoValue: event.target.value });
  };
  handleGitrefChange = (event) => {
    this.setState({ gitrefValue: event.target.value });
  };
  handleKernelChange = (event) => {
    const { currentServerId: serverId, setActiveKernel } = this.props;
    setActiveKernel({ serverId, kernelName: event.target.value });
  };
  killKernel = (kernelName) => {
    const { serverId, killKernel } = this.props;
    killKernel({ serverId, kernelName });
  };
  restartKernel = (kernelName) => {
    const { serverId, restartKernel } = this.props;
    restartKernel({ serverId, kernelName });
  };
  handleFormSubmit = (event) => {
    const {
      currentServerId: oldServerId,
      activateServer,
      submitBinderForm,
    } = this.props;
    const { gitrefValue: gitref, repoValue: repo } = this.state;
    event.preventDefault();
    const serverId = utils.makeServerId({ gitref, repo });

    activateServer({ gitref, repo, serverId, oldServerId });
    submitBinderForm({ gitref, repo });
  };
  handleSourceSubmit = () => {
    const { currentServerId, currentKernelName, runSource } = this.props;
    const { sourceValue: source } = this.state;
    runSource({
      serverId: currentServerId,
      kernelName: currentKernelName,
      source,
    });
  };
  render() {
    const {
      currentKernel,
      codeMirrorMode,
      currentKernelName,
      currentServer,
      platform,
      showPanel,
      setShowPanel,
    } = this.props;
    const { repoValue, gitrefValue, sourceValue } = this.state;
    return (
      <div>
        <Layout>
          <Head>
            <link rel="dns-prefetch" href="https://mybinder.org" />
            <link
              rel="prefetch"
              href="https://mybinder.org/static/logo.svg?v=f9f0d927b67cc9dc99d788c822ca21c0"
            />
            {/*
            prefetch our little sample graphic for an extra touch of ✨
          */}
            <link rel="prefetch" href="https://bit.ly/storybot-vdom" />
            <link
              rel="prefetch"
              href="https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif"
            />
            <title>nteract play: Run interactive code</title>
          </Head>
          <Header>
            <div className="left">
              <button
                onClick={this.handleSourceSubmit}
                className="play"
                disabled={!currentKernel}
                title={`run cell (${platform === "macOS" ? "⌘-" : "Ctrl-"}⏎)`}
              >
                ▶ Run
              </button>
              <button onClick={() => setShowPanel(!showPanel)}>
                {showPanel ? "Hide" : "Show"} logs
              </button>
            </div>
            {currentServer && currentKernel ? (
              <KernelUI
                status={currentKernel.status}
                kernelspecs={
                  currentServer.kernelSpecs &&
                  currentServer.kernelSpecs.kernelSpecByKernelName
                    ? currentServer.kernelSpecs.kernelSpecByKernelName
                    : {}
                }
                currentKernel={currentKernelName}
                onChange={this.handleKernelChange}
                gitref={this.state.gitrefValue}
              />
            ) : null}
          </Header>
          <Console>
            {showPanel ? (
              <BinderConsole
                onGitrefChange={this.handleGitrefChange}
                onRepoChange={this.handleRepoChange}
                onFormSubmit={this.handleFormSubmit}
                logs={
                  currentServer && currentServer.messages
                    ? currentServer.messages
                    : emptyList
                }
                repo={repoValue}
                gitref={gitrefValue}
              />
            ) : null}
          </Console>
          <Side>
            <img
              src={NTERACT_LOGO_URL}
              alt="nteract logo"
              className="nteract-logo"
            />
            <FilesListing
              org={this.state.org}
              repo={this.state.repo}
              gitRef={this.state.gitRef}
            ></FilesListing>
          </Side>
          <Body>
            <PlayEditor>
              <CodeMirrorEditor
                // TODO: these should have defaultProps on the codemirror editor
                cellFocused
                editorFocused
                channels={
                  currentKernel && currentKernel.channel
                    ? currentKernel.channel
                    : null
                }
                tip
                completion
                // TODO: This is the notebook implementation leaking into the editor
                //       component. It shouldn't be here, I won't refactor it as part
                //       of the current play PR though.
                id="not-really-a-cell"
                onFocusChange={() => {}}
                focusAbove={() => {}}
                focusBelow={() => {}}
                // END TODO for notebook leakage
                // TODO: kernelStatus should be allowed to be null or undefined,
                //       resulting in thought of as either idle or not connected by
                //       default. This is primarily used for determining if code
                //       completion should be enabled
                kernelStatus={
                  currentKernel ? currentKernel.status : "not connected"
                }
                options={{
                  lineNumbers: true,
                  extraKeys: {
                    "Ctrl-Space": "autocomplete",
                    "Ctrl-Enter": this.handleSourceSubmit,
                    "Cmd-Enter": this.handleSourceSubmit,
                  },
                  cursorBlinkRate: 0,
                  mode: codeMirrorMode,
                }}
                value={sourceValue}
                onChange={this.handleEditorChange}
              />
            </PlayEditor>

            <PlayOutputs>
              <Outputs>
                <Display
                  outputs={
                    currentKernel && currentKernel.outputs
                      ? currentKernel.outputs
                      : emptyList
                  }
                  expanded
                />
              </Outputs>
            </PlayOutputs>
          </Body>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    repo: state.ui.repo,
    gitref: state.ui.gitref,
    source: state.ui.source,
    path: state.ui.path,
    platform: state.ui.platform,
    showPanel: state.ui.showPanel,
    currentServerId: state.ui.currentServerId,
    currentKernelName: state.ui.currentKernelName,
    codeMirrorMode: state.ui.codeMirrorMode,
    currentKernel: objectPath.get(state, [
      "entities",
      "serversById",
      state.ui.currentServerId,
      "server",
      "activeKernelsByName",
      state.ui.currentKernelName,
      "kernel",
    ]),
    currentServer: objectPath.get(state, [
      "entities",
      "serversById",
      state.ui.currentServerId,
      "server",
    ]),
    ...ownProps,
  };
};

const mapDispatchToProps = {
  activateServer: actions.activateServer,
  submitBinderForm: actions.submitBinderForm,
  setShowPanel: actions.setShowPanel,
  runSource: actions.runSource,
  setActiveKernel: actions.setActiveKernel,
  initalizeFromQuery: actions.initalizeFromQuery,
  fetchFiles: actions.fetchFiles,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
