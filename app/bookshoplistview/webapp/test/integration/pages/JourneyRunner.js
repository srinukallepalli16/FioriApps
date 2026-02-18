sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"bookshoplistview/test/integration/pages/BookList",
	"bookshoplistview/test/integration/pages/BookObjectPage"
], function (JourneyRunner, BookList, BookObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('bookshoplistview') + '/test/flp.html#app-preview',
        pages: {
			onTheBookList: BookList,
			onTheBookObjectPage: BookObjectPage
        },
        async: true
    });

    return runner;
});

