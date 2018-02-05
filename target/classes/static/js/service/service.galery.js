/**
 * Created by maxime on 30/09/2017.
 */

;(function (undefined) {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.galery = Core.service.galery || {};

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.galery.create = function () {
        var paramRequest = data.basicUrl + "/pictureGalery?token=" + client.token;

        var form = document.getElementById("formDataGalery");
        form.action =  + paramRequest;
        var formData = new FormData(form);

        var oReq = new XMLHttpRequest();
        oReq.open("post", paramRequest, true);
        oReq.onload = function(oEvent) {
            if (oReq.status == 201) {
                Core.service.galery.getListAdmin();
            } else {
                alert("error")
            }
        };

        oReq.send(formData);
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.galery.delete = function (id) {
        var paramRequest = "token=" + client.token + "&id=" + id;

        var object = {
            name: "delete",
            method: "DELETE",
            url: "/pictureGalery",
            func: function () {
                service.admin.getListGalery();
            },
            error: function () {

            }
        };

        utils.ajaxRequest(object, paramRequest, null, false, true);
    };

    /**
     * The callback func create the article list into the view article
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.galery.getList = function () {
        var object = {
            name: "getList",
            method: "GET",
            url: "/pictureGalery",
            func: function (list) {
               Core.controller.galery.displayGalery(list);

            },
            error: function () {

            }
        };

        utils.ajaxRequest(object);
    };

    Core.service.galery.getListAdmin = function () {
        var object = {
            name: "getList",
            method: "GET",
            url: "/pictureGalery",
            func: function (list) {
                Core.controller.admin.getListGalery();

            },
            error: function () {

            }
        };

        utils.ajaxRequest(object);
    };

})();