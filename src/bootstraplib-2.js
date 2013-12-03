/* BootstrapLib compiled JavaScript source.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/


(function() {
  var $, Bootstrap, Button, Code, FormControls, baseClass, baseNamespace, cssNamespace, getRenderedCSS, isDOMNode, toArray,
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

  isDOMNode = function(node) {
    if (typeof Node === "object") {
      return node instanceof Node;
    } else {
      return (node != null) && typeof node === "object" && typeof node.nodeType === "number" && typeof node.nodeName === "string";
    }
  };

  getRenderedCSS = function(element, key) {
    var $body, $temp, value;
    if (!(element instanceof jQuery)) {
      element = jQuery(element);
    }
    if (element.length !== 0) {
      value = element.css(key);
      if (value === "") {
        $body = $("body");
        $temp = element.clone();
        $body.append($temp);
        value = $temp.css(key);
        $temp.remove();
      }
    }
    return value;
  };

  toArray = function(object) {
    var key, _results;
    _results = [];
    for (key in object) {
      if (!__hasProp.call(object, key)) continue;
      _results.push(object[key]);
    }
    return _results;
  };

  $ = jQuery;

  baseNamespace = "uk.co.stevenmeyer.bootstrap";

  cssNamespace = "" + baseNamespace + ".css";

  baseClass = Bootstrap = (function(_super) {
    __extends(Bootstrap, _super);

    function Bootstrap() {
      var $jQuery;
      $jQuery = $.apply(this, arguments);
      $.extend(this, $jQuery);
      this;
    }

    Bootstrap.prototype.toString = function() {
      return $("<p />").append(this.clone()).html();
    };

    return Bootstrap;

  })($);

  namespace(baseNamespace, {
    Bootstrap: Bootstrap
  });

  Button = (function(_super) {
    var exclusiveClass, getText, setText;

    __extends(Button, _super);

    Button.prototype.BLOCK = "btn-block";

    Button.prototype.DISABLED = "disabled";

    Button.prototype.options = {
      DANGER: "btn-danger",
      DEFAULT: "",
      INFO: "btn-info",
      LINK: "btn-link",
      PRIMARY: "btn-primary",
      SUCCESS: "btn-success",
      WARNING: "btn-warning"
    };

    Button.prototype.sizes = {
      DEFAULT: "",
      EXTRASMALL: "btn-xs",
      LARGE: "btn-lg",
      SMALL: "btn-sm"
    };

    Button.prototype.inputButtonTypes = {
      BUTTON: "button",
      RESET: "reset",
      SUBMIT: "submit"
    };

    function Button() {
      var args,
        _this = this;
      args = Array.prototype.slice.call(arguments);
      if (args[0] == null) {
        args[0] = "<button />";
        args[1] = {
          type: "button"
        };
      }
      Button.__super__.constructor.apply(this, args);
      this.size = function() {
        return Button.prototype.size.apply(_this, arguments);
      };
      this.text = function() {
        return Button.prototype.text.apply(_this, arguments);
      };
      this.addClass("btn");
    }

    Button.prototype.danger = function() {
      return this.option(Button.prototype.options.DANGER);
    };

    Button.prototype.defaultStyle = function() {
      return this.option();
    };

    Button.prototype.info = function() {
      return this.option(Button.prototype.options.INFO);
    };

    Button.prototype.link = function() {
      return this.option(Button.prototype.options.LINK);
    };

    Button.prototype.primary = function() {
      return this.option(Button.prototype.options.PRIMARY);
    };

    Button.prototype.success = function() {
      return this.option(Button.prototype.options.SUCCESS);
    };

    Button.prototype.warning = function() {
      return this.option(Button.prototype.options.WARNING);
    };

    Button.prototype.option = function(emphasis) {
      if (emphasis == null) {
        emphasis = "";
      }
      return exclusiveClass.call(this, emphasis, toArray(Button.prototype.options));
    };

    Button.prototype.defaultSize = function() {
      return this.size(Button.prototype.sizes.DEFAULT);
    };

    Button.prototype.extraSmall = function() {
      return this.size(Button.prototype.sizes.EXTRASMALL);
    };

    Button.prototype.large = function() {
      return this.size(Button.prototype.sizes.LARGE);
    };

    Button.prototype.small = function() {
      return this.size(Button.prototype.sizes.SMALL);
    };

    Button.prototype.size = function() {
      if (arguments[0] != null) {
        return exclusiveClass.call(this, arguments[0], toArray(Button.prototype.sizes));
      } else {
        return this.length;
      }
    };

    Button.prototype.block = function(block) {
      if (block === false) {
        return this.removeClass(Button.prototype.BLOCK);
      } else {
        return this.addClass(Button.prototype.BLOCK);
      }
    };

    Button.prototype.disable = function() {
      return this.each(function(index, DOMElement) {
        var $element;
        $element = $(DOMElement);
        if (!$element.is("a")) {
          $element.attr("disabled", "disabled");
        }
        if (!$element.is("button,input")) {
          return $element.addClass(Button.prototype.DISABLED);
        }
      });
    };

    Button.prototype.text = function() {
      if (arguments[0] != null) {
        return setText.apply(this, arguments);
      } else {
        return getText.apply(this, arguments);
      }
    };

    exclusiveClass = function(style, classes) {
      if (style == null) {
        style = "";
      }
      this.removeClass(classes.join(" "));
      if (__indexOf.call(classes, style) >= 0) {
        return this.addClass(style);
      } else {
        return this;
      }
    };

    getText = function() {
      var types;
      if (this.is("input")) {
        types = toArray(Button.prototype.inputButtonTypes);
        return this.map(function(index, DOMElement) {
          var $element, _ref;
          $element = $(DOMElement);
          if (($element.is("input")) && (_ref = $element.attr("type"), __indexOf.call(types, _ref) >= 0)) {
            return $element.val();
          } else {
            return $element.text();
          }
        }).get().join();
      } else {
        return $.fn.text.apply(this, []);
      }
    };

    setText = function(text) {
      var types;
      if (this.is("input")) {
        types = toArray(Button.prototype.inputButtonTypes);
        return this.each(function(index, DOMElement) {
          var $element, value, _ref;
          $element = $(DOMElement);
          value = typeof text === "function" ? text.call(DOMElement, index, $element.text()) : text;
          if (($element.is("input")) && (_ref = $element.attr("type"), __indexOf.call(types, _ref) >= 0)) {
            return $element.val(value);
          } else {
            return $element.text(value);
          }
        });
      } else {
        return $.fn.text.call(this, text);
      }
    };

    return Button;

  })(baseClass);

  Code = (function(_super) {
    var addItem;

    __extends(Code, _super);

    Code.prototype.SCROLLABLE = "pre-scrollable";

    function Code() {
      var args,
        _this = this;
      args = Array.prototype.slice.call(arguments);
      if (args[0] == null) {
        args[0] = $("<code />");
      }
      Code.__super__.constructor.apply(this, args);
      this.append = function() {
        return Code.prototype.append.apply(_this, arguments);
      };
      this.prepend = function() {
        return Code.prototype.prepend.apply(_this, arguments);
      };
      this;
    }

    Code.prototype.append = function() {
      var args;
      args = Array.prototype.slice.call(arguments);
      return addItem.call(this, "append", args);
    };

    Code.prototype.prepend = function() {
      var args;
      args = Array.prototype.slice.call(arguments);
      return addItem.call(this, "prepend", args);
    };

    addItem = function(op, items) {
      var arg, lastTry,
        _this = this;
      lastTry = function(item) {
        var $item;
        $item = $(item);
        if ($item) {
          return $.fn[op].call(_this, document.createTextNode($("<p />").append($item.clone()).html()));
        } else {
          return $.fn[op].call(_this, document.createTextNode("" + $item));
        }
      };
      for (arg in items) {
        if (typeof items[arg] === "string") {
          $.fn[op].call(this, document.createTextNode(items[arg]));
        } else if (items[arg] instanceof $) {
          $.fn[op].call(this, document.createTextNode($("<p>").append(items[arg].clone()).html()));
        } else if (items[arg] instanceof Array) {
          Code.prototype[op].apply(this, items[arg]);
        } else if (typeof items[arg] === "function") {
          Code.prototype[op].call(this, items[arg].call(this, 0, this.html()));
        } else if (isDOMNode(items[arg])) {
          switch (items[arg].nodeType) {
            case 1:
            case 9:
            case 11:
              $.fn[op].call(this, document.createTextNode($("<p>").append(items[arg]).html()));
              break;
            case 3:
              $.fn[op].call(this, items[arg]);
              break;
            default:
              lastTry(items[arg]);
          }
        } else {
          lastTry(items[arg]);
        }
      }
      return this;
    };

    Code.prototype.appendHTML = function() {
      return $.fn.append.apply(this, arguments);
    };

    Code.prototype.prependHTML = function() {
      return $.fn.append.apply(this, arguments);
    };

    Code.prototype.isBlock = function() {
      var display;
      display = getRenderedCSS(this, "display");
      switch (display) {
        case "block":
        case "inline-block":
        case "list-item":
        case "table":
        case "table-caption":
        case "table-row":
          return true;
        default:
          return false;
      }
    };

    Code.prototype.isInline = function() {
      var display;
      display = getRenderedCSS(this, "display");
      switch (display) {
        case "inline":
        case "inline-table":
        case "table-cell":
        case "table-column":
          return true;
        default:
          return false;
      }
    };

    Code.prototype.scrollable = function(scroll) {
      if (scroll === false) {
        this.removeClass(Code.prototype.SCROLLABLE);
      } else if (this.isBlock()) {
        this.addClass(Code.prototype.SCROLLABLE);
      }
      return this;
    };

    return Code;

  })(baseClass);

  Code.BlockCode = (function(_super) {
    __extends(BlockCode, _super);

    function BlockCode() {
      var $element, args;
      args = Array.prototype.slice.call(arguments);
      $element = $("<pre />");
      if (args[0] != null) {
        if (isDOMNode(args[0]) || typeof args[0] === "string" || args[0] instanceof $) {
          args[0] = $element;
        } else {
          args = args.unshift($element);
        }
      } else {
        args[0] = $element;
      }
      BlockCode.__super__.constructor.apply(this, args);
      this;
    }

    return BlockCode;

  })(Code);

  Code.InlineCode = (function(_super) {
    __extends(InlineCode, _super);

    function InlineCode() {
      var $element, args;
      args = Array.prototype.slice.call(arguments);
      $element = $("<code />");
      if (args[0] != null) {
        if (isDOMNode(args[0]) || typeof args[0] === "string" || args[0] instanceof $) {
          args[0] = $element;
        } else {
          args = args.unshift($element);
        }
      } else {
        args[0] = $element;
      }
      InlineCode.__super__.constructor.apply(this, args);
      this;
    }

    return InlineCode;

  })(Code);

  FormControls = (function() {
    function FormControls() {}

    FormControls.prototype.inputTypes = {
      COLOR: "color",
      DATE: "date",
      DATETIME: "datetime",
      DATETIMELOCAL: "datetime-local",
      EMAIL: "email",
      MONTH: "month",
      NUMBER: "number",
      PASSWORD: "password",
      SEARCH: "search",
      TEL: "tel",
      TEXT: "text",
      TIME: "time",
      URL: "url",
      WEEK: "week"
    };

    FormControls.prototype.createInput = function(type) {
      var $element, id, ownerDocument, types;
      types = toArray(FormControls.prototype.inputTypes);
      if (__indexOf.call(types, type) < 0) {
        type = FormControls.prototype.inputTypes.TEXT;
      }
      if (arguments.length > 1) {
        id = null;
        ownerDocument = null;
        if (typeof arguments[1] === "string") {
          id = arguments[1];
        } else if (arguments[1] instanceof Document) {
          ownerDocument = arguments[1];
        }
        if (arguments[2] && arguments[2] instanceof Document) {
          ownerDocument = arguments[2];
        }
        if (ownerDocument) {
          $element = $("<input />", ownerDocument);
        } else {
          $element = $("<input />");
        }
        if (id) {
          $element.attr("id", id);
        }
        return $element.attr("type", type);
      } else {
        return $("<input />").attr("type", type);
      }
    };

    return FormControls;

  })();

  namespace(cssNamespace, {
    Button: Button,
    Code: Code,
    forms: {
      FormControls: FormControls
    }
  });

}).call(this);
