sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("accenture.demo.controller.Customer", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf accenture.demo.view.Customer
		 */
		onInit: function () {

			this.CustomerOrderState = this.getOwnerComponent().getState("CustomerOrder");
			this.CustomerOrderState.setViewController(this);
			this.getView().setModel(this.CustomerOrderState.getModel(), "CustomerModel");
			this.CustomerOrderState.loadCustomerDataService();
		
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf accenture.demo.view.Customer
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf accenture.demo.view.Customer
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf accenture.demo.view.Customer
		 */
		//	onExit: function() {
		//
		//	}

		onRowPress: function (oEvent) {
			var oSelectedRow = oEvent.getSource().getBindingContext("CustomerModel").getObject();
			var sCustomerId = oSelectedRow.CustomerID;
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Order", {
				custId: sCustomerId
			});
			//
		}
	});

});