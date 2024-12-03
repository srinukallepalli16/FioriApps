sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
], (Controller) => {
    "use strict";

    return Controller.extend("com.app.zexcelltabledata.controller.App", {
        onInit() {
           
        },
        fileuplaod:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("tabledata");
        },
        homepage:function(){
            var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter1.navTo("AppView");
        },
        handleUpload:function(oEvent){
           var files = oEvent.getParameter("files");
           if(files.length>0){
            
           }
        }
    });
});



     //  var oData ={
        //     details :{
        //         Name :"Srinu"
        //     }
        //  }
        //  var oModel = new sap.ui.model.json.JSONModel();
        //  oModel.setData(oData);
        //  this.getView().setModel(oModel);