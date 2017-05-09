require('babel-register')({ extensions: ['.jsx'] });

const app = require('hadron-app');
const React = require('react');
const ReactDOM = require('react-dom');
const AppRegistry = require('hadron-app-registry');

const { DataServiceStore, DataServiceActions } = require('mongodb-data-service');
const Connection = require('mongodb-connection-model');

/**
 * Boilerplate.
 */
const CollectionStore = require('./stores/collection-store');

const LatencyHistogramComponent = require('../../lib/components');
const LatencyHistogramStore = require('../../lib/stores');
const LatencyHistogramActions = require('../../lib/actions');

const CONNECTION = new Connection({
  hostname: '127.0.0.1',
  port: 27018,
  ns: 'latency-histogram',
  mongodb_database_name: 'admin'
});

DataServiceStore.listen((error, ds) => {
  global.hadronApp.dataService = ds;
  global.hadronApp.appRegistry.onActivated();
  global.hadronApp.appRegistry.onConnected(error, ds);
  ReactDOM.render(
    React.createElement(LatencyHistogramComponent),
    document.getElementById('container')
  );
});

global.hadronApp = app;
global.hadronApp.appRegistry = new AppRegistry();
global.hadronApp.appRegistry.registerStore('App.CollectionStore', CollectionStore);
global.hadronApp.appRegistry.registerStore('LatencyHistogram.Store', LatencyHistogramStore);
global.hadronApp.appRegistry.registerAction('LatencyHistogram.Actions', LatencyHistogramActions);

DataServiceActions.connect(CONNECTION);
