/**
 * Created by maxime on 03/10/2017.
 */
;(function () {
    "use strict";

    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.invalidDateFestiveRoom = Core.service.invalidDateFestiveRoom || {};

    Core.service.invalidDateFestiveRoom.getListInvalidDateFestiveRoom = function () {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "get",
            method : "GET",
            url    : "/invalidBookingDateFestiveRoom",
            func : function (list) {
                data.adminPanel.listDateInvalideFestiveRoom = list;
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.invalidDateFestiveRoom.create = function (json) {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "create",
            method : "POST",
            url    : "/invalidBookingDateFestiveRoom",
            func : function () {
                Core.service.admin.getListFestiveRoom();
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest, json, false, true);
    };

    Core.service.invalidDateFestiveRoom.delete = function (id) {
        var paramRequest = "id=" + id + "&token=" + client.token;

        var object = {
            name   : "delete",
            method : "DELETE",
            url    : "/invalidBookingDateFestiveRoom",
            func : function (list) {
                Core.service.admin.getListFestiveRoom();
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest, null, false, true);
    };
})();