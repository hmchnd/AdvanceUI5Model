/*---------------------------------------------------------------*
 * work as model 
 *----------------------------------------------------------------*/
sap.ui.define([
	"../model/BaseObject",
	"../model/ManageCustomer",
	"sap/m/MessageBox"
], function (BaseObject, ManageCustomer, MessageBox) {
	"use strict";
	var CustomerOrderState = BaseObject.extend("accenture.demo.state.ScheduleState", {
		/**
		 * ----------------------------------------------
		 * State constructor/destuctor functions.
		 * ----------------------------------------------
		 */

		/** 
		 * Constructor: Initializing State.
		 * @param oService
		 * @param oResourceBundle
		 */

		constructor: function (oService, oResourceBundle) {
			var that = this;
			that.data = {
				ManageCustomer: new ManageCustomer()
			};
			that.NorthwindService = oService; // OData service.
			that.BusyCounter = 0; // Busy indicator counter.
			that.ResourceBundle = oResourceBundle; // Text Resources
			that.ViewController = null; // View controller instance.
			// Initialize base object.
			BaseObject.call(that, {
				isState: true
			});
		},
		/** 
		 * Set view controller to have it accessible for scenarios where binding is not sufficient.
		 * @param oViewController
		 */
		setViewController: function (oViewController) {
			this.ViewController = oViewController;
		},
		/** 
		 * Returns access to i18n text resources.
		 * @returns ... Resource Bundle object.
		 */
		getTextResources: function () {
			return this.ResourceBundle;
		},
		getCustomerManage: function () {
			return this.data.ManageCustomer;
		},
		loadCustomerDataService: function () {
			var that = this;
			var aPromises = [];
			aPromises.push(this.NorthwindService.loadCustomers());
			Promise.all(aPromises).then(function (result) {

				var aCustomerData = result[0].data.results;
				that.getCustomerManage().LoadCustomerData(aCustomerData);
				that.updateModel(true);
			}).catch(function (error) {
				try {
					var oError = JSON.parse(error.responseText);
					var sDetails = oError.error.message.value;
				} catch (Err) {
					sDetails = error.message + "\n" + error.responseText;
				}
				MessageBox.error(that.getTextResources().getText("xmsg.connectionError"), {
					icon: "ERROR",
					details: sDetails
				});
			});
		},
		loadCustomerOrdersDetails: function (sCustomerId, sOrderId, bMultilevelExpand) {
			var that = this;
			var aPromises = [];
			aPromises.push(this.NorthwindService.loadCustomerOrders(sCustomerId, bMultilevelExpand));
			Promise.all(aPromises).then(function (result) {
				debugger;
				var aCustOrderData = result[0].data.Orders.results;
				that.getCustomerManage().loadCustomerOrderDetails(sCustomerId, sOrderId, aCustOrderData, bMultilevelExpand);
				that.updateModel(true);
			}).catch(function (error) {
				try {
					var oError = JSON.parse(error.responseText);
					var sDetails = oError.error.message.value;
				} catch (Err) {
					sDetails = error.message + "\n" + error.responseText;
				}
				MessageBox.error(that.getTextResources().getText("xmsg.connectionError"), {
					icon: "ERROR",
					details: sDetails
				});
			});

		}

	});
	return CustomerOrderState;
});