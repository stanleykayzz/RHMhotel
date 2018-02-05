/**
 * Created by maxime on 30/09/2017.
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.controller.galery = Core.controller.galery || {};

    /**
     * Send a request to display articles in the article View
     */
    Core.controller.galery.initView = function () {
        Core.service.galery.getList();
    };

    Core.controller.galery.displayGalery = function (listGalery) {
        data.currentPictureGalery = 0;
        var container = document.getElementById("galery_container");
        var image = "<image class='picture_galery' src='"+listGalery[data.currentPictureGalery].path+"'></image>";

        container.innerHTML = image;
        for(var i = 1 ; i < listGalery.length ; i++){
            var image = "<image class='picture_galery' src='"+listGalery[i].path+"'></image>";
            container.innerHTML += image;
        }

        var arrayImage = document.getElementsByClassName("picture_galery");
        for(var j = 0 ; j < arrayImage.length ; j++){
            var src = arrayImage[j].getAttribute("src");

            utils.addListener(arrayImage[j], "click", function (e) {
                Core.controller.galery.displayImage(e.target);
            }, false);
        }
    };

    Core.controller.galery.displayImage = function (picture) {
        var body = document.getElementsByTagName("BODY")[0];
        var hideBg, img;

        var generetaElements = function () {
            hideBg = document.createElement("div");
            hideBg.style.backgroundColor = "black";
            hideBg.style.opacity = 0.7;
            hideBg.style.position = "absolute";
            hideBg.style.top = window.scrollY + "px";
            hideBg.style.left = 0;
            hideBg.style.width = "100%";
            hideBg.style.height = "100%";
            hideBg.id = "hideBG";

            img = document.createElement("img");
            img.id = "tmp_img";
            img.style.top = window.scrollY+"px";
            img.src = picture.src;
            img.className = "temp_img";
        }();
        var appendElements = function () {
            body.appendChild(hideBg);
            body.appendChild(img);
            body.style.overflow = "hidden";
        }();
        var initEvents = function () {
            utils.addListener(img, "click", function (e) {
                var target = e.target;
                var bg = document.getElementById("hideBG");

                bg.parentElement.removeChild(bg);
                target.parentElement.removeChild(target);
                document.getElementsByTagName("BODY")[0].style.overflow = "auto";
            }, false);

            utils.addListener(hideBg, "click", function (e) {
                var target = e.target;
                var img = document.getElementById("tmp_img");

                img.parentElement.removeChild(img);
                target.parentElement.removeChild(target);
                document.getElementsByTagName("BODY")[0].style.overflow = "auto";
            }, false);
        }();
    };
})();