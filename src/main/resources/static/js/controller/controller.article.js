/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.controller.article = Core.controller.article || {};

    /**
     * Send a request to display articles in the article View
     */
    Core.controller.article.initView = function () {
        Core.service.article.getList();
        Core.controller.article.displayArticles(data.listArticle);
    };

    Core.controller.article.displayArticles = function (listArticles) {
        var container = document.getElementById("article_container");

        for(var i = 0 ; i < listArticles.length ; i++){
            var currentArticle = listArticles[i];
            var date = new Date(listArticles[i].date);
            var template = "<div class='container_article'>"+
            "<image src='"+ currentArticle.picturePath +"' class='image_article'></image>"+
                "<h2 class='title_article'>"+ currentArticle.title +"</h2>"+
                "<div class='content_article'>"+ currentArticle.content +"</div>"+
                "<span class='date_article'>"+ utils.beautifyDate(date) +"</span>"+
                "</div>";

            container.innerHTML += template;
        }

    };
})();