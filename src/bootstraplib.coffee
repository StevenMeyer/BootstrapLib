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

isDOMNode = (node) ->
  if typeof Node is "object"
    node instanceof Node
  else
    node? and typeof node is "object" and typeof node.nodeType is "number" and typeof node.nodeName is "string"
    
appendFn = (element) ->
  @appendChild element if @nodeType is 1 or @nodeType is 11 or @nodeType is 9
  
prependFn = (element) ->
  @insertBefore(element, this) is @nodeType is 1 or @nodeType is 11 or @nodeType is 9

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
    if $item not instanceof Object then $item = $ $item
    $.extend $with, $item
    $with.append = () -> Code.prototype.append.apply this, arguments
    $with.prepend = () -> Code.prototype.prepend.apply this, arguments
    $with
    
  isBlock: () -> this.is "pre"
  
  isInline: () -> this.is "block"
    
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
    
  toString:() ->
    $("<p>").append(@clone()).html()
