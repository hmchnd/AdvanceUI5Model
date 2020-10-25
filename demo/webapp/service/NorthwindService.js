/*---------------------------------------------------------------*
 * Accenture Demo app
 *----------------------------------------------------------------*/
sap.ui.define([
	"./CoreService"
], function (CoreService) {
	"use strict";

	var NorthwindService = CoreService.extend("accenture.demo.service.NorthwindService", {

		/** 
		 * Constructor for Schedule Odata Service.
		 * @param model ... JSON model ...
		 */
		constructor: function (model) {
			CoreService.call(this, model);
		},
		loadCustomers: function () {
			return this.odata("/Customers").get();
		},
		loadCustomerOrders: function (sCustomerId, bMultilevelExpand) {
			var sObjectPath = this.model.createKey("/Customers", {
				CustomerID: sCustomerId
			});
			var mParameters;

			if (!bMultilevelExpand) {
				mParameters = {
					urlParameters: {
						$expand: "Orders"
					}
				};
			} else {
				mParameters = {
					urlParameters: {
						$expand: "Orders/Shipper," +
							"Orders/Order_Details," +
							"Orders/Employee"
					}
				};
			}

			return this.odata(sObjectPath).get(mParameters);
		}
	});
	return NorthwindService;
});