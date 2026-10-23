(function () {
	"use strict";

	function patch_logout_redirect() {
		if (!frappe.Application || !frappe.Application.prototype) {
			return;
		}

		var original_redirect_to_login = frappe.Application.prototype.redirect_to_login;

		frappe.Application.prototype.redirect_to_login = function () {
			if (this.logged_out) {
				window.location.replace("/login");
				return;
			}

			return original_redirect_to_login.apply(this, arguments);
		};
	}

	if (window.frappe && frappe.Application) {
		patch_logout_redirect();
	} else {
		$(document).ready(patch_logout_redirect);
	}
})();
