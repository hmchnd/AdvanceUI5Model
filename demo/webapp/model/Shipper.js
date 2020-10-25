/*---------------------------------------------------------------*
 * Shipper Detail Class
 *----------------------------------------------------------------*/
sap.ui.define([
	"./BaseObject"
], function (BaseObject) {
	"use strict";
	return BaseObject.extend("ccenture.demo.model.Shipper", {

		/** 
		 * Constructor.
		 * @param data changelog relevant data in JSON format.
		 */
		constructor: function (data, oTextResources) {
			BaseObject.call(this, {});

			if (data) {
				this.ShipperID ="ID-" + data.ShipperID;
				this.CompanyName = "Company Name-"+data.CompanyName;
				this.Phone = "Phone No -"+data.Phone;
			}
		}

	});

});