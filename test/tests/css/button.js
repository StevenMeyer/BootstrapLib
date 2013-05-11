(function(Button, set) {
    test(set + ": Test creation from new", function() {
        var button1, button2, button3;
        
        button1 = new Button();
        button2 = new Button("input");
        button3 = new Button("a");
        
        ok(button1 instanceof jQuery && button2 instanceof jQuery && button3 instanceof jQuery, "Button object should be an instance of jQuery");
        ok(button1.hasClass("btn") && button2.hasClass("btn") && button3.hasClass("btn"), "Buttons should be of the btn class");
        ok(button1.is("button"), "Default button should be a <button> element");
        ok(button2.is("input") && button3.is("a"), "Button with tagname specified should have that tagname");
        ok(button1.attr("type") === "button" && button2.attr("type") === "button" && button3.attr("type") !== "button", "Default type attribute should be 'button'");
    });
    
    test(set + ": Test emphasis functions", function() {
        var button = new Button();
        
        // not using .hasClass() because we need to check that the other classes have gone away.
        equal(button.attr("class"), "btn", "Default class should be btn");
        button.primary();
        equal(button.attr("class"), "btn btn-primary", "Primary button should be of the btn-primary class");
        button.info();
        equal(button.attr("class"), "btn btn-info", "Info button should be of the btn-info class");
        button.success();
        equal(button.attr("class"), "btn btn-success", "Success button should be of the btn-success class");
        button.warning();
        equal(button.attr("class"), "btn btn-warning", "Warning button should be of the btn-warning class");
        button.danger();
        equal(button.attr("class"), "btn btn-danger", "Danger button should be of the btn-danger class");
        button.inverse();
        equal(button.attr("class"), "btn btn-inverse", "Inverse button should be of the btn-inverse class");
        button.link();
        equal(button.attr("class"), "btn btn-link", "Link button should be of the btn-link class");
        button.defaultStyle();
        equal(button.attr("class"), "btn", "Default button should be of the btn class");
    });
    
    test(set + ": Test button sizes", function() {
        var button = new Button();
        
        // not using .hasClass() because we need to check that the other classes have gone away.
        equal(button.attr("class"), "btn", "Default class should be btn");
        button.large();
        equal(button.attr("class"), "btn btn-large", "Large button should be of the btn-large class");
        button.small();
        equal(button.attr("class"), "btn btn-small", "Small button should be of the btn-small class");
        button.mini();
        equal(button.attr("class"), "btn btn-mini", "Mini button should be of the btn-mini class");
        button.defaultSize();
        equal(button.attr("class"), "btn", "Default button should be of the btn class");
    });
    
    test(set + ": Test disabling", function() {
        var button;
        
        button = Button.decorate($("<button>").add($("<input>")).add($("<a>")));
        
        // not using .hasClass() because we need to check that the other classes have gone away.
        ok(button.attr("class") === "btn" && button.attr("disabled") !== "disabled", "Default class should be btn");
        button.disable();
        equal(button.filter(function() {
            return $(this).hasClass("disabled");
        }).length, 3, "All elements should be of the disabled class");
        equal(button.filter(function() {
            return $(this).attr("disabled") === "disabled";
        }).length, 2, "Only <button> and <input> elements should have the 'disabled' attribute");
        button.enable();
        ok(button.attr("class") === "btn" && button.attr("disabled") !== "disabled", "After enabling the button, the class and attribute should have been removed");
    });
    
    test(set + ": Test setting text", function() {
        var buttons = Button.decorate($("<button>").add($("<input type='button'>")).add($("<a>"))),
            text = "Foo";
        
        buttons.text(text);
        equal(buttons.eq(0).text(), text, "Button element text should be set with .text()");
        equal(buttons.eq(1).text(), "", "Input element should not have text set with .text()");
        equal(buttons.eq(1).attr("value"), text, "Input element should have value set with .text()");
        equal(buttons.eq(2).text(), text, "Link element text should be set with .text()");
    });
    
    test(set + ": Test getting text", function() {
        var buttons = Button.decorate($("<button>Foo</button>").add($("<input type='button' value='Foo'>")).add($("<a>Foo</a>"))),
            text = "FooFooFoo";
        
        equal(buttons.text(), text, "Getting element text should get input value, too.");
    });
})(uk.co.stevenmeyer.Bootstrap.Css.Button, "Css.Button");