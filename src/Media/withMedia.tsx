/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { Media, MediaRenderProps, MediaProps } from './Media';
import { hoistNonReactStatics } from '../hoistStatics';

export function withMedia(HOCProps: MediaProps) {
  return function<Props>(
    Component: React.ComponentType<Props & MediaRenderProps>
  ) {
    const S: React.SFC<Props> = props => {
      return (
        <Media
          {...HOCProps}
          render={(p: MediaRenderProps) => <Component {...props} {...p} />}
        />
      );
    };

    return hoistNonReactStatics<Props>(
      S as any,
      Component as React.ComponentClass<Props & MediaRenderProps>
    ) as React.ComponentType<Props>;
  };
}
