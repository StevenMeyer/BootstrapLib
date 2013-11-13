(function(Button, set) {
    set += ": ";
    test(set + "Test btn class added", function() {
        var $elements;
        $elements = new Button("<a>");
        $elements.add(new Button("<button>")).add(new Button("<input>"));
        
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
})(uk.co.stevenmeyer.bootstrap.css.Button, "css.Button");