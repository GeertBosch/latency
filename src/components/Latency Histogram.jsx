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
    const stats = this.props.latencyStats;
    const reads = stats.latencyStats ? stats.latencyStats.reads : {};
    const writes = stats.latencyStats ? stats.latencyStats.writes : {};
    const commands = stats.latencyStats ? stats.latencyStats.commands : {};

    const encoding = {
      x: {field: 'micros', type: 'quantitative', scale: {type: 'log'}},
      y: {field: 'count', type: 'quantitative', aggregate: 'average'}
    };
    const collection = stats ? stats.ns : '';

    const spec = {mark: 'bar', encoding: encoding};
    const readData = {
      values: reads && reads.histogram ? reads.histogram : [ {micros: 0, count: 0} ]
    };
    const writeData = {
      values: writes && writes.histogram ? writes.histogram : [ {micros: 0, count: 0} ]
    };
    const commandData = {
      values: commands && commands.histogram ? commands.histogram : [ {micros: 0, count: 0} ]
    };
    const readVega = (
        <VegaLite spec={spec} data={readData} encoding={encoding}/>
    );
    const writeVega = (
        <VegaLite spec={spec} data={writeData} encoding={encoding}/>
    );
    const commandVega = (
        <VegaLite spec={spec} data={commandData} encoding={encoding}/>
    );
    //    {vega}

    return (
      <div className="latency-histogram">
        <h2 className="latency-histogram-title">Latency Histogram for {collection}</h2>
        <p><i>Displays a histogram with aggregated operation latency of reads, writes and
          commands</i></p>
        <ToggleButton onClick={this.onClick} />
        <table>
        <tr>
        <td>Reads</td><td>Writes</td><td>Commands</td>
        </tr>
        <tr>
        <td>{readVega}</td>
        <td>{writeVega}</td>
        <td>{commandVega}</td>
        </tr>
        </table>
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
