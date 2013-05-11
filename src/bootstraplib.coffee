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

$ = jQuery
baseNamespace = "uk.co.stevenmeyer.Bootstrap"
baseClass = class (namespace baseNamespace).Bootstrap extends $
  @decorate: () ->
    if arguments[0]?
      if arguments[1]?
        $item = if arguments[0] instanceof Object then arguments[0] else $ arguments[0]
        $.extend arguments[1], $item
        arguments[1]
      else
        arguments[0]
    else
      throw "Nothing to decorate"
  
  toString:() ->
    $("<p>").append(@clone()).html()

isDOMNode = (node) ->
  if typeof Node is "object"
    node instanceof Node
  else
    node? and typeof node is "object" and typeof node.nodeType is "number" and typeof node.nodeName is "string"
    
class (namespace "#{baseNamespace}.Css").Button extends baseClass
  constructor: (tagname = "button") ->
    Button.decorate $("<#{tagname}>"), this
    
  block: () -> @addClass "btn btn-block"
    
  danger: () -> @emphasize "danger"
  
  @decorate: ($item, $with = new Button()) ->
    super $item, $with
    
    $with.addClass "btn"
    #$with.attr "type", "button" if not $with.attr("type")? and ($with.is("button") or $with.is("input"))
    $with.size = () -> Button.prototype.size.apply this, arguments
    $with.text = () -> Button.prototype.text.apply this, arguments
    $with.map () ->
      $this = $ this
      $this.attr "type", "button" if not $this.attr("type")? and ($this.is("button") or $this.is("input"))
    $with
    
  defaultSize: () -> @size ""
    
  defaultStyle: () -> @emphasize ""
  
  disable: () ->
    @addClass "btn disabled"
    @map () ->
      $this = $ this
      $this.attr "disabled", "disabled" if $this.is("button") or $this.is("input")
    this
  
  emphasize: (emphasis = "") ->
    classes = ["btn-primary", "btn-info", "btn-success", "btn-warning", "btn-danger", "btn-inverse", "btn-link"]
    exclusiveStyle.call this, emphasis, classes
    
  enable: () ->
    @addClass("btn").removeClass("disabled").removeAttr("disabled")
    
  exclusiveStyle = (style = "", classes) ->
    @addClass("btn").removeClass classes.join " "
    style = "btn-#{style}"
    if style in classes then @addClass style else this
  
  info: () -> @emphasize "info"
  
  inverse: () -> @emphasize "inverse"
  
  large: () -> @size "large"
  
  link: () -> @emphasize "link"
  
  mini: () -> @size "mini"
  
  primary: () -> @emphasize "primary"
  
  size: () ->
    if arguments[0]?
      classes = ["btn-large", "btn-small", "btn-mini"]
      exclusiveStyle.call this, arguments[0], classes
    else
      @length # original, deprecated jQuery size() function
      
  small: () -> @size "small"
  
  success: () -> @emphasize "success"
  
  text: (text) ->
    if text?
      @map (index, domElement) =>
        $this = $ domElement
        theText = if typeof text is "function" then theText = text.call this, index, domElement.innerText else text
        console.log domElement.tagName
        if domElement.tagName.toLowerCase() is "input"
          $this.attr "value", theText
        else
          $.fn.text.call $this, theText
      this
    else
      returnValue = ""
      @each (index, element) =>
        $this = $ element
        if element.tagName.toLowerCase() is "input"
          returnValue += $this.attr "value"
        else
          returnValue += $this.text()
      returnValue
  
  warning: () -> @emphasize "warning"

class (namespace "#{baseNamespace}.Css").Code extends baseClass
  constructor: (block) ->
    tagName = if block then "<pre>" else "<code>"
    Code.decorate $(tagName), this
    
  append: () ->
    for arg of arguments
      if typeof arguments[arg] is "string"
        $.fn.append.call this, document.createTextNode arguments[arg]
      else if arguments[arg] instanceof $
        $.fn.append.call this, document.createTextNode $("<p>").append(arguments[arg].clone()).html()
      else if arguments[arg] instanceof Array
        Code.prototype.append.apply this, arguments[arg]
      else if typeof arguments[arg] is "function"
        Code.prototype.append.call this, arguments[arg].call this, 0, @html()
      else if isDOMNode arguments[arg]
        switch arguments[arg].nodeType
          when 1, 9, 11
            $.fn.append.call this, document.createTextNode $("<p>").append(arguments[arg]).html()
          when 3 then $.fn.append.call this, arguments[arg]
    this
    
  appendHtml: () ->
    $.fn.append.apply this, arguments
  
  @decorate: ($item, $with = new Code()) ->
    $with = super $item, $with
    
    $with.append = () -> Code.prototype.append.apply this, arguments
    $with.prepend = () -> Code.prototype.prepend.apply this, arguments
    $with
    
  isBlock: () -> @is "pre"
  
  isInline: () -> @is "block"
    
  prepend: () ->
    for arg of arguments
      if typeof arguments[arg] is "string"
        $.fn.prepend.call this, document.createTextNode arguments[arg]
      else if arguments[arg] instanceof $
        $.fn.prepend.call this, document.createTextNode $("<p>").append(arguments[arg].clone()).html()
      else if arguments[arg] instanceof Array
        Code.prototype.prepend.apply this, arguments[arg]
      else if typeof arguments[arg] is "function"
        Code.prototype.prepend.call this, arguments[arg].call this, 0, @html()
      else if isDOMNode arguments[arg]
        switch arguments[arg].nodeType
          when 1, 9, 11
            $.fn.prepend.call this, document.createTextNode $("<p>").append(arguments[arg]).html()
          when 3 then $.fn.prepend.call this, arguments[arg]
    this
    
  prependHtml: () ->
    $.fn.prepend.apply this, arguments
    
  scrollable: () ->
    @addClass "pre-scrollable" if @isBlock()
