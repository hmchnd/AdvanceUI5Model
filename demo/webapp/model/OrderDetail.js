/*---------------------------------------------------------------*
 * Order Detail Class
 *----------------------------------------------------------------*/
sap.ui.define([
	"./BaseObject"
], function (BaseObject) {
	"use strict";
	return BaseObject.extend("ccenture.demo.model.OrderDetail", {

		/** 
		 * Constructor.
		 * @param data changelog relevant data in JSON format.
		 */
		constructor: function (data, oTextResources) {
			BaseObject.call(this, {});

			if (data) {
				this.OrderID = data.OrderID;
				this.ProductID = data.ProductID;
				this.UnitPrice = data.UnitPrice;
				this.Quantity = data.Quantity;
				this.Discount = data.Discount;
			}
		}

	});

});