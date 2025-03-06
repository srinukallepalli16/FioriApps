sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.mybankdetails.controller.App", {
        onInit() {

            debugger
            /*
            if (navigator.language == "en-US") {
                var i18nModel = this.getOwnerComponent().getModel("i18n_es");
                this.getOwnerComponent().setModel(i18nModel, "i18n");
            } else {
                var i18nModel = this.getOwnerComponent().getModel("i18n");
                this.getOwnerComponent().setModel(i18nModel, "i18n");
            }
            */
           /* Checking browser language and setting 
           the global resource model*/
           var appLang;
           if(navigator.language == 'en-US1'){
            appLang = "i18n_es";
            var i18nModel = this.getOwnerComponent().getModel(appLang);
            this.getOwnerComponent().setModel(i18nModel, "i18n");
           }
           else if(navigator.language == 'en-US'){
            appLang = "i18n";
            var i18nModel = this.getOwnerComponent().getModel(appLang);
            this.getOwnerComponent().setModel(i18nModel, "i18n");
           }
           else{
            appLang = "i18n"
            var i18nModel = this.getOwnerComponent().getModel(appLang);
            this.getOwnerComponent().setModel(i18nModel, "i18n");
           }


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