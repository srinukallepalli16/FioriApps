sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("com.app.bookshop.controller.View1", {
        onInit() {
        },
        submit:function(){
            // alert("Hi Srinivas");
            var id= this.getView().byId("Id").getValue();
            var title= this.getView().byId("title").getValue();
            var author= this.getView().byId("author").getValue();
            var price= this.getView().byId("price").getValue();
            var stock= this.getView().byId("stock").getValue();
            var location= this.getView().byId("location").getValue();
            var genere= this.getView().byId("genere").getValue();

            var oModel = this.getView().getModel();
            
            // alert(`Author:${id},Title:${title},Author:${author},Price:${price},Stock:${stock},Location:${location},Genere${genere}`);
            var oContext = oModel.bindList("/Book").create({
                "Id":id,
                "title":title,
                "author":author,
                "price":price,
                "stock":stock,
                "location":location,
                "genere":genere
            });
            oContext.created().then(()=>{
                MessageBox.success("Data Created Successfully");
                this.getView().byId("Id").setValue(null);
                this.getView().byId("title").setValue(null);
                this.getView().byId("author").setValue(null);
                this.getView().byId("price").setValue(null);
                this.getView().byId("stock").setValue(null);
                this.getView().byId("location").setValue(null);
                this.getView().byId("genere").setValue(null);
            }).catch((err)=>{
                MessageBox.error("Data is not Created");
                console.log(err);
            });
        }
    });
});