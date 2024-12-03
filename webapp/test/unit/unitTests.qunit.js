/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"comsap/mybank_details/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});