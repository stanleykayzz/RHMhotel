/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.controller.menu = Core.controller.menu || {};

    /**
     * Manage the menu buttons
     */
    Core.controller.menu.manageMenuButtons = function () {
        utils.addListener(data.getMenu(), "click", function (e) {
            if(e.target.tagName === "A"){
                var pageName = e.target.id.substring(4);
                controller.includeContainer.switchView(pageName);

                if(window.client !== null && window.client !== undefined && e.target.id !== "btn_logout")
                    window.client.reloadTokenDate();
            }
        }, false);
    };

    /**
     * add the contextual menu buttons when the client if connected
     */
    Core.controller.menu.addContextualMenuButtons = function () {
        var menu = data.getMenu();

        var createButton = function (id, content) {
            var baliseLi, baliseA;

            baliseLi = document.createElement("li");
            baliseLi.className    = "title_menu_main contextualMenu";
            baliseLi.style.cursor = "pointer";

            baliseA = document.createElement("a");
            baliseA.id = id;
            baliseA.className = "title_menu_main_a";
            baliseA.textContent = content;

            baliseLi.appendChild(baliseA);
            menu.appendChild(baliseLi);
        };
        var removeButtons = function () {
            var arrayButtons = document.getElementsByClassName("contextualMenu");
            while(arrayButtons.length > 0){
                arrayButtons[0].parentElement.removeChild(arrayButtons[0]);
            }
        };
        var addButtons = function () {
            if(window.client){
                removeButtons();

                if(client.accreditation === "admin"){
                    createButton("btn_admin", "ADMIN");

                }

                if(client.accreditation === "user") {
                    createButton("btn_restaurant", "Restaurant");
                    createButton("btn_festiveRoom", "Salle des fêtes");
                    createButton("btn_listArticle", "Article");
                    createButton("btn_clientListBook", "Réservations");
                    createButton("btn_compte", "Compte");
                }


                createButton("btn_logout", "Déconnecter");
            } else {
                removeButtons();
                createButton("btn_connexion", "Connexion");
            }
        }();
    };

    /**
     * Reload on the same page when the client press F5
     */
    Core.controller.menu.reloadPage = function () {
        utils.addListener(document, "keydown", function(e){
            if(e.keyCode === 116){
                utils.pauseEvent(e);
                utils.empty(data.getIncludeContainer());
                utils.include(data.currentPath, data.currentPath.split(".")[0]);
            }
        }, false);
    };

})();