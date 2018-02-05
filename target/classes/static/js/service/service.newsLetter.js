/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function(undefined) {
    "use strict";

    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.newsLetter = Core.service.newsLetter || {};

    /**
     * 
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.newsLetter.create = function (newsletter) {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "create",
            method : "POST",
            url    : "/newsletter",
            func : function () {

            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest, newsletter);
    };

    Core.service.newsLetter.get = function () {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "get",
            method : "GET",
            url    : "/newsletter",
            func : function (list) {

            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    /**
     * Init the news letter view in the admin panel
     */
    /*Core.service.iniAdminViewNewsLetter = function () {
        var btn = document.getElementById("btn_newsLetter");
        utils.addListener(btn, "click", function () {
            var title = document.getElementById("title_news");
            var content = document.getElementById("content_news");

            if(title.value !== "" && content.value !== ""){
                var paramRequest = "token=" + client.token;
                var body = {
                    title: title.value,
                    content: content.value
                };

                utils.ajaxRequest(Core.service.newsLetter.send(), paramRequest, body);
            }
        }, false);
    };*/

})();