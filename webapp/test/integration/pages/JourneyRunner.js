sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"zsalesorder/test/integration/pages/SalesReportList.gen",
	"zsalesorder/test/integration/pages/SalesReportObjectPage.gen"
], function (JourneyRunner, SalesReportListGenerated, SalesReportObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('zsalesorder') + '/test/flp.html#app-preview',
        pages: {
			onTheSalesReportListGenerated: SalesReportListGenerated,
			onTheSalesReportObjectPageGenerated: SalesReportObjectPageGenerated
        },
        async: true
    });

    return runner;
});

