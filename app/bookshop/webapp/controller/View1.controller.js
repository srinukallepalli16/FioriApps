sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, MessageBox, Fragment, MessageToast, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("bookshop.controller.View1", {
        onInit() {
        },
        submit: function () {
            var oModel = this.getView().getModel();
            var id = this.getView().byId("id").getValue();
            var title = this.getView().byId("title").getValue();
            var author = this.getView().byId("author").getValue();
            var price = this.getView().byId("price").getValue();
            var stock = this.getView().byId("stock").getValue();
            var location = this.getView().byId("location").getValue();

            if (id != "" && title != "" && author != "" && price != "" && stock != "") {
                var oContext = oModel.bindList("/Book").create({
                    "Id": id,
                    "title": title,
                    "author": author,
                    "price": price,
                    "stock": stock,
                    "location": location
                })
            } else {
                MessageBox.warning("Please fill the all Book Details");
            }
            oContext.created().then(() => {
                MessageBox.success("Record Created Successfully");
                this.getView().byId("id").setValue(null);
                this.getView().byId("title").setValue(null);
                this.getView().byId("author").setValue(null);
                this.getView().byId("price").setValue(null);
                this.getView().byId("stock").setValue(null);
                this.getView().byId("location").setValue(null);
            }).catch((err) => {
                MessageBox.error(`Error creating the record:${err}`);
            })
        },
        onCollapseExpandPress: function () {
            var oSideNavigation = this.getView().byId("sideNavigation");
            var bExpanded = oSideNavigation.getExpanded();
            oSideNavigation.setExpanded(!bExpanded);
        },
        onAddNewBook: function () {
            this.hideAllPanels();
            var oPanel1 = this.getView().byId("panel1");
            oPanel1.setVisible(true);
        },
        onViewBooksDetails: function () {
            this.hideAllPanels();
            var oPanel2 = this.getView().byId("panel2");
            oPanel2.setVisible(true);
        },
        onEditBookPressed: function () {
            this.hideAllPanels();
            var oPanel3 = this.getView().byId("panel3");
            oPanel3.setVisible(true);
        },
        hideAllPanels: function () {
            var oPanel1 = this.getView().byId("panel1");
            var oPanel2 = this.getView().byId("panel2");
            var oPanel3 = this.getView().byId("panel3");
            oPanel1.setVisible(false);
            oPanel2.setVisible(false);
            oPanel3.setVisible(false);
        },
        onActionPress: function (oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext();
            this.oSelectedContext = oContext;
            if (!this.oActionSheet) {
                Fragment.load({
                    name: "bookshop.view.ActionSheet",
                    controller: this
                }).then((oAction) => {
                    this.oActionSheet = oAction;
                    this.getView().addDependent(this.oActionSheet);
                    this.oActionSheet.openBy(oButton);
                })
            }
            else {
                this.oActionSheet.openBy(oButton);
            }
        },
        onDeleteBook: function () {
            var oContext = this.oSelectedContext;
            var sBookId = oContext.getProperty("Id");
            MessageBox.confirm(`Are you sure you want to delete this Book with ID: ${sBookId}`, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (oAction1) {
                    if (oAction1 === MessageBox.Action.YES) {
                        oContext.delete("$direct").then(() => {
                            MessageBox.success(`Book Id:${sBookId} deleted Successfully`)
                        }).catch((err) => {
                            MessageBox.error(`Error deleting Book Id:${sBookId} Please try later`);
                        })
                    }
                }
            })
        },
        onUpdateBook: function () {
            var oupdate_model = this.getOwnerComponent().getModel();
            var oData = this.oSelectedContext.getObject();
            MessageToast.show(`Update Action for ID:${oData.Id}`);
            this.onEditBookPressed();
            var oFilter = [
                new Filter("Id", FilterOperator.EQ, oData.Id)
            ];
            let oBindings = oupdate_model.bindList("/Book");
            oBindings.filter(oFilter);

            oBindings.requestContexts().then((aContexts) => {
                if (aContexts.length > 0) {
                    aContexts.forEach((oContext) => {
                        var oUser = oContext.getObject();
                        let id = this.getView().byId("id1").setValue(oUser.Id);
                        id.setEnabled(false);
                        let title = this.getView().byId("title1").setValue(oUser.title);
                        let author = this.getView().byId("author1").setValue(oUser.author);
                        let price = this.getView().byId("price1").setValue(oUser.price);
                        let stock = this.getView().byId("stock1").setValue(oUser.stock);
                        let location = this.getView().byId("location1").setValue(oUser.location);
                    })
                }
                else {
                    MessageBox.warning(`No Book Found`);
                }
            }).catch((err) => {
                MessageBox.error(`Error fetching the Book ${oData.Id}`, err);
            })
        },
        onUpdateBook:function(){
            var id = this.getView().byId("id1").getValue();
            var title = this.getView().byId("title1").getValue();
            var author = this.getView().byId("author1").getValue();
            var price = this.getView().byId("price1").getValue();
            var stock = this.getView().byId("stock1").getValue();
            var locations = this.getView().byId("location1").getValue();

            var updateModel = this.getView().getModel();
            var sPath = "/Book('"+ id +"')";
            var oContext = updateModel.bindList(sPath).getBoundContext();
            oContext.setProperty("title",title);
            oContext.setProperty("author",author);
            oContext.setProperty("price",price);
            oContext.setProperty("stock",stock);
            oContext.setProperty("location",location);

            updateModel.submitBatch("auto").then(()=>{
                MessageBox.success("Record Updated Successfully");
            }).catch((err)=>{
                MessageBox.error("Error Updating Book",err);
            })
        }
    });
});