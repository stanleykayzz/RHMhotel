/**
 * Created by maxime on 11/07/2017.
 */
;(function () {
    "use strict";

    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.building = Core.service.building || {};

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.building.create = function (building) {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "create",
            method : "POST",
            url    : "/building",
            func : function () {
                service.admin.getListBuildings();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest, building, false , true);
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.building.update = function (building) {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "update",
            method : "PUT",
            url    : "/building",
            func : function () {
                service.admin.getListBuildings();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest, building, false, true);
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.building.delete = function (id) {
        var paramRequest = "id=" + id + "&token=" + client.token;

        var object = {
            name   : "delete",
            method : "DELETE",
            url    : "/building",
            func : function () {
                service.admin.getListBuildings();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest, null, false, true);
    };

    Core.service.building.get = function () {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "get",
            method : "GET",
            url    : "/building",
            func : function (list) {
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    /**
     * Generate the building list into the admin panel
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.building.initAdminViewListBuilding = function () {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "initViewListBuilding",
            method : "GET",
            url    : "/building",
            func : function (json) {
                var headers = {
                    id: {
                        content: "ID"
                    },
                    name: {
                        content: "Nom"
                    },
                    button: {
                        update: {
                            btnClass: "btn btn-warning",
                            icone: "glyphicon glyphicon-pencil",
                            preId: "restaurant_update",
                            func: function (element) {
                                utils.addListener(element, 'click', function (e) {
                                    utils.template.eventButtonUpdate(e, Core.service.building.update());
                                }, false);
                            }
                        },
                        delete: {
                            btnClass: "btn btn-danger",
                            icone: "glyphicon glyphicon-remove",
                            preId: "restaurant_delete",
                            func: function (element) {
                                utils.addListener(element, 'click', function (e) {
                                    utils.template.eventButtonRemove(e, Core.service.building.delete());
                                }, false);
                            }
                        }
                    }
                };

                utils.template.createLiTemplate(headers, null, document.getElementById("list_building_content"), "create", Core.service.building.create());
                utils.template.createLiTemplate(headers, json, document.getElementById("list_building_content"), "update");
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };
})();