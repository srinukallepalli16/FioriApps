sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Token",
], (Controller,Token) => {
    "use strict";

    return Controller.extend("tokenizer.controller.View1", {
        onInit() {
            var oToken1 = this.byId("multiInput");

            oToken1.getTokens(
                new sap.m.Token({
                    key:"1000",
                    text:"Token 1000"
                })
            )
            oToken1.getTokens(
                new sap.m.Token({
                    key:"1001",
                    text:"Token 1001"
                })
            )

        //    var oToken = new Token(
        //     {
        //         key:"1001",
        //         text:"TOken 1"
        //    }
        // );
        //    this.getView().byId("multiInput").addToken(oToken);
        },
        onValueHelpRequest:function(){
             if(!this.oDailog){
                this.oDailog = sap.ui.xmlfragment("tokenizer.view.Employee", this);
                this.getView().addDependent(this.oDailog);
                this.oDailog.open();
             }
             this.oDailog.open();
        },
        onCancel:function(){
              this.oDailog.close();
        }
    });
});