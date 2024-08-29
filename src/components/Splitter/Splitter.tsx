import React from 'react';
import SplitPane, { SplitPaneProps } from 'react-split-pane';
import classNames from 'classnames';
// import css from './Splitter.css';
import './Splitter2.css'

export default function Splitter({
  ...rest
}: SplitPaneProps & { children: React.ReactNode }) {
  return (
    <SplitPane
      split="vertical"
      minSize={750}
      defaultSize={750}
      // className={classNames(css.root, className)}
      {...rest}
    />
  );
}
