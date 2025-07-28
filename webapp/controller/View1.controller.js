sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/resource/ResourceModel"
], (Controller, ResourceModel) => {
    "use strict";

    return Controller.extend("resource.controller.View1", {
        onInit() {
            debugger
        },
        // onPress: function () {
        //     const oBundle = this.getView().getModel("i18n").getResourceBundle();
        //     const sText = oBundle.getText("welcome");
        //     sap.m.MessageToast.show(sText);
        // },
        onLangChange: function (oEvent) {
            const lang = oEvent.getParameter("selectedItem").getKey(); 
            const i18nModel = new sap.ui.model.resource.ResourceModel({
                bundleName: "resource.i18n.i18n",
                bundleLocale: lang
            });
            this.getView().setModel(i18nModel, "i18n");
        }
    });
});
