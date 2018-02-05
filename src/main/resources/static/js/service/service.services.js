/**
 * Created by maxime on 11/07/2017.
 */
;(function () {
    "use strict";

    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.services = Core.service.services || {};

    /**
     * 
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.services.create = function (service) {
        var paramRequest = "token=" + client.token;
        var object =  {
            name   : "create",
            method : "POST",
            url    : "/festiveRoomService",
            func : function () {
                Core.service.admin.getListFestiveRoom();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest, service, false, true);
    };

    /**
     * 
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.services.update = function (service) {
        var paramRequest = "token=" + client.token;
        var object =  {
            name   : "update",
            method : "PUT",
            url    : "/festiveRoomService",
            func : function () {
                Core.service.admin.getListFestiveRoom();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest, service, false, true);
    };

    Core.service.services.delete = function (id) {
        var paramRequest = "id=" + id + "&token=" + client.token;
        var object =  {
            name   : "delete",
            method : "DELETE",
            url    : "/festiveRoomService",
            func : function () {
                Core.service.admin.getListFestiveRoom();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest, null, false, true);
    };

})();