
/*
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: bootstrap.coffee
 * Description: Scriptable Twitter Bootstrap widgets and component creation.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/


(function() {
  var $, baseClass, baseNamespace, isDOMNode,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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

    Bootstrap.decorate = function() {
      var $item;
      if (arguments[0] != null) {
        if (arguments[1] != null) {
          $item = arguments[0] instanceof Object ? arguments[0] : $(arguments[0]);
          $.extend(arguments[1], $item);
          return arguments[1];
        } else {
          return arguments[0];
        }
      } else {
        throw "Nothing to decorate";
      }
    };

    Bootstrap.prototype.toString = function() {
      return $("<p>").append(this.clone()).html();
    };

    return Bootstrap;

  })($);

  isDOMNode = function(node) {
    if (typeof Node === "object") {
      return node instanceof Node;
    } else {
      return (node != null) && typeof node === "object" && typeof node.nodeType === "number" && typeof node.nodeName === "string";
    }
  };

  (namespace("" + baseNamespace + ".Css")).Button = (function(_super) {
    var exclusiveStyle;

    __extends(Button, _super);

    function Button(tagname) {
      if (tagname == null) {
        tagname = "button";
      }
      Button.decorate($("<" + tagname + ">"), this);
    }

    Button.prototype.block = function() {
      return this.addClass("btn btn-block");
    };

    Button.prototype.danger = function() {
      return this.emphasize("danger");
    };

    Button.decorate = function($item, $with) {
      if ($with == null) {
        $with = new Button();
      }
      Button.__super__.constructor.decorate.call(this, $item, $with);
      $with.addClass("btn");
      $with.size = function() {
        return Button.prototype.size.apply(this, arguments);
      };
      $with.map(function() {
        var $this;
        $this = $(this);
        if (!($this.attr("type") != null) && ($this.is("button") || $this.is("input"))) {
          return $this.attr("type", "button");
        }
      });
      return $with;
    };

    Button.prototype.defaultSize = function() {
      return this.size("");
    };

    Button.prototype.defaultStyle = function() {
      return this.emphasize("");
    };

    Button.prototype.disable = function() {
      this.addClass("btn disabled");
      this.map(function() {
        var $this;
        $this = $(this);
        if ($this.is("button") || $this.is("input")) {
          return $this.attr("disabled", "disabled");
        }
      });
      return this;
    };

    Button.prototype.emphasize = function(emphasis) {
      var classes;
      if (emphasis == null) {
        emphasis = "";
      }
      classes = ["btn-primary", "btn-info", "btn-success", "btn-warning", "btn-danger", "btn-inverse", "btn-link"];
      return exclusiveStyle.call(this, emphasis, classes);
    };

    Button.prototype.enable = function() {
      return this.addClass("btn").removeClass("disabled").removeAttr("disabled");
    };

    exclusiveStyle = function(style, classes) {
      if (style == null) {
        style = "";
      }
      this.addClass("btn").removeClass(classes.join(" "));
      style = "btn-" + style;
      if (__indexOf.call(classes, style) >= 0) {
        return this.addClass(style);
      } else {
        return this;
      }
    };

    Button.prototype.info = function() {
      return this.emphasize("info");
    };

    Button.prototype.inverse = function() {
      return this.emphasize("inverse");
    };

    Button.prototype.large = function() {
      return this.size("large");
    };

    Button.prototype.link = function() {
      return this.emphasize("link");
    };

    Button.prototype.mini = function() {
      return this.size("mini");
    };

    Button.prototype.primary = function() {
      return this.emphasize("primary");
    };

    Button.prototype.size = function() {
      var classes;
      if (arguments[0] != null) {
        classes = ["btn-large", "btn-small", "btn-mini"];
        return exclusiveStyle.call(this, arguments[0], classes);
      } else {
        return this.length;
      }
    };

    Button.prototype.small = function() {
      return this.size("small");
    };

    Button.prototype.success = function() {
      return this.emphasize("success");
    };

    Button.prototype.warning = function() {
      return this.emphasize("warning");
    };

    return Button;

  })(baseClass);

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
      $with = Code.__super__.constructor.decorate.call(this, $item, $with);
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

    return Code;

  })(baseClass);

}).call(this);
