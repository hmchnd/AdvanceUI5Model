/*---------------------------------------------------------------*
 * Order Class
 *----------------------------------------------------------------*/
sap.ui.define([
	"./BaseObject",
	"../model/OrderDetail",
	"../model/Shipper"
], function (BaseObject, OrderDetail, Shipper) {
	"use strict";
	return BaseObject.extend("ccenture.demo.model.Order", {

		/** 
		 * Constructor.
		 * @param data changelog relevant data in JSON format.
		 */
		constructor: function (data, oCustomer) {
			BaseObject.call(this, {});

			if (data) {
				this.OrderID = data.OrderID;
				this.CustomerID = data.CustomerID;
				this.OrderDate = data.OrderDate;
				this.ShippedDate = data.ShippedDate;
				this.ShipName = data.ShipName;
				this.ShipAddress = data.ShipAddress;
				this.ShipCity = data.ShipCity;
				this.ShipCountry = data.ShipCountry;
				this.Customer = oCustomer;
				this.OrderDetails = [];
				this.Shipper = {};
				if (this.Customer.bMultilevelEnabled) {
					this.populateOrderDetails(data.Order_Details.results);
					this.populateShipper(data.Shipper);
				}

			}
		},
		populateOrderDetails: function (aData) {
			var that = this;
			this.OrderDetails = [];
			aData.forEach(function (orderDet) {
				that.OrderDetails.push(new OrderDetail(orderDet));
			});

		},
		populateShipper: function (oShipper) {

			this.Shipper = new Shipper(oShipper);

		}

	});

});