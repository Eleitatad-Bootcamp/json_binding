sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sapips/training/jsonbinding/model/formatter" // adjust path as needed
], function(Controller, JSONModel, formatter) {
  "use strict";

    return Controller.extend("sapips.training.jsonbinding.controller.JSONBinding", {
    formatter: formatter,

    onInit: function () {
      var that = this;
    
      // Main View Model
      var oMainModel = new JSONModel({
        Eid: "elei.mathew.tatad",
        Enabled: true,
        SalesAmount: 1500,
        CurrencyCode: "PHP",
        Address: {
          Street: "Ocean Drive",
          Zip: "10000",
          City: "Siargao",
          Country: "PH",
          SelectedProduct: {}
        },
      });
      this.getView().setModel(oMainModel);
    
      // Load Products Model
      var oProductsModel = new JSONModel();
      oProductsModel.loadData("model/products.json").then(function() {
        that.getView().setModel(oProductsModel, "ProductsModel");
      }).catch(function(oError) {
        sap.m.MessageBox.error("Failed to load products: " + oError.message);
      });
    },
    onSendEmail: function () {
      var oBundle = this.getView().getModel("i18n").getResourceBundle();
      var oModel = this.getView().getModel();
      var sEid = oModel.getProperty("/Eid");
      var sDomain = oBundle.getText("domain");
    
      if (!sEid) {
        sap.m.MessageToast.show("EID is empty.");
        return;
      }
    var sSubject = oBundle.getText("mailSubject") + sEid; 
    var sBody = oBundle.getText("mailBody"); 
    
      var sMailTo = "mailto:" + encodeURIComponent(sEid + sDomain)
        + "?subject=" + encodeURIComponent(sSubject)
        + "&body=" + encodeURIComponent(sBody);
    
      sap.m.URLHelper.redirect(sMailTo, true);
    },
    onProductSelect: function(oEvent) {
      var oSelectedItem = oEvent.getParameter("listItem");
      var oContext = oSelectedItem.getBindingContext("ProductsModel");
      var oProductData = oContext.getObject();
      
      // Clone the object to avoid direct reference
      var oProductClone = JSON.parse(JSON.stringify(oProductData));
      
      // Get the main model and update SelectedProduct
      var oMainModel = this.getView().getModel();
      oMainModel.setProperty("/SelectedProduct", oProductClone);
      
      // Ensure the Product Details panel is expanded
      this.byId("productDetailsPanel").setExpanded(true);
  },
  });
});