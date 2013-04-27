(function(Code, set) {
    test(set + ": Test inline code snippet creation", function() {
        var code = new Code();
        ok(code instanceof jQuery, "Code object should be an instance of jQuery");
        ok(code.is("code"), "Code should be a <code> element");
    });

    test(set + ": Test append", function() {
        var code = new Code(),
            htmlString = "<p>A sample paragraph</p>",
            element = document.createElement("p"),
            jQueryObj = $("<p>A sample paragraph</p>");

        element.appendChild(document.createTextNode("A sample paragraph"));

        code.append(htmlString); //single htmlString
        equal(code.text(), htmlString, "Adding a single htmlString should escape the HTML");

        code.empty().append(element); //single Element
        equal(code.text(), htmlString, "Adding a single Element should escape the HTML");

        code.empty().append(jQueryObj); //single jQuery object
        equal(code.text(), htmlString, "Adding a single jQuery object should escape the HTML");

        code.empty().append([htmlString, element, jQueryObj]); //single Array
        equal(code.text(), htmlString + htmlString + htmlString, "Adding an Array should add all of the parts with escaped HTML");

        code.empty().append(htmlString, element, jQueryObj); //bunch o' stuff
        equal(code.text(), htmlString + htmlString + htmlString, "Adding a list of arguments should add all of the parts with escaped HTML");

        code.empty().append(function() { return [htmlString, element, jQueryObj]}); //function
        equal(code.text(), htmlString + htmlString + htmlString, "Adding a function should add all of the parts with escaped HTML");
    });

    test(set + ": Test prepend", function() {
        var code = new Code(),
            htmlString = "<p>A sample paragraph</p>",
            element = document.createElement("p"),
            jQueryObj = $("<p>A sample paragraph</p>");

        element.appendChild(document.createTextNode("A sample paragraph"));

        code.prepend(htmlString); //single htmlString
        equal(code.text(), htmlString, "Adding a single htmlString should escape the HTML");

        code.empty().prepend(element); //single Element
        equal(code.text(), htmlString, "Adding a single Element should escape the HTML");

        code.empty().prepend(jQueryObj); //single jQuery object
        equal(code.text(), htmlString, "Adding a single jQuery object should escape the HTML");

        code.empty().prepend([htmlString, element, jQueryObj]); //single Array
        equal(code.text(), htmlString + htmlString + htmlString, "Adding an Array should add all of the parts with escaped HTML");

        code.empty().prepend(htmlString, element, jQueryObj); //bunch o' stuff
        equal(code.text(), htmlString + htmlString + htmlString, "Adding a list of arguments should add all of the parts with escaped HTML");

        code.empty().prepend(function() { return [htmlString, element, jQueryObj]}); //function
        equal(code.text(), htmlString + htmlString + htmlString, "Adding a function should add all of the parts with escaped HTML");
    });

    test(set + ": Test code block", function() {
        var code = new Code("block");

        ok(code.is("pre"), "Code should be a <pre> element");
    });

    test(set + ": Test code block scrollable", function() {
        var code = new Code("block");

        code.scrollable();
        ok(code.hasClass("pre-scrollable"), "Code should be of the pre-scrollable class");
    });

    test(set + ": Test decorate jQuery object", function() {
        var code = Code.decorate($("<code>"));

        ok(code instanceof jQuery, "Code should be a jQuery instance");
        ok(code instanceof Code, "Code should be a Code instance")
    });
})(uk.co.stevenmeyer.Bootstrap.Css.Code, "Css.Code");