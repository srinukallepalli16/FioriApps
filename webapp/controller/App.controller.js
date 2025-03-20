sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.mybankdetails.controller.App", {
        onInit() {
            debugger

            let oData = {
                "AccountDetails": {
                    AccountNum: "12345678",
                    Name: "Srinu Kallepalli",
                    IFSCCode: "0987654",
                    CustomerId:"123******",
                    Address :{
                        city:"Srikakulam",
                        postalcode:"12345",
                        country:"USA"
                    }
                },
                // "ifsccode": "098765454"
               "cardDetails":[
                   {
                    CardCompany:"Master Card",
                    cardtype:"Credit Card",
                    cardnumber:"1111111111",
                    assignmentdate:"assigned on 12 oct 2024",
                    state:false

                   },
                   {
                    CardCompany:"Master Card",
                    cardtype:"Debit Card",
                    cardnumber:"453627891",
                    assignmentdate:"assigned on 12 nov 2022",
                    state:true

                   },
                   {
                    CardCompany:"Master Card",
                    cardtype:"Debit Card",
                    cardnumber:"8759363738",
                    assignmentdate:"assigned on 16 march 2023",
                    state:false

                   },
                   {
                    CardCompany:"Master Card",
                    cardtype:"Credit Card",
                    cardnumber:"62372376327",
                    assignmentdate:"assigned on 19 jun 2025",
                    state:true

                   }
               ]

            };
            
      
            let oModel = new sap.ui.model.json.JSONModel();
            oModel.setData(oData);
            this.getView().setModel(oModel,"oBankDetails");
            // debugger
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
            if (navigator.language == 'en-US1') {
                appLang = "i18n_es";
                var i18nModel = this.getOwnerComponent().getModel(appLang);
                this.getOwnerComponent().setModel(i18nModel, "i18n");
            }
            else if (navigator.language == 'en-US') {
                appLang = "i18n";
                var i18nModel = this.getOwnerComponent().getModel(appLang);
                this.getOwnerComponent().setModel(i18nModel, "i18n");
            }
            else {
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