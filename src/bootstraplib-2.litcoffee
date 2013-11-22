# BootstrapLib
Scriptable Twitter Bootstrap widgets and component creation.

This source file is [literate CoffeeScript](http://coffeescript.org/#literate).
It is valid Markdown and valid CoffeeScript, producing source code which is both
readable (the markdown can be rendered) and executable.

Objects created from the classes herein are jQuery objects with some added
functionality. Unlike a jQuery plugin, this library does not alter jQuery.
The extra and changed functionality is added to the objects, rather than the
jQuery object itself, just as one would expect in an object-oriented language.

These classes add useful features to hopefully make repetitive or inconsistent
tasks simpler.

For example, to change the appearance of a button in jQuery:
```
$("#myButton").removeClass("btn-primary").addClass("btn-success");
```

The same operation with a BootstrapLib object
```
Button("#myButton").success();
```
While this may not seem like much, the BootstrapLib function does not need to
know which classes to remove; it will sort this out for you. This is useful when
you cannot know the current state of the button.

* [Namespace](#namespace)
* [Utility Functions](#utility-functions)
* [Library Variables](#library-variables)
* [Classes](#classes)
  * [Base Class](#base-class)
  * [CSS Components](#css-components)
    * [Buttons](#buttons)
    * [Code](#code)

# NAMESPACE
The objects in this library make use of namespaces to avoid conflicts.

This library uses [namespace.coffee](http://github.com/CodeCatalyst/namespace.coffee)
v1.0.1 by [CodeCatalyst, LLC](http://www.codecatalyst.com/). Namespace.coffee is
open source and licensed under the [MIT licence](http://en.wikipedia.org/wiki/MIT_License).

Namespace is a lean namespace implementation for JavaScript written in
[CoffeeScript](http://coffeescript.com/).

    window.namespace or= ( name, values ) ->
        target = exports ? window
        if name.length > 0
            target = target[ subpackage ] ||= {} for subpackage in name.split( '.' ) 
        target[ key ] = value for key, value of values
        return target

    namespace( '', namespace: namespace )
    
# UTILITY FUNCTIONS
These functions are used internally.

This function returns true if the node is a DOM Node object

    isDOMNode = (node) ->
        if typeof Node is "object"
            node instanceof Node
        else
            node? and typeof node is "object" and typeof node.nodeType is "number" and typeof node.nodeName is "string"

This function retrieves the CSS value for a given key even for elements which
are not part of the DOM.

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
        
# LIBRARY VARIABLES
These variables tie jQuery to the $ symbol and set the namespace "packages"
    
    $ = jQuery
    baseNamespace = "uk.co.stevenmeyer.bootstrap"
    cssNamespace = "#{baseNamespace}.css"
    
# CLASSES
These classes are available to assist in building elements for use with Twitter
Bootstrap

* [Base Class](#base-class)
* [CSS Components](#css-components)
  * [Buttons](#buttons)
  * [Code](#code)

## Base Class
This probably will not be useful on its own and should be thought of as an abstract
class.

It overrides the `toString` method to return the HTML of the element(s) including
the outermost tags.

The constructor allows objects to be created using the jQuery syntax. Arguments
which would be used with $() to create jQuery objects can be used to create
BootstrapLib objects.

    baseClass = class (namespace baseNamespace).Bootstrap extends $
        constructor: () ->
            $jQuery = $.apply this, arguments
            $.extend this, $jQuery
            this

        toString: () ->
            $("<p />").append(@clone()).html()
        
## CSS Components
These are elements which are listed on the CSS section of the Bootstrap documentation.

* [Buttons](#buttons)
* [Code](#code)

### Buttons ###
===============
Clickable things.

    class (namespace cssNamespace).Button extends baseClass

#### Static members
These members are Bootstrap classes used to change the appearance of the buttons.

        BLOCK: "btn-block"
        DISABLED: "disabled"

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

However, these are the type attribute values for those `<input>` elements which
appear as buttons.
            
        inputButtonTypes:
            BUTTON: "button"
            RESET: "reset"
            SUBMIT: "submit"
            toArray: () ->
                Button::inputButtonTypes[type] for type of Button::inputButtonTypes when type isnt "toArray"
                
#### Constructor
If no arguments are given, then a `<button>` element is created. The `btn` class
is also added to all elements.
    
        constructor: () ->
            args = Array::slice.call arguments
            if not args[0]?
                args[0] = "<button />"
                args[1] =
                    type: "button"
            Button.__super__.constructor.apply this, args
            @size = () => Button::size.apply this, arguments
            @text = () => Button::text.apply this, arguments
            @addClass "btn"
            
#### Options 
These methods quickly change the style of the button. They will unset any classes
which are mutually exclusive.
        
        danger: () ->
            @option Button::options.DANGER

        defaultStyle: () ->
            @option()

        info: () ->
            @option Button::options.INFO

        link: () ->
            @option Button::options.LINK

        primary: () ->
            @option Button::options.PRIMARY

        success: () ->
            @option Button::options.SUCCESS

        warning: () ->
            @option Button::options.WARNING
            
The `option` method links these methods to the
`exclusiveClass` [utility method](#button-utility-methods).
        
        option: (emphasis = "") ->
            exclusiveClass.call this, emphasis, Button::options.toArray()
            
#### Sizes
These methods quickly change the size of the button. They will unset any classes
which are mutually exclusive.
        
        defaultSize: () ->
            @size Button::sizes.DEFAULT

        extraSmall: () ->
            @size Button::sizes.EXTRASMALL

        large: () ->
            @size Button::sizes.LARGE

        small: () ->
            @size Button::sizes.SMALL
            
The `size` method links these methods to the
`exclusiveClass` [utility method](#button-utility-methods).
        
        size: () ->
            if arguments[0]?
                exclusiveClass.call this, arguments[0], Button::sizes.toArray()
            else
                @length # original, deprecated jQuery size() function
                
Block-level buttons can be created using the `block` method. Passing `false`
(strict) will remove the class.

        block: (block = true) ->
            if block is false
                @removeClass Button::BLOCK
            else
                @addClass Button::BLOCK
                
#### Disabled state
Anchors, buttons and input buttons are disabled in different ways. This method
unifies those ways.
        
        disable: () ->
            @each (index, DOMElement) ->
                $element = $ DOMElement
                $element.attr "disabled", "disabled" if not $element.is "a"
                $element.addClass Button::DISABLED if not $element.is "button,input"
                
#### Element text
The jQuery `text()` method gets or sets only the text between the opening and
closing tags. `<input>` buttons get their button text from the `value` attribute.
This method ensures that text() has the same effect with regards to the visible
text in the button.
        
        text: () ->
            if arguments[0]?
                setText.apply this, arguments
            else
                getText.apply this, arguments
            
The work is delegated to the [utility methods](#button-utility-methods) `getText`
and `setText`.
                
#### Button utility methods
These functions are not accessible outside of the class.

##### exclusiveClass()
This function is used to simulate mutually exclusive classes. It will remove all
classes in the `classes` array and add the class in `style`.
        
        exclusiveClass = (style = "", classes) ->
            @removeClass classes.join " "
            if style in classes then @addClass style else this
        
##### getText()        
This function gets the text from all matching elements, but uses the buttons
visible text as the value. This may come from the child text node or from the
value attribute, depending on the element. The initial `@is()` check avoids the
overhead added by this method if there are no input elements.
        
        getText = () ->
            if @is "input"
                types = Button::inputButtonTypes.toArray()
                @map (index, DOMElement) ->
                    $element = $ DOMElement
                    if ($element.is "input") and ($element.attr "type") in types
                        $element.val()
                    else
                        $element.text()
                .get().join()
            else
                $.fn.text.apply this, []
        
##### setText()
This function sets the text of all matching elements, but uses the buttons
visible text as the destination. This may be the child text node or the
value attribute, depending on the element. The initial `@is()` check avoids the
overhead added by this method if there are no input elements.
        
        setText = (text) ->
            if @is "input"
                types = Button::inputButtonTypes.toArray()
                @each (index, DOMElement) ->
                    $element = $ DOMElement
                    # cannot just have $element.val(text), here:
                    # if text were a function, then this @each loop would cause
                    # such a function to have an index value of 0 on every execution
                    # because $element is just one item (instead of all of the items
                    # in 'this').
                    value = if typeof text is "function" then text.call DOMElement, index, $element.text() else text
                    if ($element.is "input") and ($element.attr "type") in types
                        $element.val value
                    else
                        $element.text value
            else
                $.fn.text.call this, text
        
### Code ###
============
Display code in an element.

This object is designed to display every appended (or prepended) item as plain
text. Adding HTML elements to it should display all of the HTML including the
outer tags, for example.

    class (namespace cssNamespace).Code extends baseClass
    
#### Constructor
If no arguments are given, then a `<code>` element is created.

        constructor: () ->
            args = Array::slice.call arguments
            if not args[0]?
                args[0] = $ "<code />"
            Code.__super__.constructor.apply this, args

            @append = () => Code::append.apply this, arguments
            @prepend = () => Code::prepend.apply this, arguments
            this
            
#### DOM Insertion, Inside
Inserting inside the element should always behave as if inserting text nodes.
The `append()` and `prepend()` functions should not insert HTML.
                
        append: () ->
            args = Array::slice.call arguments
            addItem.call this, "append", args

        prepend: () ->
            args = Array::slice.call arguments
            addItem.call this, "prepend", args
            
The `append()` and `prepend()` functions call the `addItem()` private method.
This method tries to turn the arguments into suitable text nodes. The odd one out
is in trying to add jQuery objects. These should have their contents added as text,
including their outermost tags.
        
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
            
Methods to allow the use of the original, jQuery insertion methods:
        
        appendHTML: () ->
            $.fn.append.apply this, arguments

        prependHTML: () ->
            $.fn.append.apply this, arguments
            
#### Code style
Inline code should be `<code>` elements and block-level code should be `<pre>`
elements. This class should work with anything, though, so it is desirable to
find out the display-level of the element. It is a bit heavy, and is only used
to determine whether to allow the `pre-scrollable` class to be added.
        
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
                
#### Scrollable
It is possible to add the `pre-scrollable` class to `<pre>` elements to set a
max-height and add a vertical scroll bar. This method should add it and allow it
to be removed by passing `false` as an argument.
        
        scrollable: (scroll) ->
            className = "pre-scrollable"
            if scroll is false
                @removeClass className
            else if @isBlock()
                @addClass className
            this
        
#### Block code element
A short-hand way to create a Code object which is pre-set to be a `<pre>` element.


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
    
#### Inline code element
A short-hand way to create a Code object which is pre-set to be a `<code>` element.

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