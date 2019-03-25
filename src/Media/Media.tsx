/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { SharedRenderProps } from '../types';
import { isEmptyChildren } from '../utils';

export interface MediaRenderProps {
  matches: boolean;
}

export interface MediaProps extends SharedRenderProps<MediaRenderProps> {
  query: string;
  defaultValue?: boolean;
}

export class Media extends React.Component<MediaProps, MediaRenderProps> {
  state: MediaRenderProps = { matches: navigator.onLine };
  mediaQueryList: MediaQueryList | null = null;

  static defaultProps: Partial<MediaProps> = {
    defaultValue: false,
  };

  updateMatches = () => {
    if (this.mediaQueryList) {
      const { matches } = this.mediaQueryList;
      this.setState({ matches });
    }
  };

  constructor(props: MediaProps) {
    super(props);

    if (typeof window.matchMedia === 'function') {
      this.mediaQueryList = window.matchMedia(this.props.query);
      this.state = {
        matches: this.mediaQueryList.matches,
      };
    } else {
      this.state = {
        matches: !!this.props.defaultValue,
      };
    }
  }

  componentDidMount() {
    if (this.mediaQueryList) {
      this.mediaQueryList.addListener(this.updateMatches);
    }
  }

  componentWillUnmount() {
    if (this.mediaQueryList) {
      this.mediaQueryList.removeListener(this.updateMatches);
    }
  }

  render() {
    const { render, component, children } = this.props;
    return component
      ? React.createElement(component as any, this.state)
      : render
        ? (render as any)(this.state)
        : children // children come last, always called
          ? typeof children === 'function'
            ? (children as any)(this.state)
            : !isEmptyChildren(children) ? React.Children.only(children) : null
          : null;
  }
}
