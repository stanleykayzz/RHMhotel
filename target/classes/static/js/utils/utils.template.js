/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.utils.template = Core.utils.template || {};

    /**
     * Generate template to display data lists
     * @param jsonHeaders
     * @param jsonValues
     * @param container
     * @param type
     * @param createFunc
     */
    Core.utils.template.createLiTemplate = function (jsonHeaders, jsonValues, container, type, createFunc) {
        var div_table = document.createElement("div");
        div_table.classList.add("div_table");
        var lastKey = null;

        var createHeader = function () {
            var div_row_header = document.createElement("div");
            div_row_header.classList.add("div_row");

            var div_cell_header = document.createElement("div");
            div_cell_header.classList.add("div_cell");
            div_cell_header.classList.add("header_list");

            for (var h in jsonHeaders) {
                var clone = div_cell_header.cloneNode(true);

                if (jsonHeaders[h].content !== null)
                    clone.textContent = jsonHeaders[h].content;

                if (h === "id") {
                    if (type !== "create") {
                        div_row_header.appendChild(clone);
                    }
                } else {
                    div_row_header.appendChild(clone);
                }

                lastKey = h;
            }

            div_table.appendChild(div_row_header);
        }();
        var createBody = function () {
            var div_row = document.createElement("div");
            div_row.classList.add("div_row");

            var div_cell = document.createElement("div");
            div_cell.classList.add("div_cell");
            div_cell.classList.add("content_cell");

            var button = document.createElement("button");

            button.style.padding = "5px 10px 5px 10px";
            button.style.marginLeft = "10px";
            var button_span = document.createElement("span");

            var input = document.createElement("input");
            input.classList.add("input_update");

            if (type === "create") {
                var clone_row = div_row.cloneNode(true);
                for (var h in jsonHeaders) {
                    var clone = div_cell.cloneNode(true);
                    var clone_input = null;

                    if (h !== "button" && h !== "id") {
                        clone_input = input.cloneNode("true");
                        clone_input.setAttribute("bodyKey", h);
                        clone.appendChild(clone_input);
                    }

                    if (h === lastKey) {
                        clone.classList.add("last");

                        var clone_btn = button.cloneNode("true");
                        clone_btn.classList.add("btn");
                        clone_btn.classList.add("btn-success");

                        var clone_span = button_span.cloneNode("true");
                        clone_span.className = "glyphicon glyphicon-plus";

                        clone_btn.appendChild(clone_span);
                        clone.appendChild(clone_btn);

                        utils.addListener(clone_btn, "click", function (e) {
                            var row = utils.template.getRowFromTarget(e.target);
                            var paramRequest = "token=" + client.token;
                            var body = Core.utils.template.generateBodyFromRow(row);
                       
                            utils.ajaxRequest(createFunc, paramRequest, body);
                        }, false);
                    }

                    if (h !== "id")
                        clone_row.appendChild(clone);
                }

                div_table.appendChild(clone_row);
            }

            if (type !== "create" && jsonValues !== null) {
                for (var v in jsonValues) {
                    var clone_row = div_row.cloneNode(true);

                    for (var h in jsonHeaders) {
                        var clone = div_cell.cloneNode(true);
                        clone.style.backgroundColor = "white";
                        var clone_input = null;

                        if (h === "button") {
                            for (var b in jsonHeaders[h]) {
                                var clone_btn = button.cloneNode("true");
                                clone_btn.id = jsonHeaders[h][b].preId + "&" + jsonValues[v].id;
                                clone_btn.className = jsonHeaders[h][b].btnClass;

                                var clone_span = button_span.cloneNode("true");

                                clone_span.className = jsonHeaders[h][b].icone;

                                clone_btn.appendChild(clone_span);
                                clone.appendChild(clone_btn);
                                clone.setAttribute("bodyKey", h);
                                jsonHeaders[h][b].func(clone_btn);
                            }
                        } else {
                            if (type === "update") {
                                clone_input = input.cloneNode("true");
                                clone_input.value = jsonValues[v][h];
                                clone_input.style.display = "none";

                                clone.setAttribute("bodyKey", h);
                                clone_input.setAttribute("bodyKey", h);
                            }

                            if (jsonValues[v][h] !== undefined)
                                clone.textContent = jsonValues[v][h];
                        }

                        if (h === lastKey)
                            clone.classList.add("last");

                        clone_row.appendChild(clone);

                        if (clone_input !== null) {
                            clone.appendChild(clone_input);
                        }
                    }

                    div_table.appendChild(clone_row);
                }
            }


            container.appendChild(div_table);
        }();
    };

    /**
     * Create a template to display an article
     * @param container
     * @param json
     */
    Core.utils.template.createArticleTemplate = function (container, json) {
        var title = document.createElement("h1");
        title.classList.add("article_title");
        title.textContent = json.title;

        var div_content = document.createElement("div");
        div_content.classList.add("article_content");
        div_content.textContent = json.content;

        var div_date = document.createElement("div");
        div_date.classList.add("article_date");
        div_date.textContent = "Date de création " + json.date;

        container.appendChild(title);
        container.appendChild(div_content);
        container.appendChild(div_date);
    };

    /**
     * Show or hide an element by clicking on an li
     * @param id
     */
    Core.utils.template.manageListDisplay = function (id) {
        var li = document.getElementById(id);

        utils.addListener(li, "click", function (e) {
            if (e.target.classList.contains("active") === true) {
                e.target.classList.remove("active");
                if (e.target.classList.contains("template_li_title"))
                    e.target.nextElementSibling.style.display = "none";

            } else {
                if (e.target.classList.contains("template_li_title")) {
                    e.target.classList.add("active");
                    e.target.nextElementSibling.style.display = "block";
                }
            }
        }, false);
    };

    /**
     * Return the row template from an element
     * @param btn
     * @returns {*}
     */
    Core.utils.template.getRowFromTarget = function (btn) {
        var parent = btn.parentElement;
        while (!parent.classList.contains("div_row")) {
            parent = parent.parentElement;
        }

        return parent;
    };

    /**
     * Create a body response from a row tempalte
     * @param row
     * @returns {{}}
     */
    Core.utils.template.generateBodyFromRow = function (row) {
        var body = {};
        var children = row.getElementsByTagName("INPUT");

        for (var i = 0; i < children.length; i++) {
            var key = children[i].getAttribute("bodyKey");
            body[key] = children[i].value;
        }

        return body;
    };

    /**
     *
     * @param row
     * @param type
     */
    Core.utils.template.manageInputRow = function (row, type) {
        var children = row.children;
        var clone;

        if (type === "show") {
            for (var i = 0; i < children.length; i++) {
                var element = children[i].firstElementChild;

                if (element.getAttribute("bodyKey") !== "id" && element.tagName !== "BUTTON") {
                    clone = element.cloneNode("true");
                    clone.style.display = "block";

                    children[i].textContent = "";
                    children[i].appendChild(clone);
                }
            }
        } else if ("hide") {
            for (var i = 0; i < children.length; i++) {
                var element = children[i].firstElementChild;

                if (element.getAttribute("bodyKey") !== "id" && element.tagName !== "BUTTON") {
                    var value = element.value;
                    clone = element.cloneNode("true");
                    children[i].textContent = value;

                    clone.style.display = "none";
                    children[i].appendChild(clone);
                }
            }
        }
    };

    /**
     * Manage the event when user want to update a row
     * @param e
     * @param service
     */
    Core.utils.template.eventButtonUpdate = function (e, service) {
        var row = utils.template.getRowFromTarget(e.target);

        if (e.target.classList.contains("btn-warning") || e.target.classList.contains("glyphicon-pencil")) {
            if (e.target.classList.contains("btn-warning")) {

                e.target.classList.remove("btn-warning");
                e.target.classList.add("btn-success");

                e.target.firstElementChild.classList.remove("glyphicon-pencil");
                e.target.firstElementChild.classList.add("glyphicon-ok");
            } else {

                e.target.parentElement.classList.remove("btn-warning");
                e.target.parentElement.classList.add("btn-success");

                e.target.classList.remove("glyphicon-pencil");
                e.target.classList.add("glyphicon-ok");
            }

            utils.template.manageInputRow(row, "show");
        } else {
            if (e.target.classList.contains("btn-success")) {

                e.target.classList.remove("btn-success");
                e.target.classList.add("btn-warning");

                e.target.firstElementChild.classList.remove("glyphicon-ok");
                e.target.firstElementChild.classList.add("glyphicon-pencil");
            } else {

                e.target.parentElement.classList.remove("btn-success");
                e.target.parentElement.classList.add("btn-warning");

                e.target.classList.remove("glyphicon-ok");
                e.target.classList.add("glyphicon-pencil");
            }
            utils.template.manageInputRow(row, "hide");

            var id = e.target.id.split("&")[1];
            var paramRequest = "token=" + client.token + "&id=" + id;
            var body = utils.template.generateBodyFromRow(row);
            //utils.ajaxRequest(service, paramRequest, body);
        }
    };

    /**
     * Manage the event when user want to delete a row
     * @param e
     * @param service
     */
    Core.utils.template.eventButtonRemove = function (e, service) {
        var row = utils.template.getRowFromTarget(e.target);
        row.parentElement.removeChild(row);

        var id = e.target.id.split("&")[1];
        var paramRequest = "token=" + client.token + "&id=" + id;
        //utils.ajaxRequest(service, paramRequest, null);
    };

    /**
     * Generate template to display an article list
     * @param jsonHeaders
     * @param jsonValues
     * @param container
     * @param type
     */
    Core.utils.template.createArticleLiTemplate = function (jsonHeaders, jsonValues, container, type) {
        var div_table = document.createElement("div");
        div_table.classList.add("div_table");
        var lastKey = null;

        var createHeader = function () {
            var div_row_header = document.createElement("div");
            div_row_header.classList.add("div_row");

            var div_cell_header = document.createElement("div");
            div_cell_header.classList.add("div_cell");
            div_cell_header.classList.add("header_list");

            for (var h in jsonHeaders) {
                var clone = div_cell_header.cloneNode(true);

                if (jsonHeaders[h].content !== null && h !== "content")
                    clone.textContent = jsonHeaders[h].content;

                if (h === "id") {
                    if (type !== "create") {
                        div_row_header.appendChild(clone);
                    }
                } else {
                    div_row_header.appendChild(clone);
                }

                lastKey = h;
            }

            div_table.appendChild(div_row_header);
        }();
        var createBody = function () {
            var div_row = document.createElement("div");
            div_row.classList.add("div_row");

            var div_cell = document.createElement("div");
            div_cell.classList.add("div_cell");
            div_cell.classList.add("content_cell");

            var button = document.createElement("button");

            button.style.padding = "5px 10px 5px 10px";
            button.style.marginLeft = "10px";
            var button_span = document.createElement("span");

            var input = document.createElement("input");
            input.classList.add("input_update");

            if (jsonValues !== null) {
                for (var v in jsonValues) {
                    var clone_row = div_row.cloneNode(true);

                    for (var h in jsonHeaders) {
                        var clone = div_cell.cloneNode(true);
                        clone.style.backgroundColor = "white";
                        var clone_input = null;

                        if (h === "button") {
                            for (var b in jsonHeaders[h]) {
                                var clone_btn = button.cloneNode("true");
                                clone_btn.id = "article_button" + "&" + jsonValues[v].id;
                                clone_btn.className = jsonHeaders[h][b].btnClass;

                                var clone_span = button_span.cloneNode("true");

                                clone_span.className = jsonHeaders[h][b].icone;

                                clone_btn.appendChild(clone_span);
                                clone.appendChild(clone_btn);
                                clone.setAttribute("bodyKey", h);
                                jsonHeaders[h][b].func(clone_btn);
                            }
                        }
                        else if (h === "content") {
                            if (jsonValues[v][h] !== undefined) {
                                clone.textContent = jsonValues[v][h];

                                clone.style.display = "none";
                                clone.id = "article_content&" + jsonValues[v].id
                            }
                        } else if (h === "title") {
                            if (jsonValues[v][h] !== undefined) {
                                clone.textContent = jsonValues[v][h];
                                clone.id = "article_title&" + jsonValues[v].id
                            }
                        } else {
                            if (type === "update") {
                                clone_input = input.cloneNode("true");
                                clone_input.value = jsonValues[v][h];
                                clone_input.style.display = "none";

                                clone.setAttribute("bodyKey", h);
                                clone_input.setAttribute("bodyKey", h);
                            }

                            if (jsonValues[v][h] !== undefined)
                                clone.textContent = jsonValues[v][h];
                        }

                        if (h === lastKey)
                            clone.classList.add("last");

                        clone_row.appendChild(clone);

                        if (clone_input !== null) {
                            clone.appendChild(clone_input);
                        }

                    }

                    div_table.appendChild(clone_row);
                }
            }


            container.appendChild(div_table);
        }();
    };

    /**
     * Manage the button to update an article
     * @param e
     * @param service
     */
    Core.utils.template.eventArticleButtonUpdate = function (e, service) {
        var id;
        var title, content;

        var articleTitle = document.getElementById("title_article");
        var articleContent = document.getElementById("content_article");

        var row = utils.template.getRowFromTarget(e.target);

        if (e.target.classList.contains("btn-warning") || e.target.classList.contains("glyphicon-pencil")) {
            if (e.target.classList.contains("btn-warning")) {
                id = e.target.id.split("&")[1];
                e.target.classList.remove("btn-warning");
                e.target.classList.add("btn-success");

                e.target.firstElementChild.classList.remove("glyphicon-pencil");
                e.target.firstElementChild.classList.add("glyphicon-ok");
            } else {
                id = e.target.parentElement.id.split("&")[1];
                e.target.parentElement.classList.remove("btn-warning");
                e.target.parentElement.classList.add("btn-success");

                e.target.classList.remove("glyphicon-pencil");
                e.target.classList.add("glyphicon-ok");
            }

            title = document.getElementById("article_title&"+ id);
            content = document.getElementById("article_content&" + id);

            articleTitle.value = title.textContent;
            articleContent.value = content.textContent;
        } else {
            if (e.target.classList.contains("btn-success")) {
                id = e.target.id.split("&")[1];
                e.target.classList.remove("btn-success");
                e.target.classList.add("btn-warning");

                e.target.firstElementChild.classList.remove("glyphicon-ok");
                e.target.firstElementChild.classList.add("glyphicon-pencil");
            } else {
                id = e.target.parentElement.id.split("&")[1];
                e.target.parentElement.classList.remove("btn-success");
                e.target.parentElement.classList.add("btn-warning");

                e.target.classList.remove("glyphicon-ok");
                e.target.classList.add("glyphicon-pencil");
            }

            title = document.getElementById("article_title&"+ id);
            content = document.getElementById("article_content&" + id);

            title.textContent = articleTitle.value;
            content.textContent = articleContent.value;

            var paramRequest = "token=" + client.token + "&id=" + id;
            var body = {
                id: id,
                title: articleTitle.value,
                content: articleContent.value
            };

            articleTitle.value = "Titre";
            articleContent.value = "Contenu";
            utils.ajaxRequest(service, paramRequest, body);
        }
    };
})();
