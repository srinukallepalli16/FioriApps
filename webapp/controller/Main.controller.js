sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, MessageToast, MessageBox, Fragment, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ZEMPCRUD.controller.Main", {
		onInit: function() {
			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZHR_EMP_DATA_SRV/", {
				defaultUpdateMethod: "PUT"
			});
			this.getView().setModel(oModel);
		},
		// onCreateButton: function() {

		// 	var oModel = this.getView().getModel();

		// 	var sEmpno = this.byId("empid").getValue();
		// 	var sEname = this.byId("emname").getValue();
		// 	var sContact = this.byId("empcontactno").getValue();
		// 	var sDesignation = this.byId("empdesignation").getValue();
		// 	var sWorkingunder = this.byId("empworkingunder").getValue();

		// 	if (!sEmpno || !sEname) {
		// 		MessageBox.error("Please enter Employee Id and Employee Name");
		// 		return;
		// 	}
		// 	var oFilter = new Filter("Empno",FilterOperator.EQ,sEmpno);
		// 	oModel.read("/EmpDetailsSet", {
		// 		filters: [oFilter],
		// 		success: function(oData) {
		// 			if (oData.results.length > 0) {
		// 				MessageBox.error("Employee ID already exists");
		// 			}
		// 			else {
		// 				var oPayload = {
		// 					Empno: sEmpno,
		// 					Ename: sEname,
		// 					Contanctno: sContact,
		// 					Designation: sDesignation,
		// 					Workingunder: sWorkingunder
		// 				};
		// 				oModel.create("/EmpDetailsSet", oPayload, {
		// 					success: function() {
		// 						MessageToast.show("Employee created successfully");
		// 					},
		// 					error: function() {
		// 						MessageBox.error("Create failed");
		// 					}
		// 				});
		// 			}
		// 		},
		// 		error: function() {
		// 			MessageBox.error("Error validating Employee ID");
		// 		}
		// 	});
		// },
		onCreateButton: function() {

			var oModel = this.getView().getModel();
			var sEmpno = this.byId("empid").getValue();
			var sEname = this.byId("emname").getValue();
			var sContact = this.byId("empcontactno").getValue();
			var sDesignation = this.byId("empdesignation").getValue();
			var sWorkingunder = this.byId("empworkingunder").getValue();
			if (!sEmpno || !sEname) {
				MessageBox.error("Please enter Employee Id and Employee Name");
				return;
			} else {
				var oPayload = {
					Empno: sEmpno,
					Ename: sEname,
					Contanctno: sContact,
					Designation: sDesignation,
					Workingunder: sWorkingunder
				};
				oModel.create("/EmpDetailsSet", oPayload, {
					success: function() {
						MessageToast.show("Employee created successfully");
					},
					error: function(oError) {
						MessageBox.error("Employee ID already exists or Create failed", +oError);
					}
				});
			}
		},
		onClearButton: function() {
			this.byId("empid").setValue("");
			this.byId("emname").setValue("");
			this.byId("empcontactno").setValue("");
			this.byId("empdesignation").setValue("");
			this.byId("empworkingunder").setValue("");
			
			var oCreateBtn = this.byId("createbtn");
			oCreateBtn.setVisible(true);
			var oUpdateBtn = this.byId("updatebtn");
			oUpdateBtn.setVisible(false);

		},
		onDeleteEmployee: function(oEvent) {

			var oItem = oEvent.getSource().getParent();
			var oContext = oItem.getBindingContext();
			var empId = oContext.getProperty("Empno");

			sap.m.MessageBox.confirm(
				"Are you sure you want to delete Employee ID: " + empId + "?", {
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {
						if (oAction === sap.m.MessageBox.Action.YES) {
							oContext.delete({
									groupId: "$direct"
								})
								.then(function() {
									MessageBox.success("Employee ID: " + empId + " deleted successfully");
								})
								.catch(function() {
									MessageBox.error("Error deleting Employee ID: " + empId);
								});
						}
					}
				}
			);
		},

		onSelectionChange: function(oEvent) {
			this.getView().byId("empid").setEditable(false);
			
			var oUpdateBtn = this.byId("updatebtn");
			var oCreateBtn = this.byId("createbtn");
			oCreateBtn.setVisible(false);
			oUpdateBtn.setVisible(true);

			var oItem = oEvent.getParameter("listItem");

			if (!oItem) {
				this.oSelectedContext = null;
				return;
			}
			this.oSelectedContext = oItem.getBindingContext();

			var oData = this.oSelectedContext.getObject();

			this.byId("empid").setValue(oData.Empno);
			this.byId("emname").setValue(oData.Ename);
			this.byId("empcontactno").setValue(oData.Contanctno);
			this.byId("empdesignation").setValue(oData.Designation);
			this.byId("empworkingunder").setValue(oData.Workingunder);
		},

		onUpdateButton: function() {
           
            
			var oModel = this.getView().getModel();
			var sEmpno = this.byId("empid").getValue();

			var sPath = "/EmpDetailsSet('" + sEmpno + "')";

			var oPayload = {
				Empno: sEmpno,
				Ename: this.byId("emname").getValue(),
				Contanctno: this.byId("empcontactno").getValue(),
				Designation: this.byId("empdesignation").getValue(),
				Workingunder: this.byId("empworkingunder").getValue()
			};

			oModel.update(sPath, oPayload, {
				success: function() {
					MessageBox.success("Record Updated Successfully");
					oModel.refresh(true);
				},
				error: function(oError) {
					MessageBox.error("Update Failed");
				}
			});
		}

	});
});