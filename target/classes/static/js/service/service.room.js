/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.room = Core.service.room || {};

    /**
     * Return the listRoom found
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.room.search = function (json) {
        var paramRequest = "dateStart=" + json.dateStart + "&dateEnd=" + json.dateEnd;

        var object = {
            name   : "searchRoom",
            method : "GET",
            url    : "/room/getListRoomFree",
            func : function (listRoom) {
                if(listRoom !== null && listRoom !== undefined)
                    Core.controller.room.roomSearch(listRoom);
                else
                    return null;
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.room.create = function (room) {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "create",
            method : "POST",
            url    : "/room",
            func : function () {
                Core.service.admin.getListRoom();
            },
            error : function(statusCode){
            }
        };

        utils.ajaxRequest(object, paramRequest, room, false, true);
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.room.update = function (room) {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "update",
            method : "PUT",
            url    : "/room",
            func : function () {
                Core.service.admin.getListRoom();
            },
            error : function(statusCode){
            }
        };

        utils.ajaxRequest(object, paramRequest, room, false, true);
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.room.delete = function (id) {
        var paramRequest = "id=" + id + "&token=" + client.token;

        var object = {
            name   : "delete",
            method : "DELETE",
            url    : "/room",
            func : function () {
                Core.service.admin.getListRoom();
            },
            error : function(statusCode){
            }
        };

        utils.ajaxRequest(object, paramRequest, null, false, true);
    };

    Core.service.room.initListRoom = function () {
        var object = {
            name   : "initListRoom",
            method : "GET",
            url    : "/room",
            func : function (list) {
                data.listRoom = list;
            },
            error : function(statusCode){
            }
        };

        utils.ajaxRequest(object);
    };
    
})();