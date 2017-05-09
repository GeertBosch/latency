const LatencyHistogramComponent = require('./lib/components');
const LatencyHistogramActions = require('./lib/actions');
const LatencyHistogramStore = require('./lib/stores');

/**
 * A sample role for the component.
 */
const ROLE = {
  name: 'LatencyHistogram',
  component: LatencyHistogramComponent
};

/**
 * Activate all the components in the Latency Histogram package.
 */
function activate() {
  // Register the LatencyHistogramComponent as a role in Compass
  //
  // Available roles are:
  //   - Instance.Tab
  //   - Database.Tab
  //   - Collection.Tab
  //   - CollectionHUD.Item
  //   - Header.Item

  global.hadronApp.appRegistry.registerRole('Collection.Tab', ROLE);
  global.hadronApp.appRegistry.registerAction('LatencyHistogram.Actions', LatencyHistogramActions);
  global.hadronApp.appRegistry.registerStore('LatencyHistogram.Store', LatencyHistogramStore);
}

/**
 * Deactivate all the components in the Latency Histogram package.
 */
function deactivate() {
  global.hadronApp.appRegistry.deregisterRole('Collection.Tab', ROLE);
  global.hadronApp.appRegistry.deregisterAction('LatencyHistogram.Actions');
  global.hadronApp.appRegistry.deregisterStore('LatencyHistogram.Store');
}

module.exports = LatencyHistogramComponent;
module.exports.activate = activate;
module.exports.deactivate = deactivate;
