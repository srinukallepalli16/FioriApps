sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (Controller, MessageToast, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("hrdata.controller.View1", {
      onInit: function () {
        // Internal variables to hold baseline dates directly from backend
        this._sOriginalPassportExpiry = "";
        this._sOriginalResidentExpiry = "";
      },

      onSearchEmployee: function () {
        var sPernr = this.getView().byId("idPernrInput").getValue().trim();
        var oSelect = this.getView().byId("idDepSelect");
        var oForm = this.getView().byId("idSimpleForm");
        var self = this;

        if (!sPernr) {
          MessageToast.show("Please enter a valid Personnel Number.");
          return;
        }

        while (sPernr.length < 8) {
          sPernr = "0" + sPernr;
        }
        this.getView().byId("idPernrInput").setValue(sPernr);

        if (oForm) {
          oForm.setBindingContext(null);
          oForm.setVisible(false);
        }
        oSelect.setSelectedKey("");
        oSelect.setEnabled(false);

        oSelect.bindItems({
          path: "/DependentDropdownSet",
          filters: [new Filter("pernr", FilterOperator.EQ, sPernr)],
          template: new sap.ui.core.Item({
            key: "{Type}",
            text: "{Zdependent} - {Type}",
          }),
          events: {
            dataReceived: function (oEvent) {
              oSelect.setEnabled(true);

              var aItems = oSelect.getItems();
              if (aItems && aItems.length > 0) {
                oSelect.setSelectedItem(aItems[0]);

                var oBindingContext = aItems[0].getBindingContext();
                if (oBindingContext && oForm) {
                  oForm.setBindingContext(oBindingContext);
                  oForm.setVisible(true);

                  // Store baseline dates for the auto-selected first item
                  self._keepOriginalBackendDates(oBindingContext);
                }
              } else {
                MessageToast.show("No dependents found for employee " + sPernr);
              }
            },
          },
        });

        MessageToast.show(
          "Loading family tree records for Employee: " + sPernr,
        );
      },

      onDependentChange: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("selectedItem");
        var oForm = this.getView().byId("idSimpleForm");

        if (!oForm) {
          return;
        }

        if (!oSelectedItem) {
          oForm.setVisible(false);
          return;
        }
        var oBindingContext = oSelectedItem.getBindingContext();
        if (oBindingContext) {
          oForm.setBindingContext(oBindingContext);
          oForm.setVisible(true);
          // Store baseline dates when user manually switches dropdown selection
          this._keepOriginalBackendDates(oBindingContext);
        } else {
          oForm.setVisible(false);
        }
      },

      /**
       * Safely saves the backend values before any frontend user modifications occur
       */
      _keepOriginalBackendDates: function (oBindingContext) {
        this._sOriginalPassportExpiry =
          oBindingContext.getProperty("PassportExpiry") || "";
        this._sOriginalResidentExpiry =
          oBindingContext.getProperty("ResidentPermitExpiry") || "";

        // Clear any old error states from previous profile searches
        this.getView().byId("idPassportExpiryInput").setValueState("None");
        this.getView().byId("idResidentExpiryInput").setValueState("None");
      },

      /**
       * Converts DD.MM.YYYY string into a format JavaScript Date can compare accurately
       */
      _convertStringToDate: function (sDateString) {
        if (
          !sDateString ||
          sDateString === "00/00/0000" ||
          sDateString.includes("0000")
        ) {
          return null;
        }
        // Supports parsing both DD.MM.YYYY and DD/MM/YYYY separation formats safely
        var aParts = sDateString.split(/[./]/);
        if (aParts.length === 3) {
          return new Date(aParts[2], aParts[1] - 1, aParts[0]); // year, month (0-11), day
        }
        return null;
      },

      /**
       * Real-time Validation handler for Passport Expiry
       */
      onPassportExpiryChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sNewValue = oInput.getValue().trim();

        var oNewDate = this._convertStringToDate(sNewValue);
        var oOriginalDate = this._convertStringToDate(
          this._sOriginalPassportExpiry,
        );

        if (oNewDate && oOriginalDate && oNewDate < oOriginalDate) {
          oInput.setValueState("Error");
          oInput.setValueStateText(
            "New Passport Expiry Date cannot be earlier than the existing date (" +
              this._sOriginalPassportExpiry +
              ").",
          );
        } else {
          oInput.setValueState("None");
        }
      },

      /**
       * Real-time Validation handler for Resident Permit Expiry
       */
      onResidentExpiryChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sNewValue = oInput.getValue().trim();

        var oNewDate = this._convertStringToDate(sNewValue);
        var oOriginalDate = this._convertStringToDate(
          this._sOriginalResidentExpiry,
        );

        if (oNewDate && oOriginalDate && oNewDate < oOriginalDate) {
          oInput.setValueState("Error");
          oInput.setValueStateText(
            "New Resident Permit Expiry Date cannot be earlier than the existing date (" +
              this._sOriginalResidentExpiry +
              ").",
          );
        } else {
          oInput.setValueState("None");
        }
      },
      onSaveDependentDetails: function () {
        var oForm = this.getView().byId("idSimpleForm");
        var oContext = oForm.getBindingContext();

        if (!oContext) {
          return;
        }

        // Stop processing if any expiry inputs contain a validation error
        var sPassportState = this.getView()
          .byId("idPassportExpiryInput")
          .getValueState();
        var sResidentState = this.getView()
          .byId("idResidentExpiryInput")
          .getValueState();

        if (sPassportState === "Error" || sResidentState === "Error") {
          sap.m.MessageBox.error(
            "Please correct the date validation errors before submitting updates.",
          );
          return;
        }

        var oModel = this.getView().getModel();

        // FIXED: Maps "pernr" key parameter directly from the runtime runtime model property
        var oUpdatePayload = {
          pernr: oContext.getProperty("pernr"),
          Type: oContext.getProperty("Type"),
          Zdependent: oContext.getProperty("Zdependent"),
          DependentName: oContext.getProperty("DependentName"),
          PassportId: this.getView().byId("idPassportIdInput").getValue(),
          PassportExpiry: this.getView()
            .byId("idPassportExpiryInput")
            .getValue(),
          ResidentPermit: this.getView()
            .byId("idResidentPermitInput")
            .getValue(),
          ResidentPermitExpiry: this.getView()
            .byId("idResidentExpiryInput")
            .getValue(),
        };

        var sPath = oContext.getPath();

        sap.ui.core.BusyIndicator.show(0);

        oModel.update(sPath, oUpdatePayload, {
          success: function () {
            sap.ui.core.BusyIndicator.hide();
            sap.m.MessageToast.show(
              "Dependent records saved successfully via BAPI framework!",
            );
          },
          error: function (oError) {
            sap.ui.core.BusyIndicator.hide();
            sap.m.MessageBox.error(
              "Backend Verification Failed: Review your Master Data configuration requirements.",
            );
          },
        });
      },
    });
  },
);
