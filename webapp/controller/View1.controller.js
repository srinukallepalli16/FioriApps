sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.app.thresholdapp.controller.View1", {
        onInit() {
            // var oSmartTable = this.byId("smartTable");

            // oSmartTable.attachInitialise(function () {
            //     var oInnerTable = oSmartTable.getTable();
            //     oInnerTable.setGrowing(true);
            //     oInnerTable.setGrowingThreshold(5);
            // });
        },
        smartControls: function () {
            this.getView().byId("_IDGenApp").to(this.getView().byId("smartControls"));

        },
        backToTable: function () {
            this.getView().byId("_IDGenApp").back();
        }
    });
});