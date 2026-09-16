sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
function (Controller,Fragment) {
    "use strict";

    return Controller.extend("com.zsalesmaterial.controller.View1", {
 onInit: function () {
            // Load the Sales table by default when the app opens
            this._loadDynamicTable("SalesTable");
        },

        onRadioSelect: function (oEvent) {
            // Check which radio button was clicked (0 = Sales, 1 = Material)
            var iSelectedIndex = oEvent.getParameter("selectedIndex");

            if (iSelectedIndex === 0) {
                this._loadDynamicTable("SalesTable");
            } else if (iSelectedIndex === 1) {
                this._loadDynamicTable("MaterialTable");
            }
        },

        _loadDynamicTable: function (sFragmentName) {
            var oView = this.getView();
            var oContainer = oView.byId("tableContainer");

            // 1. Destroy whatever table is currently on the screen
            oContainer.destroyItems();

            // 2. Load the requested separate file
            // IMPORTANT: Change "com.zsalesmaterial" to match your actual project namespace!
            Fragment.load({
                id: oView.getId(),
                name: "com.zsalesmaterial.view." + sFragmentName,
                controller: this
            }).then(function (oTable) {
                // Connect it to the OData model and add it to the screen
                oView.addDependent(oTable); 
                oContainer.addItem(oTable);
            });
        }
    });
});
