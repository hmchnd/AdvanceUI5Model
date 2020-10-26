/*---------------------------------------------------------------*
 * Customer Class
 *----------------------------------------------------------------*/
sap.ui.define([
	"./BaseObject",
	"../model/Order"
], function (BaseObject, Order) {
	"use strict";
	return BaseObject.extend("ccenture.demo.model.Customer", {

		/** 
		 * Constructor.
		 * @param data changelog relevant data in JSON format.
		 */
		constructor: function (data, oTextResources) {
			BaseObject.call(this, {});

			if (data) {
				this.CustomerID = data.CustomerID;
				this.CompanyName = data.CompanyName;
				this.ContactName = data.ContactName;
				this.ContactTitle = data.ContactTitle;
				this.Address = data.Address;
				this.City = data.City;
				this.Region = data.Region;
				this.PostalCode = data.PostalCode;
				this.Country = data.Country;
				this.Phone = data.Phone;
				this.Orders = [];
				this.bMultilevelEnabled = false;
				this.selectedOrder = [];

			}
		},
		getOrderBasedOnID: function (sOrderId) {
				return this.Orders.find(function (oOrder) {
				return parseInt(sOrderId) === oOrder.OrderID;
			});
		},
		populateOrder: function (aData, bMultilevelExpand) {
			var that = this;
			this.bMultilevelEnabled = bMultilevelExpand;
			this.Orders = [];
			aData.forEach(function (orderObject) {
				that.Orders.push(new Order(orderObject, that));
			});

		},
		loadSingleOrderBasedOnOrderId: function (sOrderId) {
			this.selectedOrder = [];
			this.selectedOrder.push(this.getOrderBasedOnID(sOrderId));
		}

	});

});
