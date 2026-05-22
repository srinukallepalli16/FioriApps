// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/m/MessageBox"
// ], (Controller, MessageBox) => {
//     "use strict";

//     return Controller.extend("travelreq.controller.View1", {
//         onInit() {
//         },
//         onAddPress: function () {
//             // var oRouter = this.getOwnerComponent().getRouter();
//             // oRouter.navTo("View4");
//             MessageBox.confirm("Do you want to navigate to view 4 ?", {
//                 title: "Confirmation",
//                 actions: [MessageBox.Action.YES, MessageBox.Action.NO],
//                 emphasizedAction: MessageBox.Action.YES,
//                 onClose: function (oAction) {
//                     if (oAction === MessageBox.Action.YES) {
//                         var oRouter = this.getOwnerComponent().getRouter();
//                         oRouter.navTo("View4");
//                     }
//                 }.bind(this)
//             })
//         }
//     });
// });

sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/Dialog", "sap/m/Button", "sap/m/VBox", "sap/m/HBox", "sap/m/Panel", "sap/m/Text", "sap/m/Title", "sap/m/CheckBox", "sap/m/ScrollContainer", "sap/ui/core/Icon", "sap/m/MessageToast"], 
    function(Controller, Dialog, Button, VBox, HBox, Panel, Text, Title, CheckBox, ScrollContainer, Icon, MessageToast) {
    "use strict";
    return Controller.extend("travelreq.controller.View1", {
        onAddPress: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            // var oCheckBox = new CheckBox({
            //     text: "I have read and understood the policy"
            // });

            function createBullet(text, color) {
                return new HBox({
                    alignItems: "Start",
                    class: "sapUiTinyMarginBottom",
                    items: [
                        new Icon({
                            src: "sap-icon://accept",
                            color: color || "#107e3e",
                            size: "0.8rem"
                        }).addStyleClass("sapUiTinyMarginEnd"),
                        new Text({
                            text: text,
                            wrapping: true
                        })
                    ]
                });
            }
            var oDialog = new Dialog({
                title: "Travel Expense Policy",
                contentWidth: "850px",
                contentHeight: "650px",
                draggable: true,
                resizable: true,
                content: new ScrollContainer({
                    vertical: true,
                    height: "100%",
                    content: new VBox({
                        class: "sapUiLargeMargin",
                        items: [
                            new Panel({
                                backgroundDesign: "Transparent",
                                content: [
                                    new VBox({
                                        class: "sapUiMediumMargin",
                                        items: [
                                            new Title({
                                                text: "Key Points of the Policy",
                                                level: "H2"
                                            }).addStyleClass("customTitleSpacing"),
                                            new Text({
                                                text: "Employees must submit expense claims within 10 working days after returning from the business trip.",
                                                wrapping: true
                                            }).addStyleClass("customTextSpacing")
                                        ]
                                    })
                                ]
                            }),
                            new Panel({
                                headerText: "Required Documents",
                                class: "sapUiMediumMarginBottom",
                                content: [
                                    new VBox({
                                        class: "sapUiMediumMargin",
                                        items: [
                                            createBullet("Boarding passes for departure and arrival"),
                                            createBullet("Clear supporting documentation"),
                                            createBullet("Valid receipts"),
                                            createBullet("Proper business justification")
                                        ]
                                    })
                                ]
                            }),
                            new Panel({
                                headerText: "Non-Reimbursable Expenses",
                                class: "sapUiMediumMarginBottom",
                                content: [
                                    new VBox({
                                        class: "sapUiMediumMargin",
                                        items: [
                                            createBullet("Personal transportation expenses", "#bb0000"),
                                            createBullet("Unapproved gifts or souvenirs", "#bb0000"),
                                            createBullet("Travel class upgrades for personal reasons", "#bb0000"),
                                            createBullet("Parking fines and traffic violations", "#bb0000"),
                                            createBullet("Non-business meals", "#bb0000"),
                                            createBullet("Entertainment costs", "#bb0000"),
                                            createBullet("Hotel upgrades", "#bb0000"),
                                            createBullet("Tips", "#bb0000"),
                                            createBullet("Family/spousal travel expenses", "#bb0000"),
                                            createBullet("Late-submitted claims", "#bb0000"),
                                            createBullet("Alcohol or smoking-related expenses", "#bb0000")
                                        ]
                                    })
                                ]
                            }),
                            new Panel({
                                headerText: "Welfare & Gift Claims",
                                class: "sapUiMediumMarginBottom",
                                content: [
                                    new VBox({
                                        class: "sapUiMediumMargin",
                                        items: [
                                            new Text({
                                                text: "Gift-related or welfare claims must include an approved Gift and Hospitality Declaration Form.",
                                                wrapping: true
                                            })
                                        ]
                                    })
                                ]
                            }),
                            // oCheckBox
                        ]
                    })
                }),
                beginButton: new Button({
                    text: "Continue",
                    type: "Emphasized",
                    press: function() {
                        // if (!oCheckBox.getSelected()) {
                        //     MessageToast.show("Please accept the policy before continuing.");
                        //     return;
                        // }
                        oDialog.close();
                        oRouter.navTo("View4");
                    }
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: function() {
                        oDialog.close();
                    }
                }),
                afterClose: function() {
                    oDialog.destroy();
                }
            });
            oDialog.open();
        }
    });
});
// 1.38 version ========================================================================================================================================


// sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/Dialog", "sap/m/Button", "sap/m/VBox", "sap/m/HBox", "sap/m/Panel", "sap/m/Text", "sap/m/Title", "sap/m/CheckBox", "sap/m/ScrollContainer", "sap/ui/core/Icon", "sap/m/MessageToast"], function(Controller, Dialog, Button, VBox, HBox, Panel, Text, Title, CheckBox, ScrollContainer, Icon, MessageToast) {
//     "use strict";
//     return Controller.extend("travelreq.controller.View1", {
//         onAddPress: function() {
//             var oRouter = this.getOwnerComponent().getRouter();
//             // var oCheckBox = new CheckBox({
//             //     text: "I have read and understood the policy"
//             // });

//             function createItem(sText, sColor) {
//                 return new HBox({
//                     items: [
//                         new Icon({
//                             src: "sap-icon://accept",
//                             color: sColor || "green",
//                             size: "0.8rem"
//                         }).addStyleClass("sapUiTinyMarginEnd"),
//                         new Text({
//                             text: sText,
//                             wrapping: true
//                         })
//                     ]
//                 }).addStyleClass("sapUiTinyMarginBottom");
//             }
//             var oDialog = new Dialog({
//                 title: "Travel Expense Policy",
//                 contentWidth: "800px",
//                 contentHeight: "600px",
//                 draggable: true,
//                 resizable: true,
//                 content: [
//                     new ScrollContainer({
//                         vertical: true,
//                         horizontal: false,
//                         height: "100%",
//                         content: [
//                             new VBox({
//                                 items: [
//                                     new Title({
//                                         text: "Key Points of the Policy"
//                                     }).addStyleClass("sapUiMediumMarginBottom sapUiMediumMarginTop"),
//                                     new Panel({
//                                         headerText: "Expense Claim Submission",
//                                         content: [
//                                             new VBox({
//                                                 items: [
//                                                     new Text({
//                                                         text: "Employees must submit expense claims within 10 working days of returning from the business trip.",
//                                                         wrapping: true
//                                                     }).addStyleClass("sapUiSmallMarginBottom"),
//                                                     new Text({
//                                                         text: "All claims must include:"
//                                                     }).addStyleClass("sapUiSmallMarginTop"),
//                                                     createItem("Boarding passes for departure and arrival"),
//                                                     createItem("Clear supporting documentation"),
//                                                     createItem("Valid receipts"),
//                                                     createItem("Appropriate justification for expenses")
//                                                 ]
//                                             }).addStyleClass("sapUiMediumMargin")
//                                         ]
//                                     }).addStyleClass("sapUiMediumMarginBottom"),
//                                     new Panel({
//                                         headerText: "Non-Reimbursable Expenses",
//                                         content: [
//                                             new VBox({
//                                                 items: [
//                                                     createItem("Personal transportation expenses", "red"),
//                                                     createItem("Unapproved gifts or souvenirs", "red"),
//                                                     createItem("Travel class upgrades for personal reasons", "red"),
//                                                     createItem("Parking fines and traffic violations", "red"),
//                                                     createItem("Non-business meals", "red"),
//                                                     createItem("Entertainment costs", "red"),
//                                                     createItem("Hotel upgrades", "red"),
//                                                     createItem("Tips", "red"),
//                                                     createItem("Family-related travel expenses", "red"),
//                                                     createItem("Late submitted claims", "red"),
//                                                     createItem("Alcohol and smoking-related expenses", "red")
//                                                 ]
//                                             }).addStyleClass("sapUiMediumMargin")
//                                         ]
//                                     }).addStyleClass("sapUiMediumMarginBottom"),
//                                     new Panel({
//                                         headerText: "Welfare and Gift-Related Claims",
//                                         content: [
//                                             new VBox({
//                                                 items: [
//                                                     new Text({
//                                                         text: "Claims related to welfare or gifts must include an approved Gift and Hospitality Declaration Form.",
//                                                         wrapping: true
//                                                     })
//                                                 ]
//                                             }).addStyleClass("sapUiMediumMargin")
//                                         ]
//                                     }).addStyleClass("sapUiMediumMarginBottom"),
//                                     // oCheckBox.addStyleClass("sapUiMediumMarginTop sapUiMediumMarginBottom")
//                                 ]
//                             }).addStyleClass("sapUiMediumMargin")
//                         ]
//                     })
//                 ],
//                 beginButton: new Button({
//                     text: "Continue",
//                     type: "Emphasized",
//                     press: function() {
//                         // if (!oCheckBox.getSelected()) {
//                         //     MessageToast.show("Please accept the policy before continuing");
//                         //     return;
//                         // }
//                         oDialog.close();
//                         oRouter.navTo("View4");
//                     }
//                 }),
//                 endButton: new Button({
//                     text: "Cancel",
//                     press: function() {
//                         oDialog.close();
//                     }
//                 }),
//                 afterClose: function() {
//                     oDialog.destroy();
//                 }
//             });
//             oDialog.open();
//         }
//     });
// });