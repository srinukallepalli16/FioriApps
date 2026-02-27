sap.ui.define([
    "sap/ui/core/mvc/Controller"
],function(Controller){
    "use strict";
    return Controller.extend("ui51.controller.View2",{
        onhomePage:function(){
            // this.getOwnerComponent().getRouter().navTo("RouteView1")
            // this.getOwnerComponent().getTargets().display("View1");

            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPrevioushHash = oHistory.getPreviousHash();
            if(sPrevioushHash !== undefined){
                window.history.go(-1);
            }
            else{
                this.getOwnerComponent().getRouter().navTo("RouteView1");
            }
        }
    })
})