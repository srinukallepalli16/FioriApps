sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/app/travel/travelapp1/test/integration/pages/TravelMain"
], function (JourneyRunner, TravelMain) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/app/travel/travelapp1') + '/test/flp.html#app-preview',
        pages: {
			onTheTravelMain: TravelMain
        },
        async: true
    });

    return runner;
});

