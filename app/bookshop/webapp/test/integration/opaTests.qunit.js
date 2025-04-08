sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'bookshop/test/integration/FirstJourney',
		'bookshop/test/integration/pages/BookList',
		'bookshop/test/integration/pages/BookObjectPage'
    ],
    function(JourneyRunner, opaJourney, BookList, BookObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('bookshop') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBookList: BookList,
					onTheBookObjectPage: BookObjectPage
                }
            },
            opaJourney.run
        );
    }
);