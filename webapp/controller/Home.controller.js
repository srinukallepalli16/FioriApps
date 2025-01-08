sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("app01.controller.Home", {
        onInit() {
          
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Routedashboard").attachPatternMatched(this._onObjectMatched,this);
            
            //initialize model for to store the data received from the view over the manifest.json
            var oUserModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oUserModel,"oUserModel");

        },
        _onObjectMatched:function(oEvent){
            var user_name = oEvent.getParameter("arguments").name;
            var pass_word = oEvent.getParameter("arguments").pass;
            var oUserModel = this.getView().getModel("oUserModel");
            oUserModel.setProperty("/password",pass_word);
            oUserModel.setProperty("/username",user_name);
        },
        loginpress:function(){
            let username = this.getView().byId("input1").getValue();
            let password = this.getView().byId("input2").getValue();
            // alert("Username:"+username+ "\nPassword:"+password);
            if(username=='' || password==''){
                MessageBox.error("Please Enter Username/Password");
            }
            else{
                var oModel = this.getView().getModel();
                oModel.read("/Employees",{
                    filters:[
                        new sap.ui.model.Filter("FirstName",sap.ui.model.FilterOperator.EQ,username),
                        new sap.ui.model.Filter("Extension",sap.ui.model.FilterOperator.EQ,password)
                    ],
                    success:function(oData){
                        if(oData.results.length>0){
                            MessageBox.success("Suceessfully logined");
                            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                            oRouter.navTo("Routedashboard",{
                                name:username,
                                pass:password
                            })
                        }else{s
                            MessageBox.error("Incorrect Credentials");
                        }
                    }.bind(this),
                    error:function(oError){
                        MessageBox.error("Failed to Load data From Northwind Service");
                    }
                })

            }
        
        }
    });
});