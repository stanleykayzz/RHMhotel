/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.payment = Core.service.payment || {};

    Core.service.payment.initCountryInfo = function (ipClient) {
        var paramRequest = "ipClient=" + ipClient;
        var object = {
            name: "getCountryInfo",
            method: "GET",
            url: "/payment",
            func: function (json) {
                data.countryInfo = json;                       
                Core.utils.reservation.getCurrencySymbol();
            },
            error: function (statusCode) {

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.payment.getLocalPrice = function (price) {
        var localPrice = price * data.countryInfo.rate;

        return Math.round(localPrice);
    };


})();