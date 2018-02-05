/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function (undefined) {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.data = Core.data || {};

    Core.data = {
        pathHtml: "html/",
        pathScript: "js/",
        viewList: {
            accueil: {
                name: "accueil",
                viewPath: "view.accueil.html",
                listImage: "img/menu/index-bg.jpg"
            },
            connexion: {
                name: "connexion",
                viewPath: "view.signin.html",
                listImage: "img/menu/login-bg.jpg"
            },
            chambre: {
                name: "chambre",
                viewPath: "view.chambre.html",
                listImage: "img/menu/room-bg.jpg"
            },
            restaurant: {
                name: "restaurant",
                viewPath: "view.restaurant.html",
                listImage: "img/menu/restaurant-bg.jpg"
            },
            contact: {
                name: "contact",
                viewPath: "view.contact.html",
                listImage: "img/menu/contact-bg.jpg"
            },
            compte: {
                name: "compte",
                viewPath: "view.compte.html",
                listImage: "img/menu/account-bg.jpg"
            },
            about: {
                name: "about",
                viewPath: "view.about.html",
                listImage: "img/menu/about-bg.jpg"
            },
            logout: {
                name: "logout",
                viewPath: "view.accueil.html",
                listImage: "img/menu/login-bg.jpg"
            },
            confirmation: {
                name: "confirmation",
                viewPath: "view.confirmation.html",
                listImage: "img/menu/login-bg.jpg"
            },
            festiveRoom: {
                name: "festiveRoom",
                viewPath: "view.festiveRoom.html",
                listImage: "img/menu/festiveRoom-bg.jpg"
            },
            clientListBook: {
                name: "clientListBook",
                viewPath: "view.clientListBook.html",
                listImage: "img/menu/listbook-bg.jpg"
            },
            admin: {
                name: "admin",
                viewPath: "view.admin.html",
                listImage: "img/menu/listbook-bg.jpg"
            },
            listArticle: {
                name: "listArticle",
                viewPath: "view.article.html",
                listImage: "img/menu/article-bg.jpg"
            },
            galery: {
                name: "galery",
                viewPath: "view.galery.html",
                listImage: "img/menu/galery-bg.jpg"
            }
        },
        basicUrl   : "https://residencedeshautsdemenaye.fr/api",
        //basicUrl: "http://localhost:8080/api",
        getMenu: function () {
            return document.getElementById("ul_menu");
        },
        getIncludeContainer: function () {
            return document.getElementById("include_content");
        },
        adminPanel: {},
        listRoomCategories: [],
        listRoom: [],
        costFestiveRoom: 0,
        currentPath: null,
        captchaResult: null,
        mainImageID: "main_header",
        httpCodeValide: [200, 201, 202, 302],
        rbr: null,
        clientIp: null
    };
})();
