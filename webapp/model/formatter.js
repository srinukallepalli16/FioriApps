sap.ui.define([], () => {
	"use strict";

	return {
      // Cutsome Logic
      getPercentage :function(oValue){
        debugger
        let empSalary = this.getOwnerComponent().getModel("oBankDetails").getProperty("/empsalary");
        let percentagevalue = (oValue/empSalary) * 100;
        return percentagevalue;
      }
   
	};
});