(function(Code, set) {
    set += ": ";
    test(set + "Test inline code snippet creation, no arguments", function() {
        var code = new Code();
        ok(code instanceof jQuery, "Code object should be an instance of jQuery");
        ok(code.is("code"), "Code should be a <code> element");
    });
    
    test(set + "Test inline code snippet creation, with jQuery element", function() {
        var code = new Code($("<code />"));
        ok(code instanceof jQuery, "Code object should be an instance of jQuery");
        ok(code.is("code"), "Code should be a <code> element");
    });
    
    test(set + "Test inline code snippet creation, with string", function() {
        var code = new Code("<code />");
        ok(code instanceof jQuery, "Code object should be an instance of jQuery");
        ok(code.is("code"), "Code should be a <code> element");
    });
    
    test(set + "Test block code snippet creation, with jQuery element", function() {
        var code = new Code($("<pre />"));
        ok(code instanceof jQuery, "Code object should be an instance of jQuery");
        ok(code.is("pre"), "Code should be a <pre> element");
    });
    
    test(set + "Test block code snippet creation, with string", function() {
        var code = new Code("<pre />");
        ok(code instanceof jQuery, "Code object should be an instance of jQuery");
        ok(code.is("pre"), "Code should be a <pre> element");
    });
    
    test(set + "Test append", function() {
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
        equal(code.text(), "" + htmlString + htmlString + htmlString, "Adding an Array should add all of the parts with escaped HTML");

        code.empty().append(htmlString, element, jQueryObj); //bunch o' stuff
        equal(code.text(), "" + htmlString + htmlString + htmlString, "Adding a list of arguments should add all of the parts with escaped HTML");

        code.empty().append(function() { return [htmlString, element, jQueryObj]; }); //function
        equal(code.text(), "" + htmlString + htmlString + htmlString, "Adding a function should add all of the parts with escaped HTML");
    });

    test(set + "Test prepend", function() {
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
        equal(code.text(), "" + htmlString + htmlString + htmlString, "Adding an Array should add all of the parts with escaped HTML");

        code.empty().prepend(htmlString, element, jQueryObj); //bunch o' stuff
        equal(code.text(), "" + htmlString + htmlString + htmlString, "Adding a list of arguments should add all of the parts with escaped HTML");

        code.empty().prepend(function() { return [htmlString, element, jQueryObj]; }); //function
        equal(code.text(), "" + htmlString + htmlString + htmlString, "Adding a function should add all of the parts with escaped HTML");
    });
    
    test(set + "Test code block scrollable", function() {
        var code = new Code("<pre />");

        code.scrollable();
        ok(code.hasClass("pre-scrollable"), "Code should be of the pre-scrollable class");
    });
    
    test (set + "Test isBlock", function() {
        var codePre, codeCss;
        codePre = new Code("<pre />");
        codeCss = new Code($("<span>").css("display", "block"));
        
        ok(codePre.isBlock(), "Block-level element should return true");
        ok(codeCss.isBlock(), "Inline element with block display CSS should return true");
        ok(!codePre.isInline(), "Block-level element should not be inline");
        ok(!codeCss.isInline(), "Inline element with block display CSS should not be inline");
    });
    
    test(set + "Test isInline", function() {
        var code, codeCss;
        code = new Code("<code />");
        codeCss = new Code($("<div>").css("display", "inline"));
        
        ok(code.isInline(), "Inline element should return true");
        ok(codeCss.isInline(), "Block-level element with inline display CSS should return true");
        ok(!code.isBlock(), "Inline element should not be block-level");
        ok(!codeCss.isBlock(), "Block-level element with inline display CSS should not be inline");
    });
    
    test(set + "Test BlockCode", function () {
        var code = new Code.BlockCode();
        ok(code.is("pre"), "BlockCode should be a <pre> element");
    });
    
    test(set + "Test InlineCode", function () {
        var code = new Code.InlineCode();
        ok(code.is("code"), "InlineCode should be a <code> element");
    });
})(uk.co.stevenmeyer.bootstrap.css.Code, "css.Code");