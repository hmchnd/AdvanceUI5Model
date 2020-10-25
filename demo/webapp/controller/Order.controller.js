sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("accenture.demo.controller.Order", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf accenture.demo.view.Order
		 */
		onInit: function () {
			this.CustomerOrderState = this.getOwnerComponent().getState("CustomerOrder");
			this.CustomerOrderState.setViewController(this);
			this.getView().setModel(this.CustomerOrderState.getModel(), "CustomerModel");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.attachRouteMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function (oEvent) {
			var sCustomerId = oEvent.getParameters().arguments.custId;
			this.CustID = sCustomerId;
			if (sCustomerId !== undefined) {
				var bMultilevelExpand = false;
				this.CustomerOrderState.loadCustomerOrdersDetails(sCustomerId, undefined, bMultilevelExpand);
			}

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf accenture.demo.view.Order
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf accenture.demo.view.Order
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf accenture.demo.view.Order
		 */
		//	onExit: function() {
		//
		//	}

		onPress: function (oEvent) {
			var sOrderId = oEvent.getSource().getHeader().split("-")[0];
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Details", {
				orderNo: sOrderId,
				custId: this.CustID
			});
		}
	});

});