import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { KernelspecRecord } from "@nteract/types";

type KernelOptionProps = {
  kernelName: string;
};

class KernelOption extends React.Component<KernelOptionProps> {
  render() {
    const { kernelName } = this.props;
    return <option value={kernelName}>{kernelName}</option>;
  }
}

type KernelSelectorProps = {
  currentKernel: string;
  onChange(event: ChangeEvent<HTMLSelectElement>): void;
  kernelspecs: { [name: string]: KernelspecRecord };
};

const Form = styled.form`
  & label,
  select {
    font-family: inherit;
    font-size: inherit;
  }
`;

class KernelSelector extends React.Component<KernelSelectorProps> {
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

type KernelUIProps = {
  status: string;
  currentKernel: string;
  onChange(event: any): void;
  kernelspecs: { [name: string]: KernelspecRecord };
};

const KernelData = styled.div`
  font-family: Monaco, monospace;
  font-size: 12px;
`;

const KernelInfo = styled.div`
  --header-height: 42px;
  color: #f1f1f1;
  line-height: var(--header-height);
  white-space: pre-wrap;
  word-wrap: break-word;
  vertical-align: middle;
  display: table-cell;
  padding-right: 20px;
`;

const KernelSelectorWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding-right: 10px;
  font-family: inherit;
  font-size: inherit;
`;

const KernelStatus = styled.div`
  color: #888;
  & span {
    color: #fff;
  }
`;

export class KernelUI extends React.Component<KernelUIProps> {
  render() {
    const { status, ...otherprops } = this.props; // eslint-disable-line no-unused-vars
    return (
      <KernelData>
        <KernelSelectorWrapper>
          <KernelSelector {...otherprops} />
        </KernelSelectorWrapper>
        <KernelInfo>
          <KernelStatus>
            Runtime: <span>{this.props.status} </span>
          </KernelStatus>
        </KernelInfo>
      </KernelData>
    );
  }
}
