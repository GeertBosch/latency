const Reflux = require('reflux');

const LatencyHistogramActions = Reflux.createActions([
  /**
   * define your actions as strings below, for example:
   */
  'toggleStatus',
  'latencyStats'
]);

module.exports = LatencyHistogramActions;
