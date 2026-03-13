/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["routing/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
