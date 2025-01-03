sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("logins.controller.App", {
        onInit() {
            var obj ={
                "data":{
                   name :"srinu"
                }
            }
           var oModel = new sap.ui.model.json.JSONModel(obj);
           this.getView().setModel(oModel,"oModel");
        },
        loginpress:function(){
           var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           oRouter.navTo("Routedashboard");
        }
        // navbutton:function(){
        //     var oNavto = sap.ui.core.UIComponent.getRouterFor(this);
        //     oNavto.navTo("RouteApp");
        // }
        // sample code 
    });
});