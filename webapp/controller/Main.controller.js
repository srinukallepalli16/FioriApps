sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/ColumnListItem",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Label",
    "sap/m/HBox",
    "sap/m/MessageBox"
], function (Controller, JSONModel, Column, Text, Input, ColumnListItem, Filter, FilterOperator, Label, HBox, MessageBox) {
    "use strict";

    return Controller.extend("com.zui.zdynamictable.controller.Main", {

        onInit: function () {
            this.getView().setModel(new JSONModel({
                rows: [],
                deletedRows: [], // NEW: Track deleted rows
                isLiveMode: false
            }), "localData");
        },

        _clearGrid: function () {
            var oTable = this.byId("dynamicTable");
            oTable.destroyColumns();
            oTable.unbindItems();
            this.getView().getModel("localData").setProperty("/rows", []);
            this.getView().getModel("localData").setProperty("/deletedRows", []);
            this._oODataContext = null; 
        },

        // ==========================================================
        // 1 & 2 & 3. F4 HELP & DYNAMIC FILTERS (UNCHANGED)
        // ==========================================================
        onTableF4: function (oEvent) {
            var oView = this.getView();
            sap.ui.core.BusyIndicator.show(0);
            var aFilters = [new Filter("TableName", FilterOperator.EQ, "ZHR_TABLE_MAINTA"), new Filter("FieldList", FilterOperator.EQ, "TABLE_NAME,TABLE_DESC")];
            var oListBinding = oView.getModel().bindList("/DynamicTable", null, null, aFilters);
            oListBinding.requestContexts(0, 1).then(function (aContexts) {
                sap.ui.core.BusyIndicator.hide();
                if (aContexts.length > 0) {
                    var oData = aContexts[0].getObject();
                    if (!this._oTableDialog) {
                        this._oTableDialog = new sap.m.SelectDialog({ title: "Select Allowed Table", confirm: this.onTableDialogConfirm.bind(this) });
                        this.getView().addDependent(this._oTableDialog);
                    }
                    this._oTableDialog.setModel(new JSONModel(JSON.parse(oData.DataJSON)), "tables");
                    this._oTableDialog.bindAggregation("items", { path: "tables>/", template: new sap.m.StandardListItem({ title: "{tables>TABLE_NAME}", description: "{tables>TABLE_DESC}" }) });
                    this._oTableDialog.open();
                }
            }.bind(this)).catch(function () { sap.ui.core.BusyIndicator.hide(); });
        },
        onTableDialogConfirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                this.byId("inTableName").setValue(oSelectedItem.getTitle());
                this.byId("inFieldList").setValue("");
                this.byId("inDynamicFilters").setValue("");
                this.byId("dynamicFilterInputsContainer").destroyItems();
                this._clearGrid();
            }
        },
        onFieldF4: function (oEvent) { this._openFieldSelectorDialog("inFieldList", "Select Fields to Display"); },
        onFilterF4: function (oEvent) { this._openFieldSelectorDialog("inDynamicFilters", "Select Fields for Filtering"); },
        _openFieldSelectorDialog: function(sTargetInputId, sTitle) {
            var oView = this.getView();
            var sTableName = oView.byId("inTableName").getValue().toUpperCase();
            if (!sTableName) { sap.m.MessageToast.show("Please enter a Table Name first!"); return; }
            sap.ui.core.BusyIndicator.show(0);
            var aFilters = [new Filter("TableName", FilterOperator.EQ, sTableName), new Filter("FieldList", FilterOperator.EQ, "MANDT")];
            var oListBinding = oView.getModel().bindList("/DynamicTable", null, null, aFilters);
            oListBinding.requestContexts(0, 1).then(function (aContexts) {
                sap.ui.core.BusyIndicator.hide();
                if (aContexts.length > 0) {
                    var oData = aContexts[0].getObject();
                    var oDialog = new sap.m.SelectDialog({ title: sTitle, multiSelect: true, 
                        confirm: function(oEvent) { this.onGenericFieldDialogConfirm(oEvent, sTargetInputId); }.bind(this),
                        search: function(oEvent) { var oFilter = new Filter("FIELDNAME", FilterOperator.Contains, oEvent.getParameter("value").toUpperCase()); oEvent.getSource().getBinding("items").filter([oFilter]); }
                    });
                    this.getView().addDependent(oDialog);
                    oDialog.setModel(new JSONModel(JSON.parse(oData.FieldCatalogJSON)), "catalog");
                    oDialog.bindAggregation("items", { path: "catalog>/", template: new sap.m.StandardListItem({ title: "{catalog>FIELDNAME}", description: "{catalog>FIELDTEXT}" }) });
                    oDialog.open();
                }
            }.bind(this)).catch(function () { sap.ui.core.BusyIndicator.hide(); });
        },
        onGenericFieldDialogConfirm: function (oEvent, sTargetInputId) {
            var aContexts = oEvent.getParameter("selectedContexts");
            if (aContexts && aContexts.length > 0) {
                var aSelectedFields = aContexts.map(function (oContext) { return oContext.getObject().FIELDNAME; });
                var oInput = this.byId(sTargetInputId);
                var sNewVal = oInput.getValue() ? oInput.getValue() + "," + aSelectedFields.join(",") : aSelectedFields.join(",");
                oInput.setValue(sNewVal);
                if (sTargetInputId === "inDynamicFilters") { this._generateFilterInputs(sNewVal); }
            }
            oEvent.getSource().destroy();
        },
        onFilterStringChange: function (oEvent) { this._generateFilterInputs(oEvent.getParameter("value")); },
        _generateFilterInputs: function (sFilterString) {
            var oContainer = this.byId("dynamicFilterInputsContainer"); oContainer.destroyItems(); 
            if (!sFilterString) return;
            sFilterString.split(",").forEach(function (sField) {
                sField = sField.trim().toUpperCase();
                if (sField) {
                    var oHBox = new HBox({ alignItems: "Center", class: "sapUiTinyMarginBottom" });
                    oHBox.addItem(new Label({ text: sField, width: "150px", design: "Bold" }));
                    oHBox.addItem(new Input({ id: this.getView().createId("dynFilterLow_" + sField), width: "150px", placeholder: "From..." }));
                    oHBox.addItem(new Text({ text: "to", class: "sapUiTinyMarginBeginEnd" }));
                    oHBox.addItem(new Input({ id: this.getView().createId("dynFilterHigh_" + sField), width: "150px", placeholder: "To..." }));
                    oContainer.addItem(oHBox);
                }
            }.bind(this));
        },
        onModeChange: function (oEvent) {
            var bIsLive = (oEvent.getParameter("selectedIndex") === 1); 
            this.getView().getModel("localData").setProperty("/isLiveMode", bIsLive);
            this.byId("btnInsert").setVisible(bIsLive);
            this.byId("btnDelete").setVisible(bIsLive);
            this.byId("btnSave").setVisible(bIsLive);
        },

        // ==========================================================
        // 4. FETCH DATA
        // ==========================================================
        onExecute: function () {
            var oView = this.getView();
            var sTableName = oView.byId("inTableName").getValue().toUpperCase();
            var sFieldList = oView.byId("inFieldList").getValue().toUpperCase();
            var oTable = this.byId("dynamicTable");

            this._clearGrid();

            if (!sTableName) { sap.m.MessageToast.show("Please enter a Table Name"); return; }
            if (!sTableName.startsWith("Z") && !sFieldList) { MessageBox.error("Standard tables are too large for SELECT *. Provide a Field List."); return; }

            oTable.setBusy(true);

            var aFilters = [ new Filter("TableName", FilterOperator.EQ, sTableName) ];
            if (sFieldList) aFilters.push(new Filter("FieldList", FilterOperator.EQ, sFieldList));

            var sDynamicFilters = oView.byId("inDynamicFilters").getValue();
            var aWhereParts = [];
            if (sDynamicFilters) {
                sDynamicFilters.split(",").forEach(function(sName) {
                    sName = sName.trim().toUpperCase();
                    var oInputLow = oView.byId("dynFilterLow_" + sName), oInputHigh = oView.byId("dynFilterHigh_" + sName);
                    if (oInputLow && oInputHigh) {
                        var sLow = oInputLow.getValue(), sHigh = oInputHigh.getValue();
                        if (sLow && sHigh) aWhereParts.push(sName + " BETWEEN '" + sLow + "' AND '" + sHigh + "'");
                        else if (sLow) aWhereParts.push(sName + " = '" + sLow + "'");
                    }
                });
                if (aWhereParts.length > 0) aFilters.push(new Filter("FilterString", FilterOperator.EQ, aWhereParts.join(" AND ")));
            }

            var oListBinding = oView.getModel().bindList("/DynamicTable", null, null, aFilters);

            oListBinding.requestContexts(0, 1).then(function (aContexts) {
                oTable.setBusy(false);
                if (aContexts.length > 0) {
                    this._oODataContext = aContexts[0]; // Store for Save
                    
                    var oBackendData = this._oODataContext.getObject();
                    var aFieldCatalog = JSON.parse(oBackendData.FieldCatalogJSON);
                    var aTableData = JSON.parse(oBackendData.DataJSON);
                    this._buildDynamicTable(aFieldCatalog, aTableData, sFieldList);
                }
            }.bind(this)).catch(function () {
                oTable.setBusy(false);
                sap.m.MessageToast.show("Error fetching data from Backend");
            });
        },

        _buildDynamicTable: function (aFieldCatalog, aTableData, sFieldList) {
            var oTable = this.byId("dynamicTable");
            var aCells = [];
            var aRequestedFields = sFieldList ? sFieldList.split(",").map(function(f) { return f.trim(); }) : [];

            aFieldCatalog.forEach(function (oField) {
                if (aRequestedFields.length > 0 && oField.FIELDNAME !== "MANDT" && aRequestedFields.indexOf(oField.FIELDNAME) === -1) { return; }

                if (oField.FIELDNAME !== "MANDT" && oField.FIELDNAME !== "CELLSTYLES") {
                    oTable.addColumn(new Column({ header: new Text({ text: oField.SCRTEXT_M || oField.FIELDNAME }) }));

                    var sEditableBinding = (oField.KEYFLAG === "X") ? 
                        "{= ${localData>/isLiveMode} === true && ${localData>__isNew} === true }" : 
                        "{localData>/isLiveMode}";

                    aCells.push(new Input({ value: "{localData>" + oField.FIELDNAME + "}", editable: sEditableBinding }));
                }
            });

            this.getView().getModel("localData").setProperty("/rows", aTableData);
            var oRowTemplate = new ColumnListItem({ cells: aCells });
            oTable.bindItems({ path: "localData>/rows", template: oRowTemplate });
        },

        // ==========================================================
        // 5. DATA MUTATION (INSERT, DELETE WITH POPUPS, SAVE)
        // ==========================================================
        onInsertRow: function () {
            var oModel = this.getView().getModel("localData");
            var aRows = oModel.getProperty("/rows") || [];
            aRows.unshift({ __isNew: true });
            oModel.setProperty("/rows", aRows);
        },

        onDeleteRow: function () {
            var oTable = this.byId("dynamicTable");
            var aContexts = oTable.getSelectedContexts();
            
            if (aContexts.length === 0) {
                MessageBox.warning("Please select at least one row using the checkboxes.");
                return;
            }

            // ADDED: Confirmation POPUP for Deletion
            MessageBox.confirm("Are you sure you want to delete the selected record(s)?", {
                title: "Confirm Deletion",
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        var oModel = this.getView().getModel("localData");
                        var aRows = oModel.getProperty("/rows");
                        var aDeletedRows = oModel.getProperty("/deletedRows");

                        var aIndices = aContexts.map(function(c) { return parseInt(c.getPath().split("/").pop()); }).sort(function(a, b) { return b - a; });
                        
                        aIndices.forEach(function(idx) {
                            var oDeletedRow = aRows[idx];
                            // Add to deletion list, unless it's a new row that was never saved!
                            if (!oDeletedRow.__isNew) {
                                aDeletedRows.push(oDeletedRow);
                            }
                            aRows.splice(idx, 1);
                        });

                        oModel.setProperty("/rows", aRows);
                        oModel.setProperty("/deletedRows", aDeletedRows);
                        oTable.removeSelections(true);
                    }
                }.bind(this)
            });
        },

        onSaveChanges: function () {
            if (!this._oODataContext) { return; }

            // ADDED: Confirmation POPUP for Saving
            MessageBox.confirm("Save changes to database?", {
                title: "Confirm Save",
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        this._executeSave();
                    }
                }.bind(this)
            });
        },

        _executeSave: function () {
            var oModel = this.getView().getModel("localData");
            var aRows = oModel.getProperty("/rows");
            var aDeletedRows = oModel.getProperty("/deletedRows");
            var oTable = this.byId("dynamicTable");

            // Clean frontend '__isNew' flags so ABAP parsing doesn't crash
            var aCleanRows = JSON.parse(JSON.stringify(aRows));
            aCleanRows.forEach(function(row) { delete row.__isNew; });
            
            var aCleanDeleted = JSON.parse(JSON.stringify(aDeletedRows));
            aCleanDeleted.forEach(function(row) { delete row.__isNew; });

            // Push BOTH the Modify list and the Delete list to the backend!
            this._oODataContext.setProperty("DataJSON", JSON.stringify(aCleanRows));
            this._oODataContext.setProperty("DeletedDataJSON", JSON.stringify(aCleanDeleted));

            oTable.setBusy(true);

            this.getView().getModel().submitBatch(this.getView().getModel().getUpdateGroupId()).then(function () {
                oTable.setBusy(false);
                MessageBox.success("Saved successfully!");
                
                // Refresh grid to reflect the live DB state
                this.onExecute();
            }.bind(this)).catch(function () {
                oTable.setBusy(false);
                MessageBox.error("Database update failed.");
            });
        }
    });
});