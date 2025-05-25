sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
            // debugger
        },
        viewscreen: function (oEvent) {
            var oRouter = this.getOwnerComponent().getRouter();
            var oItem = oEvent.getParameter("listItem");
            var oContext = oItem.getBindingContext();
            var Employeeid1 = oContext.getProperty("EmployeeID");
            oRouter.navTo("View2screen", {
                employee: Employeeid1
            });
        }
    });
});