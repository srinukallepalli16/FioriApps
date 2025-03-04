sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.mybankdetails.controller.App", {
        onInit() {
        },
        openbankdetails: function () {
            //create dailog lazily
            if (!this.moreBankDetails) {
                this.moreBankDetails = this.loadFragment(
                    {
                        name: "com.sap.mybankdetails.view.fragments.MoreDetails"
                    }
                );
            }
            this.moreBankDetails.then(function (oDailog) {
                oDailog.open();
            });
        },
        onCloseBankDetail: function () {
            this.byId("morebankDetails").close();
        }

    });
});