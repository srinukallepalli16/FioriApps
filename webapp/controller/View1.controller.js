sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("travelreq.controller.View1", {
        onInit() {
        },
        onAddPress: function () {
            // var oRouter = this.getOwnerComponent().getRouter();
            // oRouter.navTo("View4");
            MessageBox.confirm("Do you want to navigate to view 4 ?", {
                title: "Confirmation",
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.YES,
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.YES) {
                        var oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo("View4");
                    }
                }.bind(this)
            })
        }
    });
});