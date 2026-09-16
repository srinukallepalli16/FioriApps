sap.ui.define([
    "sap/ui/core/mvc/Controller",
],function(Controller){
    return Controller.extend("com.zsalesmaterial.controller.Selection",{
        onExecute:function(){
            var iSelected = this.byId("rbgSelection").getSelectedIndex();
            var oRouter = this.getOwnerComponent().getRouter();
            if(iSelected === 0){
                oRouter.navTo("RouteSales");
            }
            else{
                oRouter.navTo("RouteMaterial");
            }
        }
    })
})