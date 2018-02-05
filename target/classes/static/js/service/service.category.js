/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function (undefined) {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.category = Core.service.category || {};

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.category.create = function (category) {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "create",
            method: "POST",
            url: "/roomCategory",
            func: function (id) {
                Core.service.admin.getListRoom();                         
                Core.service.pictureRoomCategory.create(id);
            },
            error: function () {

            }
        };

        utils.ajaxRequest(object, paramRequest, category, false, true);
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.category.update = function (category) {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "update",
            method: "PUT",
            url: "/roomCategory",
            func: function (id) {
                Core.service.admin.getListRoom();
                Core.service.pictureRoomCategory.update(id);
            },
            error: function () {

            }
        };

        utils.ajaxRequest(object, paramRequest, category, false, true);
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.category.delete = function (id) {
        var paramRequest = "token=" + client.token + "&id=" + id;

        var object = {
            name: "delete",
            method: "DELETE",
            url: "/roomCategory",
            func: function () {
                Core.service.admin.getListRoom();
            },
            error: function () {

            }
        };

        utils.ajaxRequest(object, paramRequest, null, false, true);
    };

    /**
     * Store the category list into a global variable
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.category.getListCategories = function () {
        var object = {
            name: "getListCategories",
            method: "GET",
            url: "/roomCategory",
            func: function (listCategories) {
                if (listCategories !== null && listCategories !== undefined)
                    data.listRoomCategories = listCategories;
                else
                    return null;

                window.roomCategories = listCategories;
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object);
    };

})();