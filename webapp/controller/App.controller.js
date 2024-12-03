sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.mybankdetails.controller.App", {
        onInit() {
        },
        onOpenBankDetails:function(){
            //create dailog lazily
            //First we need to check whether the dailog is already there or not still is not created
            // if it is not there create one freagment meaning
            if(!this.morebankDetails){ 
                this.morebankDetails = this.loadFragment(
                 {
                    //name means path of the fragment
                    name :"com.sap.mybankdetails.view.fragments.MoreDetails" 
                 }                           
                );      
                //once check whether morebankdetails fragment is there or not it is not there
                //first it will create it then ot will exucuted in all the possibilites  
                
                this.morebankDetails.then(
                    function(oDailog){
                       oDailog.open();
                })
                                                                
            }
        },
        onCloseBankDetails:function(){
            this.byId("morebankdetails123").close();
            // this.morebankDetails().close();
        }
    });
});