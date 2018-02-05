/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.festiveRoom = Core.service.festiveRoom || {};

    Core.service.festiveRoom.create = function (festiveRoom, formData) {
        var paramRequest = "token=" + client.token + "&file=" + formData;

        var object = {
            name   : "create",
            method : "POST",
            url    : "/festiveRoom",
            func : function () {
                Core.service.admin.getListFestiveRoom();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.festiveRoom.update = function (festiveRoom) {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "update",
            method : "PUT",
            url    : "/festiveRoom",
            func : function () {
                Core.service.admin.getListFestiveRoom();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest, festiveRoom, false, true);
    };

    Core.service.festiveRoom.delete = function (idFestiveRoom) {
        var paramRequest = "id=" + idFestiveRoom + "token=" + client.token;

        var object = {
            name   : "delete",
            method : "DELETE",
            url    : "/festiveRoom",
            func : function () {
                Core.service.admin.getListFestiveRoom();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.festiveRoom.get = function () {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "get",
            method : "GET",
            url    : "/festiveRoom",
            func : function (festiveRoom) {
                data.listFestiveRoom = festiveRoom;
                data.costFestiveRoom = festiveRoom[0].price;
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

})();
