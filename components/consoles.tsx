import React, { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

const Image = styled.img`
  vertical-align: middle;
  margin: 0 0 7px 0px;
`;

class BinderLogo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <a
          className="anchor"
          href="https://mybinder.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image
            src="https://mybinder.org/static/logo.svg?v=f9f0d927b67cc9dc99d788c822ca21c0"
            alt="binder logo"
            height="20px"
          />
        </a>
      </React.Fragment>
    );
  }
}

type BinderTextInputProps = {
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  value: string;
  id: string;
  labelText: string;
  name: string;
};

const Label = styled.label`
  input {
    font-family: inherit;
    font-size: inherit;
  }

  span {
    width: 12em;
    display: inline-block;
  }
`;

const Fieldset = styled.fieldset`
  border: none;
  padding-left: 0px;
  margin-left: 0px;
`;

class BinderTextInput extends React.Component<BinderTextInputProps> {
  render() {
    const { onChange, value, id, labelText, name } = this.props;

    return (
      <React.Fragment>
        <Fieldset>
          <Label htmlFor={id}>
            <span>{labelText}</span>
            <input
              id={id}
              onChange={onChange}
              type="text"
              name={name}
              value={value}
              size={80}
            />
          </Label>
        </Fieldset>
      </React.Fragment>
    );
  }
}

type BinderFormProps = {
  onSubmit(event: FormEvent<HTMLFormElement>): void;
};

const Button = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 5px 10px 5px 10px;
  background-color: black;
  color: white;
  border: 1px solid white;

  :active {
    background-color: #1a1a1a;
    border: 1px solid #e7e7e7;
  }

  :hover {
    background-color: #2a2a2a;
    border: 1px solid #d7d7d7;
  }
`;

class BinderForm extends React.Component<BinderFormProps> {
  render() {
    const { onSubmit } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={onSubmit} className="form">
          {this.props.children}
          <Fieldset>
            <Button type="submit">Build and Connect</Button>
          </Fieldset>
        </form>
      </React.Fragment>
    );
  }
}

type BinderLogsProps = {
  logs: Array<{
    phase: string;
    message: string;
  }>;
};

const Logs = styled.div`
  margin: 5px 0px 5px 0px;
`;

const Log = styled.span`
  padding: 0 15px 0 0px;
  margin: 0;
  min-height: 16px;
  display: block;

  :last-child {
    background-color: #292929;
  }
`;

const Phase = styled.span`
  display: inline-block;
  min-width: 80px;
  padding-right: 10px;
  text-decoration: none;
  color: #888;
`;

const Sidebar = styled.span`
  display: inline-block;
  text-align: left;
  min-width: 20px;
  text-decoration: none;
  color: #666;

  ::before {
    content: counter(line-numbering);
    counter-increment: line-numbering;
    padding-right: 1em;
  }
`;

class BinderLogs extends React.Component<BinderLogsProps> {
  render() {
    const { logs } = this.props;
    return (
      <Logs>
        {logs.length > 0
          ? logs.map((log, index) => {
              return (
                <Log key={index}>
                  <Sidebar />
                  <Phase>{log.phase}</Phase>
                  <span className="content">
                    <span className="message">{log.message}</span>
                  </span>
                </Log>
              );
            })
          : null}
      </Logs>
    );
  }
}

const ConsoleDiv = styled.div`
  clear: left;
  min-height: 42px;
  padding: 15px 0px 20px 25px;
  color: #f1f1f1;
  font-family: Monaco, monospace;
  font-size: 12px;
  line-height: 19px;
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #1a1a1a;
  counter-reset: line-numbering;
  margin-top: 0;
`;

export class Console extends React.Component {
  render() {
    return <ConsoleDiv className="console">{this.props.children}</ConsoleDiv>;
  }
}

type BinderConsoleProps = {
  logs: Array<{
    phase: string;
    message: string;
  }>;
  onRepoChange(event: ChangeEvent<HTMLInputElement>): void;
  onGitrefChange(event: ChangeEvent<HTMLInputElement>): void;
  repo: string;
  gitref: string;
  onFormSubmit(event: FormEvent<HTMLFormElement>): void;
};

export class BinderConsole extends React.Component<BinderConsoleProps> {
  render() {
    const {
      logs,
      onRepoChange,
      onGitrefChange,
      repo,
      gitref,
      onFormSubmit
    } = this.props;
    return (
      <Console>
        <BinderLogo />
        <BinderForm onSubmit={onFormSubmit}>
          <BinderTextInput
            onChange={onRepoChange}
            id="repoInput"
            value={repo}
            labelText="Github Repo:"
            name="repo"
          />
          <BinderTextInput
            onChange={onGitrefChange}
            id="gitrefInput"
            name="gitref"
            value={gitref}
            labelText="Branch/commit/tag:"
          />
        </BinderForm>
        <BinderLogs logs={logs} />
      </Console>
    );
  }
}
