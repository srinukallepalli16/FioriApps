sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.mybankdetails.controller.App", {
        onInit() {
            debugger
            let appLang;
            if(navigator.language=="i18n_h"){
                appLang = "i18n";
                var i18nModel = this.getOwnerComponent().getModel(appLang);
                this.getOwnerComponent().setModel(i18nModel,"i18n");
            }else if(navigator.language == "en-"){
                appLang = "i18n_es";
                var i18nModel = this.getOwnerComponent().getModel(appLang);
                this.getOwnerComponent().setModel(i18nModel,"i18n");
            }
            else{
                var i18nModel = this.getOwnerComponent().getModel("i18n_es");
                this.getOwnerComponent().setModel(i18nModel,"i18n");
            }

        },
        moredetails:function(){
            if(!this.moreDetails){
                this.moreDetails = this.loadFragment({
                    name: "com.sap.mybankdetails.view.fragments.MoreDetail"
                })
            }
            this.moreDetails.then(function(oDailog){
                   oDailog.open();
            })
        },
        cancelbtn:function(){
            this.byId("dailog").close();
        }
    });
});