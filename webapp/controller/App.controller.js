sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
], (Controller) => {
    "use strict";

    return Controller.extend("com.app.zexcelltabledata.controller.App", {
        onInit() {
           
        },
        onFileChange: function (oEvent) {
            var that = this;
            var files = oEvent.getParameter("files");
            if (files.length>0) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: "binary"
                    });
                    var tableData = [];
                    workbook.SheetNames.forEach(sheetName => {
                        var xl_row_data = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        tableData = [...tableData, ...xl_row_data];
                    });
                    var jModel = new sap.ui.model.json.JSONModel({ result: tableData });
                    that.getView().setModel(jModel, "tableXLData");
                }
                reader.onerror = function (ex) {
                    console.log(ex);
                }
                reader.readAsBinaryString(files[0]);
            }
         
        },
        fileuplaod: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("tabledata");
        },
        homepage: function () {
            var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter1.navTo("AppView");
        },
   
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