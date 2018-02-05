/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.festiveRoom.services = Core.service.festiveRoom.services || {};

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.festiveRoom.services.create = function () {
        return {
            name: "create",
            method: "POST",
            url: "/festiveRoomService",
            func: function (json) {

            },
            error: function (statusCode) {
            }
        }
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.festiveRoom.services.update = function () {
        return {
            name: "update",
            method: "PUT",
            url: "/festiveRoomService",
            func: function (json) {
            
            },
            error: function (statusCode) {
            }
        }
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.festiveRoom.services.delete = function () {
        return {
            name: "delete",
            method: "DELETE",
            url: "/festiveRoomService",
            func: function (json) {

            },
            error: function (statusCode) {
            }
        }
    };

    /**
     * Init the services into the festiveRoom view
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.festiveRoom.services.getList = function () {
        var paramRequest = "token=" + client.token;

        var object = {
            name: "getList",
            method: "GET",
            url: "/festiveRoomService",
            func: function (json) {
                data.listFesiveRoomService = json;
                Core.controller.festiveRoom.initServiceList(json);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };
    
    Core.service.festiveRoom.services.getListBooked = function () {
        var paramRequest = "token=" + client.token;

        var object = {
            name: "getList",
            method: "GET",
            url: "/festiveRoomService",
            func: function (json) {
                data.listFesiveRoomService = json;
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };
    
    Core.service.festiveRoom.services.getListAdmin = function () {
        var paramRequest = "token=" + client.token;

        var object = {
            name: "getList",
            method: "GET",
            url: "/festiveRoomService",
            func: function (json) {
                data.listFesiveRoomService = json;
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.festiveRoom.services.getListServiceByFestiveRoomBookId = function (id, container) {
        var paramRequest = "token=" + client.token + "&id=" + id;

        var object = {
            name: "getList",
            method: "GET",
            url: "/festiveRoomBookingServices/getByListFestiveRoomBookByIdBook",
            func: function (listServices) {
                Core.controller.clientListBook.initFestiveRoomService(listServices, container);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };
})();
