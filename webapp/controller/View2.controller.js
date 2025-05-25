sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project1.controller.View2", {
        onInit: function () {
            debugger
            var oRouter1 = this.getOwnerComponent().getRouter();
            oRouter1.getRoute("View2screen").attachPatternMatched(this._onRouteMatched, this);
        },
        
        _onRouteMatched: function (oEvent) {
            debugger
            var employid = oEvent.getParameter("arguments").employee;
            // var sPath = "/Employees('" + employid + "')";
            var sPath = "/Employees(" + employid + ")";
            this.getView().bindElement({
                path: sPath
            });
        },
        onButtonPress:function() {
            var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter1.navTo("RouteView1");
        }
    });
});