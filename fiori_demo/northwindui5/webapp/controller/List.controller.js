sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/base/Log"  
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter, FilterOperator, Log) {
        "use strict";

        return Controller.extend("fiori.northwindui5.controller.List", {
            onInit: function () {
                console.log("List init...");
            },     
            handleSearch: function (evt) {
                // create model filter
                var filters = [];
                var query = evt.getParameter("query");
                if (query && query.length > 0) {
                    filters.push( new Filter({
                        path: "ProductName",
                        operator: FilterOperator.Contains,
                        value1: query
                    }));
                  
                }
    
                // update list binding
                var list = this.getView().byId("list");
                var binding = list.getBinding("items");
                binding.filter(filters);
            },

            handleListItemPress: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                oRouter.navTo("detail", {
                    productId: selectedProductId 
                });
            },

            onBeforerendering: function(){
                window.message = "A random log message";
                Log.info(window.message);
            },

            onAfterRendering: function(){
                debugger;
            }
        });
    });
