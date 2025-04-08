sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("zbankdetailsapp.controller.Login", {
        onInit() {
            debugger
           var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           oRouter.getRoute("login").attachPatternMatched(this._onPatternMatched,this);

           var oUsermodel = new sap.ui.model.json.JSONModel();
           this.getView().setModel(oUsermodel,"oUserModel");

        },
        _onPatternMatched:function(oEvent){
             var sCustomerID = oEvent.getParameter("arguments").CustomerID;
             var oUserModel = this.getView().getModel("oUserModel");
             oUserModel.setProperty("/CustomerID",sCustomerID);
    
        },
        loginbutton:function(){
           var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           oRouter.navTo("RouteView1");
        },
        onNavPress:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView1");
        }
    });
});