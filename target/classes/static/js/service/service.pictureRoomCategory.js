/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.pictureRoomCategory = Core.service.pictureRoomCategory || {};

    Core.service.pictureRoomCategory.getList = function () {
        var object = {
            name   : "getList",
            method : "GET",
            url    : "/pictureRoomCategory",
            func : function (list) {
                data.listPictureRoomCategory = list;
            },
            error : function(){

            }
        };

        utils.ajaxRequest(object);
    };

    Core.service.pictureRoomCategory.create = function (id) {
        var paramRequest = data.basicUrl + "/pictureRoomCategory?token=" + client.token + "&id=" + id;;

        var form = document.getElementById("formDataCategory");
        form.action =  + paramRequest;
        var formData = new FormData(form);

        var oReq = new XMLHttpRequest();
        oReq.open("post", paramRequest, true);
        oReq.onload = function(oEvent) {
            if (oReq.status == 201) {
                Core.service.pictureRoomCategory.getList();
            } else {
                alert("error")
            }
        };

        oReq.send(formData);
    };

    Core.service.pictureRoomCategory.update = function (id) {
        var paramRequest = data.basicUrl + "/pictureRoomCategory/update?token=" + client.token + "&id=" + id;
        var form = document.getElementById("formDataUpdateCategory");
        form.action = paramRequest;
        var formData = new FormData(form);

        var oReq = new XMLHttpRequest();
        oReq.open("post", paramRequest, true);
        oReq.onload = function(oEvent) {
            if (oReq.status == 202) {
                Core.service.pictureRoomCategory.getList();
            }
        };

        if(document.getElementById("update_picture_galery").value != "")
            oReq.send(formData);
    };

    Core.service.pictureRoomCategory.delete = function () {

    };

})();