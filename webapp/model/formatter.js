sap.ui.define([
  "sap/m/library",
  "sap/ui/model/type/Currency",
  "sap/base/Log"
], function(mobileLibrary, Log) {
  "use strict";

  return {
    formatMail: function(sEid, sDomain, sSubject, sBody) {
      try {
        if (!sEid) return "";
        return mobileLibrary.URLHelper.normalizeEmail(
          sEid + sDomain,
          sSubject,
          sBody
        );
      } catch (oError) {
        Log.error("Error in formatMail: " + oError.message);
        return "";
      }
    },

    formatStockInfo: function(sStockLabel, iUnitsInStock, sCurrencyCode) {
      try {
        if (iUnitsInStock === undefined) return "";
        return sStockLabel + ": " + iUnitsInStock + " " + sCurrencyCode;
      } catch (oError) {
        Log.error("Error in formatStockInfo: " + oError.message);
        return "";
      }
    },

    formatStockState: function(iStock) {
      if (iStock === undefined) return "None";
      if (iStock <= 5) return "Error";
      if (iStock <= 15) return "Warning";
      return "Success";
  }
  };
});