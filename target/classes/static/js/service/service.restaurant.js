/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.restaurant = Core.service.restaurant || {};

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.restaurant.create = function (restaurantTable) {
        var paramRequest = "token=" + client.token;
    
        var object = {
            name   : "create",
            method : "POST",
            url    : "/restaurantTable",
            func : function () {
                service.admin.getListRestaurantTable();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest, restaurantTable, false, true);
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.restaurant.udapte = function (restaurantTable) {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "create",
            method : "PUT",
            url    : "/restaurantTable",
            func : function () {
                service.admin.getListRestaurantTable();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest, restaurantTable, false, true);
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.restaurant.delete = function (id) {
        var paramRequest = "id=" + id + "&token=" + client.token;

        var object = {
            name   : "delete",
            method : "DELETE",
            url    : "/restaurantTable",
            func : function () {
                service.admin.getListRestaurantTable();
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest, null, false, true);
    };

    /**
     * Init the restaurant book into the admin panel
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.restaurant.initAdminViewListRestaurant = function () {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "initViewListRestaurant",
            method : "GET",
            url    : "/restaurantTable",
            func : function (json) {

            },
            error : function(){

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

})();