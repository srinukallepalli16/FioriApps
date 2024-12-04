sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
], (Controller) => {
    "use strict";

    return Controller.extend("com.app.zexcelltabledata.controller.App", {
        onInit() {
           
        },
        // onFileChange: function (oEvent) {
        //     var that = this;
        //     var files = oEvent.getParameter("files");
        //     if (files.length>0) {
        //         var reader = new FileReader();
        //         reader.onload = function (e) {
        //             var data = e.target.result;
        //             var workbook = XLSX.read(data, {
        //                 type: "binary"
        //             });
        //             var tableData = [];
        //             workbook.SheetNames.forEach(sheetName => {
        //                 var xl_row_data = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        //                 tableData = [...tableData, ...xl_row_data];
        //             });
        //             var jModel = new sap.ui.model.json.JSONModel({ result: tableData });
        //             that.getView().setModel(jModel, "tableXLData");
        //         }
        //         reader.onerror = function (ex) {
        //             console.log(ex);
        //         }
        //         reader.readAsBinaryString(files[0]);
        //     }
         
        // },
        onFileChange: function (oEvent) {
            var that = this;
            var files = oEvent.getParameter("files");
            if (files.length > 0) {
                var reader = new FileReader();
                reader.onload = function (data1) {
                    var data = data1.target.result;
                    var workbook = XLSX.read(data, {
                        type: "binary"
                    });
                    var sheetName = workbook.SheetNames[0]; 
                    var sheet = workbook.Sheets[sheetName];
                    var headers = [];
                    var range = XLSX.utils.decode_range(sheet['!ref']); 
                    for (var currentColumn = range.startColumn; currentColumn <= range.endColumn; currentColumn++) {
                        var cell = sheet[XLSX.utils.encode_cell({ r: 0, c: currentColumn })];
                        if (cell) {
                            headers.push(cell.v);
                        }
                    }
                    var tableData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); 
                    var jModel = new sap.ui.model.json.JSONModel({
                        headers: headers,
                        result: tableData
                    });
                    that.getView().setModel(jModel, "tableXLData");
                    var oTable = that.byId("table");
                    var columns = [];
                    headers.forEach(function (header, index) {
                        var oColumn = new sap.m.Column({
                            header: new sap.m.Text({ text: header })
                        });
                        columns.push(oColumn);
                    });
                    // oTable.destroyColumns();
                    oTable.addColumns(columns);
                };
                reader.onerror = function (ex) {
                    console.log(ex);
                };
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