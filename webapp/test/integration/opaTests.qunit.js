/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["travelreq/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
