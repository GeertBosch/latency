const React = require('react');
import VegaLite from 'react-vega-lite';
const PropTypes = require('prop-types');
const LatencyHistogramActions = require('../actions');
const ToggleButton = require('./toggle-button');

const debug = require('debug')('mongodb-compass:latency-histogram');

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
    debug(this);
    const data = {
      values: [
        {a: 'C', b: 2}, {a: 'C', b: 7},
        {a: 'C', b: 4}, {a: 'D', b: 1},
        {a: 'D', b: 2}, {a: 'D', b: 6},
        {a: 'E', b: 8}, {a: 'E', b: 4},
        {a: 'E', b: 7}
      ]
    };
    const encoding = {
      x: {field: 'a', type: 'nominal'},
      y: {field: 'b', type: 'quantitative', aggregate: 'average'}
    };
    const spec = {mark: 'bar', encoding: encoding};
    const collection = 'test.x';

    const stats = JSON.stringify(this.props.latencyStats);
    const hist = this.props.status === 'enabled' ? '' : '';

    return (
      <div className="latency-histogram">
        <h2 className="latency-histogram-title">Latency Histogram for {collection}</h2>
        <p><i>Displays a histogram with aggregated operation latency of reads, writes and commands</i></p>
        <p>The current status is: <code>{this.props.status}</code></p>
        <ToggleButton onClick={this.onClick} />
        {hist}
        <p>Latency statistics: <code>{stats}</code></p>
        <VegaLite spec={spec} data={data} encoding={encoding}/>
      </div>
    );
  }
}

LatencyHistogramComponent.propTypes = {
  status: PropTypes.oneOf(['enabled', 'disabled']),
  latencyStats: React.PropTypes.object
};

LatencyHistogramComponent.defaultProps = {
  status: 'enabled',
  latencyStats: {}
};

LatencyHistogramComponent.displayName = 'LatencyHistogramComponent';

module.exports = LatencyHistogramComponent;
