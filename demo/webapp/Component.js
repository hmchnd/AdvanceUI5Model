sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"./service/NorthwindService",
	"./state/CustomerOrderState",
	"accenture/demo/model/models"
], function (UIComponent, Device, NorthwindService, CustomerOrderState, models) {
	"use strict";

	return UIComponent.extend("accenture.demo.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();
			// OData metadata exception handlers.	
			this.getModel().attachMetadataFailed(this.onMetadataFailed, this);
			
				// Instantiating services and states
			this._oNorthwindService = new NorthwindService(this.getModel());
			this._oCustomerOrderState = new CustomerOrderState(this._oNorthwindService, this.getModel("i18n").getResourceBundle());

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},

		getService_: function (sService) {
			return this["_o" + sService + "Service"];
		},

		getState: function (sState) {
			return this["_o" + sState + "State"];
		},

		/** 
		 * Fired when OData metadata couldn'be loaded.
		 * Show error message.
		 * @param oEvent
		 */
		onMetadataFailed: function (oEvent) {
			sap.m.MessageBox.show(this.getModel("i18n").getProperty("xmsg.connectionError"), {
				icon: "ERROR",
				details: oEvent.getParameter("message")
			});
		}

	});
});