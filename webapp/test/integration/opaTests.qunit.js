/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["com/app/thresholdapp/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
