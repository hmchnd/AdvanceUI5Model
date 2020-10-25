/*---------------------------------------------------------------*
 * Customer Class
 *----------------------------------------------------------------*/
sap.ui.define([
	"./BaseObject",
	"../model/Customer"
], function (BaseObject, Customer) {
	"use strict";
	return BaseObject.extend("ccenture.demo.model.ManageCustomer", {

		/** 
		 * Constructor.
		 * @param data changelog relevant data in JSON format.
		 */
		constructor: function (data, oTextResources) {
			BaseObject.call(this, {});
			this.Customer = [];
			this.SelectedCustomer = [];

		},
		LoadCustomerData: function (aData) {
			var that = this;
			this.Customer = [];
			aData.forEach(function (customerObject) {
				that.Customer.push(new Customer(customerObject));
			});

		},
		getCustomerBasedOnID: function (sCustomerId) {
			return this.Customer.find(function (oCustomer) {
				if (sCustomerId === oCustomer.CustomerID) {
					return oCustomer;
				} else {
					return {};
				}
			});

		},
		loadCustomerOrderDetails: function (sCustomerId,sOrderId, aCustOrderData,bMultilevelExpand) {
			this.SelectedCustomer = [];
			var oCustomer = this.getCustomerBasedOnID(sCustomerId);
			oCustomer.populateOrder(aCustOrderData,bMultilevelExpand);
			if(bMultilevelExpand){
			oCustomer.loadSingleOrderBasedOnOrderId(sOrderId);	
			}
			this.SelectedCustomer.push(oCustomer);
		}

	});

});