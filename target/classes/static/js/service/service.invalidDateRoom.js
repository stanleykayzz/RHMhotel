/**
 * Created by maxime on 02/10/2017.
 */
/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.invalidDateRoom = Core.service.invalidDateRoom || {};

    Core.service.invalidDateRoom.getListinvalidDateRoom = function () {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "get",
            method : "GET",
            url    : "/invalidBookingDateRoom",
            func : function (list) {
                data.adminPanel.listDateInvalideRoom = list;
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.invalidDateRoom.create = function (json) {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "create",
            method : "POST",
            url    : "/invalidBookingDateRoom",
            func : function () {
                Core.service.admin.getListRoom();
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest, json, false, true);
    };

    Core.service.invalidDateRoom.delete = function (id) {
        var paramRequest = "id=" + id + "&token=" + client.token;

        var object = {
            name   : "delete",
            method : "DELETE",
            url    : "/invalidBookingDateRoom",
            func : function (list) {
                Core.service.admin.getListRoom();
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest, null, false, true);
    };
})();