// const { auth } = require("@sap/cds");

sap.ui.define(
  ["sap/ui/core/mvc/Controller", 
  "sap/m/MessageBox", 
  "sap/ui/core/Fragment",
  "sap/m/MessageToast",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
],(Controller, MessageBox, Fragment,MessageToast,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("customviewbookshop.controller.View1", {
      onInit() {},
      submit: function () {
        var id = this.getView().byId("id").getValue();
        var title = this.getView().byId("title").getValue();
        var author = this.getView().byId("author").getValue();
        var price = this.getView().byId("price").getValue();
        var stock = this.getView().byId("stock").getValue();
        var location = this.getView().byId("location").getValue();

        var oModel = this.getView().getModel();

        var oContext = oModel.bindList("/Book").create({
          Id: id,
          title: title,
          author: author,
          price: price,
          stock: stock,
          location: location,
        });
        oContext
          .created()
          .then(() => {
            MessageBox.success("Product Added Successfully");
            this.getView().byId("id").setValue(null);
            this.getView().byId("title").setValue(null);
            this.getView().byId("author").setValue(null);
            this.getView().byId("price").setValue(null);
            this.getView().byId("stock").setValue(null);
            this.getView().byId("location").setValue(null);
          })
          .catch((err) => {
            MessageBox.error("Error Adding Item", +err);
          });
      },
      onCollapseExpandPress: function () {
        let oSideNavigation = this.getView().byId("sideNavigation");
        let bExpanded = oSideNavigation.getExpanded();
        oSideNavigation.setExpanded(!bExpanded);
      },
      onAddBookPressed: function () {
        this.hideAllPanels();
        let oPanel1 = this.getView().byId("panel1");
        oPanel1.setVisible(true);
      },
      onViewBookDetails: function () {
        this.hideAllPanels();
        let oPanel2 = this.getView().byId("panel2");
        oPanel2.setVisible(true);
      },
      onEditBookPressed:function(){
        this.hideAllPanels();
        let oPanel3 = this.getView().byId("panel3");
        oPanel3.setVisible(true);

      },
      hideAllPanels: function () {
        this.getView().byId("panel1").setVisible(false);
        this.getView().byId("panel2").setVisible(false);
        this.getView().byId("panel3").setVisible(false);
      },
      onActionPressed: function (oEvent) {
        var oButton = oEvent.getSource();
        var oContext = oButton.getBindingContext();
        this._oSelectedContext = oContext;
        if (!this._oActionSheet) {
          Fragment.load({
            // id:this.getView().byId(),
            name: "customviewbookshop.view.ActionSheet",
            controller: this,
          }).then(
            function (oActionSheet) {
              this._oActionSheet = oActionSheet;
              this.getView().addDependent(this._oActionSheet);
              this._oActionSheet.openBy(oButton);
            }.bind(this),
          );
        } else {
          //this._oActionSheet.openBy(oButton);
          this._oActionSheet.openBy(oButton);
        }
        /*
            if(!this._oActionSheet){
                Fragment.load({
                    name:"customviewbookshop.view.ActionSheet",
                    Controller:this
                }).then((oActionSheet)=>{
                    this._oActionSheet = oActionSheet;
                    this.getView().addDependent(this._oActionSheet);
                    this._oActionSheet.openBy(oButton);
                })
            }
            else{
                this._oActionSheet.openBy(oButton);
            }
                */
      },
      onDeletePress: function () {
        var oContext = this._oSelectedContext;
        var sBookId = oContext.getProperty("Id");
        MessageBox.confirm(
          "Are you  sure you want to delete this book with ID:" + sBookId + "?",
          {
            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            onClose: function (oAction) {
              if (oAction === MessageBox.Action.YES) {
                oContext
                  .delete("$direct")
                  .then(function () {
                    MessageBox.success(
                      `Book ID: ${sBookId} deleted Successfully`,
                    );
                  })
                  .catch(function (err) {
                    MessageBox.error(
                      `Error deleting Book ID: ${sBookId}.${err} Please try later.`,
                    );
                  });
              }
            },
          },
        );
      },
      oneEditPressed:function(){
        var oData = this._oSelectedContext.getObject();
        MessageToast.show(`Edit Action for ID: ${oData.Id}`);
        this.onEditBookPressed();
        var product_model = this.getOwnerComponent().getModel();
        let oFilter = [
           new Filter("Id",FilterOperator.EQ, oData.Id)
        ];
        let oBindings = product_model.bindList("/Book");
        oBindings.filter(oFilter);

        oBindings.requestContexts().then((aContexts)=>{
           if(aContexts.length > 0 ){
              aContexts.forEach((aContexts)=>{
                let oUser = aContexts.getObject();
                let id = this.getView().byId("id1").setValue(oUser.Id);
                id.setEnabled(false);
                this.getView().byId("title1").setValue(oUser.title);
                this.getView().byId("author1").setValue(oUser.author);
                this.getView().byId("price1").setValue(oUser.price);
                this.getView().byId("stock1").setValue(oUser.stock);
                this.getView().byId("location1").setValue(oUser.location);
              })
           }else{
            MessageBox.error(`No Book Found specific this ID:${oData.Id}`);
           }

        }).catch((err)=>{
          MessageBox.error(`Error Retrieving the Book ${oData.Id}`,err);
        })
      },
      updateItem:function(){
         var id = this.getView().byId("id1").getValue();
         var title = this.getView().byId("title1").getValue();
         var author = this.getView().byId("author1").getValue();
         var price = this.getView().byId("price1").getValue();
         var stock = this.getView().byId("stock1").getValue();
         var location = this.getView().byId("location1").getValue();

         var update_model = this.getView().getModel();
         var sPath = "/Book('"+ id +"')";
         var oContext = update_model.bindContext(sPath).getBoundContext();
         var oView = this.getView();
         function resetBusy(){
             oView.setBusy(false);
         }
         oView.setBusy(true);

         oContext.setProperty("title",title);
         oContext.setProperty("author",author);
         oContext.setProperty("price",price);
         oContext.setProperty("stock",stock);
         oContext.setProperty("location",location);
         update_model.submitBatch("auto").then(()=>{
           resetBusy();
            MessageBox.success("Item details updated Successfully");
         }).catch((err)=>{
            MessageBox.error(`An error occurred while updating the item ${err}`);
         })
      }

    });
  },
);
   
//var genre = this.getView().byId("genre").getValue();

//    alert(`Title ${title},Author ${author},Price ${price}, Stock ${stock}, Location ${location}, Genre ${genre}`)

//  if(oContext){
//     MessageBox.success("Book Deleted Successfully");
// }
// else{
//     MessageBox.error("No Book Selected for deletion");
// }

//         var oContext = this._oSelectedContext;

// if (!oContext) {
//     sap.m.MessageBox.error("No book selected for deletion.");
//     return;
// }

// var sBookId = oContext.getProperty("Id");
// var that = this;

// sap.m.MessageBox.confirm(
//     "Are you sure you want to delete this book with ID: " + sBookId + "?",
//     {
//         actions: [sap.m.MessageBox.Action.Yes, sap.m.MessageBox.Action.No],
//         onClose: function (oAction) {
//             if (oAction === sap.m.MessageBox.Action.Yes) {

//                 oContext.delete("$direct")
//                     .then(function () {
//                         sap.m.MessageBox.success("Book ID: " + sBookId + " deleted successfully.");
//                     })
//                     .catch(function (err) {
//                         sap.m.MessageBox.error(
//                             "Error deleting Book ID: " + sBookId +
//                             ". " + (err.message || "Please try again later.")
//                         );
//                     });
//             }
//         }
//     }
// );

/*
         What was corrected:

Changed close → onClose (correct event parameter name).

Added null check for _oSelectedContext.

Used (err.message || ...) for better error display.

Cleaned formatting and spacing.

Ensured proper sap.m.MessageBox reference (safer).

If you're using OData V4, this is now fully correct.

If you'd like, I can also show a version using async/await (cleaner and modern).
    */
