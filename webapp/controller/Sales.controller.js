sap.ui.define([
    "sap/ui/core/mvc/Controller"
],function(Controller){
    "use strict";
    return Controller.extend("com.zsalesmaterial.controller.Sales",{
        onNavBack:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        }
    })
})