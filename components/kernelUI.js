import * as React from "react";

import styled from "styled-components";

class KernelOption extends React.Component {
  render() {
    const { kernelName } = this.props;
    return <option value={kernelName}>{kernelName}</option>;
  }
}

const Form = styled.form`
  label,
  select {
    font-family: inherit;
    font-size: inherit;
  }
`;

class KernelSelector extends React.Component {
  render() {
    const { kernelspecs, currentKernel, onChange } = this.props;
    return (
      <Form>
        <select
          value={currentKernel}
          onBlur={onChange}
          onChange={onChange}
          title="Active Kernel"
        >
          {Object.keys(kernelspecs).map(kernelName => {
            return <KernelOption kernelName={kernelName} key={kernelName} />;
          })}
        </select>
      </Form>
    );
  }
}

const KernelData = styled.div`
  font-family: Monaco, monospace;
  font-size: 12px;
`;

const KernelInfo = styled.div`
  color: #f1f1f1;
  line-height: var(--header-height);
  white-space: pre-wrap;
  word-wrap: break-word;
  vertical-align: middle;
  display: table-cell;
  padding-right: 20px;
`;

const KernelStatus = styled.div`
  color: #888;
  display: inline-block;
`;

const StyledSelector = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding-right: 10px;
  font-family: inherit;
  font-size: inherit;
`;

export class KernelUI extends React.Component {
  render() {
    const { status, ...otherprops } = this.props; // eslint-disable-line no-unused-vars
    return (
      <KernelData>
        <StyledSelector>
          <KernelSelector {...otherprops} />
        </StyledSelector>
        <KernelInfo>
          <KernelStatus>Runtime: </KernelStatus>
          {this.props.status}
        </KernelInfo>
      </KernelData>
    );
  }
}
