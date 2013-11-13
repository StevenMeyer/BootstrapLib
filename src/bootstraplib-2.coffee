###
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: bootstrap.coffee
 * Description: Scriptable Twitter Bootstrap widgets and component creation.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
###


# [namespace.coffee](http://github.com/CodeCatalyst/namespace.coffee) v1.0.1
# Copyright (c) 2011-2012 [CodeCatalyst, LLC](http://www.codecatalyst.com/).
# Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).

# A lean namespace implementation for JavaScript written in [CoffeeScript](http://coffeescript.com/).

# *Export the specified value(s) to the specified package name.*
window.namespace or= ( name, values ) ->
	# Export to `exports` for node.js or `window` for the browser.
	target = exports ? window
	# Nested packages may be specified using dot-notation, and are automatically created as needed.
	if name.length > 0
		target = target[ subpackage ] ||= {} for subpackage in name.split( '.' ) 
	# Export each value in the specified values Object to the specified package name by the value's key.
	target[ key ] = value for key, value of values
	# Return a reference to the specified namespace.
	return target

# *Export the namespace function to global scope, using itself.*
namespace( '', namespace: namespace )

isDOMNode = (node) ->
    if typeof Node is "object"
        node instanceof Node
    else
        node? and typeof node is "object" and typeof node.nodeType is "number" and typeof node.nodeName is "string"
        
getRenderedCSS = (element, key) ->
    if element not instanceof jQuery
        element = jQuery element
    if element.length isnt 0
        value = element.css key
        if value is ""
            # element hasn't been added to DOM and has no style set
            $body = $ "body"
            $temp = element.clone()
            $body.append $temp
            value = $temp.css key
            $temp.remove()
    value
    
$ = jQuery
baseNamespace = "uk.co.stevenmeyer.bootstrap"
cssNamespace = "#{baseNamespace}.css"

baseClass = class (namespace baseNamespace).Bootstrap extends $
    constructor: () ->
        $jQuery = $.apply this, arguments
        $.extend this, $jQuery
        this
        
    toString: () ->
        $("<p />").append(@clone()).html()
        
#no dependencies
class (namespace cssNamespace).Button extends baseClass
    BLOCK: "btn-block"

    options:
        DANGER:  "btn-danger"
        DEFAULT: ""
        INFO:    "btn-info"
        LINK:    "btn-link"
        PRIMARY: "btn-primary"
        SUCCESS: "btn-success"
        WARNING: "btn-warning"
        toArray: () ->
            Button::options[style] for style of Button::options when style isnt "toArray"
            
    sizes:
        DEFAULT: ""
        EXTRASMALL: "btn-xs"
        LARGE: "btn-lg"
        SMALL: "btn-sm"
        toArray: () ->
            Button::sizes[size] for size of Button::sizes when size isnt "toArray"
    
    constructor: () ->
        args = Array::slice.call arguments
        if not args[0]?
            args[0] = "<button />"
            args[1] =
                type: "button"
        Button.__super__.constructor.apply this, args
        @size = () => Button::size.apply this, arguments
        @addClass "btn"
        
    block: (block = true) ->
        if block is false
            @removeClass Button::BLOCK
        else
            @addClass Button::BLOCK
        
    danger: () ->
        @option Button::options.DANGER
        
    defaultSize: () ->
        @size Button::sizes.DEFAULT
        
    defaultStyle: () ->
        @option()
        
    exclusiveClass = (style = "", classes) ->
        @removeClass classes.join " "
        if style in classes then @addClass style else this
        
    extraSmall: () ->
        @size Button::sizes.EXTRASMALL
        
    info: () ->
        @option Button::options.INFO
        
    large: () ->
        @size Button::sizes.LARGE
        
    link: () ->
        @option Button::options.LINK
        
    option: (emphasis = "") ->
        exclusiveClass.call this, emphasis, Button::options.toArray()
        
    primary: () ->
        @option Button::options.PRIMARY
        
    size: () ->
        if arguments[0]?
            exclusiveClass.call this, arguments[0], Button::sizes.toArray()
        else
            @length # original, deprecated jQuery size() function
            
    small: () ->
        @size Button::sizes.SMALL
        
    success: () ->
        @option Button::options.SUCCESS
        
    warning: () ->
        @option Button::options.WARNING
        
#no dependencies
class (namespace cssNamespace).Code extends baseClass
    constructor: () ->
        args = Array::slice.call arguments
        if not args[0]?
            args[0] = $ "<code />"
        Code.__super__.constructor.apply this, args
        
        @append = () => Code::append.apply this, arguments
        @prepend = () => Code::prepend.apply this, arguments
        this
        
    addItem = (op, items) ->
        lastTry = (item) =>
            $item = $ item
            if $item
                $.fn[op].call this, document.createTextNode $("<p />").append($item.clone()).html()
            else
                $.fn[op].call this, document.createTextNode "#{$item}"
        for arg of items
            if typeof items[arg] is "string"
                $.fn[op].call this, document.createTextNode items[arg]
            else if items[arg] instanceof $
                $.fn[op].call this, document.createTextNode $("<p>").append(items[arg].clone()).html()
            else if items[arg] instanceof Array
                Code::[op].apply this, items[arg]
            else if typeof items[arg] is "function"
                Code::[op].call this, items[arg].call this, 0, @html()
            else if isDOMNode items[arg]
                switch items[arg].nodeType
                    when 1, 9, 11
                        $.fn[op].call this, document.createTextNode $("<p>").append(items[arg]).html()
                    when 3 then $.fn[op].call this, items[arg]
                    else lastTry items[arg]
            else
                lastTry items[arg]
        this
                
    append: () ->
        args = Array::slice.call arguments
        addItem.call this, "append", args
        
    appendHTML: () ->
        $.fn.append.apply this, arguments
        
    isBlock: () ->
        display = getRenderedCSS this, "display"
        switch display
            when "block", "inline-block", "list-item", "table", "table-caption", "table-row"
                true
            else false
    
    isInline: () ->
        display = getRenderedCSS this, "display"
        switch display
            when "inline", "inline-table", "table-cell", "table-column"
                true
            else false
        
    prepend: () ->
        args = Array::slice.call arguments
        addItem.call this, "prepend", args
        
    prependHTML: () ->
        $.fn.append.apply this, arguments
        
    scrollable: (scroll) ->
        className = "pre-scrollable"
        if scroll is false
            @removeClass className
        else if @isBlock()
            @addClass className
        this
        
class (namespace cssNamespace).Code.BlockCode extends (namespace cssNamespace).Code
    constructor: () ->
        args = Array::slice.call arguments
        $element = $ "<pre />"
        if args[0]?
            if isDOMNode(args[0]) or typeof args[0] is "string" or args[0] instanceof $
                args[0] = $element
            else
                args = args.unshift $element
        else
            args[0] = $element
        BlockCode.__super__.constructor.apply this, args
        this
        
class (namespace cssNamespace).Code.InlineCode extends (namespace cssNamespace).Code
    constructor: () ->
        args = Array::slice.call arguments
        $element = $ "<code />"
        if args[0]?
            if isDOMNode(args[0]) or typeof args[0] is "string" or args[0] instanceof $
                args[0] = $element
            else
                args = args.unshift $element
        else
            args[0] = $element
        InlineCode.__super__.constructor.apply this, args
        this