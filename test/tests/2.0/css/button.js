(function(Button, set) {
    set += ": ";
    test(set + "Test btn class added", function() {
        var $elements;
        $elements = new Button($("<a>").add("<button>").add("<input>"));
        
        ok($elements.hasClass("btn"), "Buttons should be of the btn class");
    });
    
    test(set + "Test button creation, no arguments", function() {
        var button = new Button();
        
        ok(button.hasClass("btn"), "Button should be of the btn class");
        ok(button.is("button"), "Button should be a <button> element");
        equal(button.attr("type"), "button", "Type attribute should be 'button'");
    });
    
    test(set + "Test default buttons", function() {
        var button = new Button();
        
        button.primary();
        equal(button.attr("class"), "btn " + button.options.PRIMARY, "Primary style button should be of the btn and '" + button.options.PRIMARY + "' classes only");
        
        button.info();
        equal(button.attr("class"), "btn " + button.options.INFO, "Info style button should be of the btn and '" + button.options.INFO + "' classes only");
        
        button.success();
        equal(button.attr("class"), "btn " + button.options.SUCCESS, "Success style button should be of the btn and '" + button.options.SUCCESS + "' classes only");
        
        button.warning();
        equal(button.attr("class"), "btn " + button.options.WARNING, "Warning style button should be of the btn and '" + button.options.WARNING + "' classes only");
        
        button.danger();
        equal(button.attr("class"), "btn " + button.options.DANGER, "Danger style button should be of the btn and '" + button.options.DANGER + "' classes only");
        
        button.link();
        equal(button.attr("class"), "btn " + button.options.LINK, "Link style button should be of the btn and '" + button.options.LINK + "' classes only");
        
        button.defaultStyle();
        equal(button.attr("class"), "btn", "Default button should be of the btn class only");
    });
    
    test(set+ "Test button sizes", function() {
        var button = new Button();
        
        button.large();
        equal(button.attr("class"), "btn " + button.sizes.LARGE, "Large button should be of the btn and '" + button.sizes.LARGE + "' classes only");
        
        button.defaultSize();
        equal(button.attr("class"), "btn", "Default button should be of the btn class only");
        
        button.small();
        equal(button.attr("class"), "btn " + button.sizes.SMALL, "Small button should be of the btn and '" + button.sizes.SMALL + "' classes only");
        
        button.extraSmall();
        equal(button.attr("class"), "btn " + button.sizes.EXTRASMALL, "Extra small button should be of the btn and '" + button.sizes.EXTRASMALL + "' classes only");
    });
    
    test(set + "Test block-level button", function () {
        var button = new Button();
        
        button.block();
        equal(button.attr("class"), "btn " + button.BLOCK, "Block level button should be of the btn and '" + button.BLOCK + "' classes only");
    });
    
    test(set + "Test disable <button> and <input> elements", function() {
        var buttons, hasClass;
                
        buttons = new Button($("<button>").add("<input>"));
        hasClass = false;
        buttons.disable();
        equal(buttons.attr("disabled"), "disabled", "Disabled elements should have the disabled attribute value of 'disabled'");
        buttons.map(function() {
            hasClass = hasClass || $(this).hasClass(Button.prototype.DISABLED);
        });
        equal(hasClass, false, "Elements should not be of the '" + Button.prototype.DISABLED + "' class");
    });
    
    test(set + "Test disable <a> element", function() {
        var button = new Button("<a>");
        
        button.disable();
        ok(button.attr("disabled") === undefined, "Disabled anchor elements should not have the disabled attribute");
        ok(button.hasClass(button.DISABLED), "Disabled anchor elements should be of the '" + button.DISABLED + "' class");
    });
    
    test(set + "Test set text", function() {
        var anotherButton, buttons, functionExpectedValue, oldText, text;
        
        oldText = "Hello, tester!";
        text = "Hello, world!";
        buttons = new Button(
            $("<button>")
                .add("<input type='button'>")
                .add("<input type='submit'>")
                .add("<input type='reset'>")
                .add("<input type='text'>")); //not a real button
        anotherButton = new Button("<button>" + oldText + "</button>");
    
        buttons.text(text);
        //.eq() returns a jQuery object, so no worries about the Button.prototype.text() calls, here!
        equal(buttons.eq(0).text(), text, "<button> element should have text() set to " + text);
        equal(buttons.eq(0).attr("value"), undefined, "<button> element should not have the value attribute set");
        equal(buttons.eq(1).text(), "", "<input> button element should have text() set to an empty string");
        equal(buttons.eq(1).attr("value"), text, "<input> button element should have the value attribute set to " + text);
        equal(buttons.eq(2).text(), "", "<input> submit element should have text() set to an empty string");
        equal(buttons.eq(2).attr("value"), text, "<input> submit element should have the value attribute set to " + text);
        equal(buttons.eq(3).text(), "", "<input> reset element should have text() set to an empty string");
        equal(buttons.eq(3).attr("value"), text, "<input> reset element should have the value attribute set to " + text);
        equal(buttons.eq(4).text(), text, "<input> text (not a button) element should have text() set to " + text);
        equal(buttons.eq(4).attr("value"), undefined, "<input> text (not a button) element should not have the value attribute set");
        
        anotherButton.text(function(index, old) {
            return "" + text + "-" + index + "-" + old;
        });
        functionExpectedValue = "" + text + "-0-" + oldText;
        equal($.fn.text.apply(anotherButton, []), functionExpectedValue, "Setting text with this function should return '" + functionExpectedValue + "' for text()");
    });
    
    test(set + "Test get text", function() {
        var buttons, text;
        
        text = "Hello, world, again!";
        buttons = {
            button: new Button("<button>" + text + "</button>"),
            input: {
                button: new Button("<input type='button' value='" + text + "'>"),
                submit: new Button("<input type='submit' value='" + text + "'>"),
                reset: new Button("<input type='reset' value='" + text + "'>"),
                notAButton: new Button("<input type='text' value='" + text + "'>")
            },
            anchor: new Button("<a>" + text + "</a>")
        };
        
        equal(buttons.button.text(), text, "<button> element should have text() return '" + text + "'");
        equal(buttons.input.button.text(), text, "<input> button element should have text() return '" + text + "'");
        equal(buttons.input.submit.text(), text, "<input> submit element should have text() return '" + text + "'");
        equal(buttons.input.reset.text(), text, "<input> reset element should have text() return '" + text + "'");
        equal(buttons.input.notAButton.text(), "", "<input> text (not a button) element should have text() return an empty string");
        equal(buttons.anchor.text(), text, "<a> element should have text() return '" + text + "'");
    });
})(uk.co.stevenmeyer.bootstrap.css.Button, "css.Button");