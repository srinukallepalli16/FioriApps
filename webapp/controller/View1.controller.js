sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui51.controller.View1", {
        onInit() {
        },
        onfirstpage:function(){
            this.getOwnerComponent().getRouter().navTo("View2");
            //    this.getOwnerComponent().getRouter().navTo("View2");
            //  this.getOwnerComponent().getTargets().display("View2");
            // this.getOwnerComponent().getTargets().display("View2");
               // this.getOwnerComponent().getRouter().navTo("RouteView1");
            // this.getOwnerComponent().getTargets().display("View2");
            // this.getOwnerComponent().getTargets().back(); getTargets does have a back() method it not works
            // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // oRouter.navTo("RouteView1");
        }
    });
});