import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LatencyHistogramComponent from '../src/components/Latency Histogram';
import ConnectedLatencyHistogramComponent from '../src/components/';

storiesOf('LatencyHistogramComponent', module)
  .add('connected to store', () => <ConnectedLatencyHistogramComponent />)
  .add('enabled', () => <LatencyHistogramComponent status="enabled" />)
  .add('disabled', () => <LatencyHistogramComponent status="disabled" />);
