
/*
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: bootstrap.coffee
 * Description: Scriptable Twitter Bootstrap widgets and component creation.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/


(function() {
  var $, appendFn, baseClass, baseNamespace, isDOMNode, prependFn,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.namespace || (window.namespace = function(name, values) {
    var key, subpackage, target, value, _i, _len, _ref;
    target = typeof exports !== "undefined" && exports !== null ? exports : window;
    if (name.length > 0) {
      _ref = name.split('.');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        subpackage = _ref[_i];
        target = target[subpackage] || (target[subpackage] = {});
      }
    }
    for (key in values) {
      value = values[key];
      target[key] = value;
    }
    return target;
  });

  namespace('', {
    namespace: namespace
  });

  $ = jQuery;

  baseNamespace = "uk.co.stevenmeyer.Bootstrap";

  baseClass = (namespace(baseNamespace)).Bootstrap = (function(_super) {

    __extends(Bootstrap, _super);

    function Bootstrap() {
      return Bootstrap.__super__.constructor.apply(this, arguments);
    }

    return Bootstrap;

  })($);

  isDOMNode = function(node) {
    if (typeof Node === "object") {
      return node instanceof Node;
    } else {
      return (node != null) && typeof node === "object" && typeof node.nodeType === "number" && typeof node.nodeName === "string";
    }
  };

  appendFn = function(element) {
    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
      return this.appendChild(element);
    }
  };

  prependFn = function(element) {
    var _ref;
    return (this.insertBefore(element, this) === (_ref = this.nodeType) && _ref === 1) || this.nodeType === 11 || this.nodeType === 9;
  };

  (namespace("" + baseNamespace + ".Css")).Code = (function(_super) {

    __extends(Code, _super);

    function Code(block) {
      var tagName;
      tagName = block ? "<pre>" : "<code>";
      Code.decorate($(tagName), this);
    }

    Code.prototype.append = function() {
      var arg;
      for (arg in arguments) {
        if (typeof arguments[arg] === "string") {
          $.fn.append.call(this, document.createTextNode(arguments[arg]));
        } else if (arguments[arg] instanceof $) {
          $.fn.append.call(this, document.createTextNode($("<p>").append(arguments[arg].clone()).html()));
        } else if (arguments[arg] instanceof Array) {
          Code.prototype.append.apply(this, arguments[arg]);
        } else if (typeof arguments[arg] === "function") {
          Code.prototype.append.call(this, arguments[arg].call(this, 0, this.html()));
        } else if (isDOMNode(arguments[arg])) {
          switch (arguments[arg].nodeType) {
            case 1:
            case 9:
            case 11:
              $.fn.append.call(this, document.createTextNode($("<p>").append(arguments[arg]).html()));
              break;
            case 3:
              $.fn.append.call(this, arguments[arg]);
          }
        }
      }
      return this;
    };

    Code.prototype.appendHtml = function() {
      return $.fn.append.apply(this, arguments);
    };

    Code.decorate = function($item, $with) {
      if ($with == null) {
        $with = new Code();
      }
      if (!($item instanceof Object)) {
        $item = $($item);
      }
      $.extend($with, $item);
      $with.append = function() {
        return Code.prototype.append.apply(this, arguments);
      };
      $with.prepend = function() {
        return Code.prototype.prepend.apply(this, arguments);
      };
      return $with;
    };

    Code.prototype.isBlock = function() {
      return this.is("pre");
    };

    Code.prototype.isInline = function() {
      return this.is("block");
    };

    Code.prototype.prepend = function() {
      var arg;
      for (arg in arguments) {
        if (typeof arguments[arg] === "string") {
          $.fn.prepend.call(this, document.createTextNode(arguments[arg]));
        } else if (arguments[arg] instanceof $) {
          $.fn.prepend.call(this, document.createTextNode($("<p>").append(arguments[arg].clone()).html()));
        } else if (arguments[arg] instanceof Array) {
          Code.prototype.prepend.apply(this, arguments[arg]);
        } else if (typeof arguments[arg] === "function") {
          Code.prototype.prepend.call(this, arguments[arg].call(this, 0, this.html()));
        } else if (isDOMNode(arguments[arg])) {
          switch (arguments[arg].nodeType) {
            case 1:
            case 9:
            case 11:
              $.fn.prepend.call(this, document.createTextNode($("<p>").append(arguments[arg]).html()));
              break;
            case 3:
              $.fn.prepend.call(this, arguments[arg]);
          }
        }
      }
      return this;
    };

    Code.prototype.prependHtml = function() {
      return $.fn.prepend.apply(this, arguments);
    };

    Code.prototype.scrollable = function() {
      if (this.isBlock()) {
        return this.addClass("pre-scrollable");
      }
    };

    Code.prototype.toString = function() {
      return $("<p>").append(this.clone()).html();
    };

    return Code;

  })(baseClass);

}).call(this);
