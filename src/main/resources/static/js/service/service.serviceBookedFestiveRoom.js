/**
 * Created by maxime on 29/09/2017.
 */
;(function () {
    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.serviceBookedFestiveRoom = Core.service.serviceBookedFestiveRoom || {};

    /**
     * Generate the paypal button with the book price
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.serviceBookedFestiveRoom.add = function (list) {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "getKey",
            method : "POST",
            url    : "/festiveRoomBookingServices",
            func : function (listService) {
                Core.controller.festiveRoom.initlistItemsbooked(listService);
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest, list);
    };

})();