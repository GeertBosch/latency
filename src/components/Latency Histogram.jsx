const React = require('react');
const PropTypes = require('prop-types');
const LatencyHistogramActions = require('../actions');
const ToggleButton = require('./toggle-button');

// const debug = require('debug')('mongodb-compass:latency-histogram');

class LatencyHistogramComponent extends React.Component {

  onClick() {
    LatencyHistogramActions.toggleStatus();
  }

  /**
   * Render LatencyHistogram component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="latency-histogram">
        <h2 className="latency-histogram-title">LatencyHistogramComponent</h2>
        <p><i>Displays a histogram with aggregated operation latency of reads, writes and commands</i></p>
        <p>The current status is: <code>{this.props.status}</code></p>
        <ToggleButton onClick={this.onClick} />
      </div>
    );
  }
}

LatencyHistogramComponent.propTypes = {
  status: PropTypes.oneOf(['enabled', 'disabled'])
};

LatencyHistogramComponent.defaultProps = {
  status: 'enabled'
};

LatencyHistogramComponent.displayName = 'LatencyHistogramComponent';

module.exports = LatencyHistogramComponent;
