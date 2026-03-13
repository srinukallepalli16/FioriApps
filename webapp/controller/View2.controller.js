sap.ui.define([
    "sap/ui/core/mvc/Controller"
],function(Controller){
    "use strict";
    return Controller.extend("routing.controller.View2",{
        onHomeView:function(){
            var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter1.navTo("RouteView1");
        }
    })
})