sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "../model/formatter"
], (Controller,MessageBox,MessageToast,formatter) => {
    "use strict";

    return Controller.extend("com.sap.mybankdetails.controller.App", {
        onInit() {
            // debugger
        /*Setting Global JSON Model*/
         this._setGlobalModel();
        /* Checking browser language and setting the global resource model*/
         this._setGlobalLanguage();
         /*
         let oProfileModel = new sap.ui.model.json.JSONModel(
            {profile: sap.ui.require.toUrl(com/sap/mybankdetails/images/profile1.jpg)}
        );
        this.getView().setModel(oProfileModel);
        */
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
        },
        _setGlobalModel:function(){
            let oModel = this.getOwnerComponent().getModel("oBankDetails");
            this.getView().setModel(oModel);
        },
        _setGlobalLanguage:function(){
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
        donutcharts:function(){
            MessageToast.show("The Interactive Donut Chart is pressed.");
        },
        onSelectionChanged:function(oEvent){
            let oSegment = oEvent.getParameter("segment");
            MessageToast.show(oSegment.getLabel()+ " : " + ((oSegment.getValue() > 50) ? "Critical":"Moderate") );

        }

    });
});

  /*
let oData = {
"ifsccode": "098765454"
}
            
      
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