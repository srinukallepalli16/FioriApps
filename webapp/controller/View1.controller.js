sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("zbankdetailsapp.controller.View1", {
        onInit:function() {
            debugger
            this._setGlobalModel();
        },
        buttonpress:function(){
           var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           oRouter.navTo("login");
        },
        _setGlobalModel:function(){
            var oModel = this.getOwnerComponent().getModel("ProductJson");
            this.getView().setModel(oModel);
        },
        itemPresslist:function(oEvent){
          var oContext= oEvent.getParameter("listItem").getBindingContext();
          var obj = oContext.getObject();
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("login",{
            CustomerID:obj.CustomerID,
            CustomerName:obj.CustomerNames
          })
        }
    });
});