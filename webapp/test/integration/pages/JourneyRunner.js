sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/zsalesmaterial01/test/integration/pages/SalesDataMain.gen"
], function (JourneyRunner, SalesDataMainGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/zsalesmaterial01') + '/test/flp.html#app-preview',
        pages: {
			onTheSalesDataMainGenerated: SalesDataMainGenerated
        },
        async: true
    });

    return runner;
});

