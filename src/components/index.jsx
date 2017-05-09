const React = require('react');
const { StoreConnector } = require('hadron-react-components');
const LatencyHistogramComponent = require('./Latency Histogram');
const Store = require('../stores');
const Actions = require('../actions');

// const debug = require('debug')('mongodb-compass:latency-histogram:index');

class ConnectedLatencyHistogramComponent extends React.Component {
  /**
   * Connect LatencyHistogramComponent to store and render.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <StoreConnector store={Store}>
        <LatencyHistogramComponent actions={Actions} {...this.props} />
      </StoreConnector>
    );
  }
}

ConnectedLatencyHistogramComponent.displayName = 'ConnectedLatencyHistogramComponent';

module.exports = ConnectedLatencyHistogramComponent;
