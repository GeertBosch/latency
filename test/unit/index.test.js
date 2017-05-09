const expect = require('chai').expect;
const LatencyHistogramStore = require('../../lib/stores');

describe('LatencyHistogramStore', function() {
  beforeEach(function() {
    // reset the store to initial values
    LatencyHistogramStore.setState(LatencyHistogramStore.getInitialState());
  });

  it('should have an initial state of {status: \'enabled\'}', function() {
    expect(LatencyHistogramStore.state.status).to.be.equal('enabled');
  });

  describe('toggleStatus()', function() {
    it('should switch the state to {status: \'disabled\'}', function() {
      LatencyHistogramStore.toggleStatus();
      expect(LatencyHistogramStore.state.status).to.be.equal('disabled');
    });

    it('should switch the state back to {status: \'enabled\'} when used a second time', function() {
      LatencyHistogramStore.toggleStatus();
      LatencyHistogramStore.toggleStatus();
      expect(LatencyHistogramStore.state.status).to.be.equal('enabled');
    });
  });
});
