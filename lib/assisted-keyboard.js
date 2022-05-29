; (function ($, window, document, undefined) {
  'use strict';

  const pluginName = "assistedKeyboard";

  const defaults = {
    enabled: true,
    defaultLanguage: 1,
    suggestNextButton: true,
    displayType: 'inline-block',
    css: {
      mainContainerClass: 'onscreenkeyboardcontrol',
      suggestionContainerClass: 'suggestioncontainerclass',
      symbolContainerClass: 'symbolcontainerclass',
      keyboardContainerClass: 'keyboardcontainerclass',

      suggestionListClass: 'suggestionlist',
      suggestionListItemClass: 'suggestionlistitem',
      symbolButtonClass: 'symbolbuttonclass'
    },
    events: {
      onVisibilityChanged: null,
      onCancel: null,
      onOk: null,
      onEnter: null,
    },
    callbacks: {
      getAbsolutePosition: function () {
        return { left: 0, top: 0 };
      }
    },
  };

  const symbols = [
    { key: 'َ', description: 'زبر', style: { 'font-size': '3em', 'position': 'absolute', 'top': '5px', 'right': '17px' } },
    { key: 'ِ', description: 'زیر', style: { 'font-size': '3em', 'position': 'absolute', 'bottom': '5px', 'right': '17px' } },
    { key: 'ُ', description: 'پیش', style: { 'font-size': '3em', 'position': 'absolute', 'top': '5px', 'right': '17px' } },
    { key: 'ً', description: 'دو زبر', style: { 'font-size': '3em', 'position': 'absolute', 'top': '5px', 'right': '17px' } },
    { key: 'ٍ', description: 'دو زیر', style: { 'font-size': '3em', 'position': 'absolute', 'bottom': '5px', 'right': '17px' } },
    { key: 'ٌ', description: 'دو پیش', style: { 'font-size': '3em', 'position': 'absolute', 'top': '5px', 'right': '17px' } },
    { key: 'ٰ', description: 'کھڑی زبر', style: { 'font-size': '3em', 'position': 'absolute', 'top': '5px', 'right': '13px' } },
    { key: 'ٖ', description: 'کھڑی زیر', style: { 'font-size': '3em', 'position': 'absolute', 'bottom': '5px', 'right': '13px' } },
    { key: 'ّ', description: 'شد', style: { 'font-size': '3em', 'position': 'absolute', 'top': '5px', 'right': '17px' } },
    { key: 'ٓ', description: 'مد', style: { 'font-size': '3em', 'position': 'absolute', 'top': '5px', 'right': '17px' } },
    { key: 'ٕ', description: 'نچلی ہمزہ', style: { 'font-size': '3em', 'position': 'absolute', 'bottom': '5px', 'right': '17px' } },
    { key: 'ٔ', description: 'اوپری ہمزہ', style: { 'font-size': '3em', 'position': 'absolute', 'top': '9px', 'right': '17px' } },
    { key: 'ْ', description: 'جزم', style: { 'font-size': '3em', 'position': 'absolute', 'top': '5px', 'right': '17px' } },
    { key: '٪', description: 'فی صد', style: { 'font-size': '1.5em', 'position': 'absolute', 'top': '1px', 'right': '9px' } },

    { key: 'ؐ', description: 'صلى الله عليه وسلم', style: { 'font-size': '3em', 'position': 'absolute', 'top': '9px', 'right': '13px' } },
    { key: 'ؓ', description: 'رضي الله عنه', style: { 'font-size': '3em', 'position': 'absolute', 'top': '9px', 'right': '13px' } },
    { key: 'ؑ', description: 'عليه السلام', style: { 'font-size': '3em', 'position': 'absolute', 'top': '9px', 'right': '13px' } },
    { key: 'ؒ', description: 'رحمة الله عليه', style: { 'font-size': '3em', 'position': 'absolute', 'top': '9px', 'right': '13px' } },

    { key: '۔', description: 'سکون', style: { 'font-size': '3em', 'position': 'absolute', 'top': '0', 'right': '7px' } },
    { key: '٭', description: 'پھول', style: { 'font-size': '2em', 'position': 'absolute', 'top': '0', 'right': '7px' } },
    { key: '؀', description: 'نمبر', style: { 'font-size': '1.5em', 'position': 'absolute', 'top': '0', 'right': '7px' } },
    { key: '؁', description: 'سنہ', style: { 'font-size': '1.5em', 'position': 'absolute', 'top': '0', 'right': '3px' } },
    { key: '؎', description: 'علامت - حوالہ', style: { 'font-size': '1.5em', 'position': 'absolute', 'top': '0', 'right': '3px' } },
  ];

  function AssistedKeyboard(element, options) {

    // Save element this plugin is attached to.
    // target element is moved into this root.
    const $root = $('<div style="display: none;"></div>');

    // element that opens up keyboard
    const $target = (element instanceof jQuery) ? element : $(element);

    // current context
    const self = this;

    const local = {
      visible: false,
      settings: undefined,
      symbolContainerHeight: '80px'
    };

    local.settings = $.extend(true, {}, defaults, options);

    var css = local.settings.css;

    var $container2 = $("<div class=\"" + css.suggestionContainerClass + "\"></div>");
    var $container3 = $("<div class=\"" + css.symbolContainerClass + "\"></div>");
    var $container4 = $("<div class=\"" + css.keyboardContainerClass + "\"></div>");

    buildSymbolContainer($container3, symbols);

    var $input = $target.after($root);

    var $suggestionList = $("<ul class=\"" + css.suggestionListClass + "\"></ul>").appendTo($container2);
    var $suggestionListItem = $("<li class=\"" + css.suggestionListItemClass + "\"></li>");

    var $keyboard = new OnScreenKeyboard({
      defaultLanguage: local.settings.defaultLanguage,
      events: {
        cancelClicked: function () {
          hide();
          if (local.settings.events.onCancel) {
            local.settings.events.onCancel.call(self, null);
          }
        },
        okClicked: function () {
          hide();
          if (local.settings.events.onOk) {
            local.settings.events.onOk.call(self, null);
          }
        },
        enterClicked: function () {
          hide();
          if (local.settings.events.onEnter) {
            local.settings.events.onEnter.call(self, null);
          }
        },
        printablekeyClicked: function (event) {
          var backspace = (event.key === '\b') ? 1 : 0;
          var value = (event.key !== '\b') ? event.key : '';
          updateText(value, backspace);
          $input.change();
        },
        symbolKeyToggled: function (event) {
          debugger;
          var newHeight = event.active ? local.symbolContainerHeight : '0';
          var opacity = event.active ? '1' : '0';

          $container3.animate({
            height: newHeight,
            opacity: opacity
          });
        }
      }
    });

    $keyboard.attachTo($container4);

    $root.addClass(css.mainContainerClass)
      .append([$container2, $container3, $container4]);

    //-----------

    function setEnabled(enabled) {
      local.settings.enabled = !!enabled;
      hide();
    }

    function getEnabled() {
      return local.settings.enabled;
    }

    function setText(text) {
      if (local.settings.enabled) {
        if (text != null) {
          $input.val(text);
        }
        return $input.val();
      }
    }

    function getText() {
      if (local.settings.enabled) {
        return $input.val();
      }
    }

    function show() {
      if (local.settings.enabled) {
        setVisible(true);
      }
    }

    function hide() {
      setVisible(false);
    }

    function setSuggestionList(term, list) {
      if (local.settings.enabled) {

        $suggestionList.empty();
        $keyboard.suggestButtons([]);

        if (list && list.length) {
          var charList = [];
          var suggestionIndex = term.length + 1;

          // create list items for suggestions
          $.each(list, function (index, phrase) {
            var item = createSuggestionListItem(term, phrase);
            $suggestionList.append(item);
            if (phrase.length >= suggestionIndex) {
              charList.push(phrase.charAt(suggestionIndex - 1));
            }
          });

          if (local.settings.suggestNextButton) {
            // create array of suggested characters
            $keyboard.suggestButtons(charList);
          }
        } else {
          var item = createSuggestionListItem(term, term);
          $suggestionList.append(item);
        }
      }
    }

    function createSuggestionListItem(term, phrase) {
      return $suggestionListItem
        .clone(true)
        .text(phrase)
        .on('click', function () {
          updateText($(this).text(), term.length);
          $input.change();
        });
    }

    function updateText(value, backspaceCount) {
      $input.focus();

      var ele = $input.get(0);
      var start = ele.selectionStart;

      if (typeof start === 'number') {
        var end = ele.selectionEnd;
        var preText = ele.value.substring(0, start);
        var postText = ele.value.substring(end);

        if (start === end && backspaceCount > 0) {
          if (backspaceCount < preText.length) {
            preText = preText.substring(0, preText.length - backspaceCount);
          }
          else {
            preText = '';
          }
        }
        preText += value;
        ele.value = preText + postText;
        ele.selectionStart = ele.selectionEnd = preText.length;
        return;
      }
      else if (document.selection) {
        var range = ele.selection.createRange();
        var text = range.text;
        range.text = '';

        var range1 = ele.createTextRange();
        range1.moveStart('character', 0);
        range1.moveEnd('textedit');
        var preText = range1.text;
        var postText = ele.value.substring(preText.length);

        if (text.length === 0 && backspaceCount > 0) {
          if (backspaceCount < preText.length) {
            preText = preText.substring(0, preText.length - backspaceCount);
          }
          else {
            preText = '';
          }
        }
        preText += value;
        ele.value = preText + postText;
        var range2 = ele.createTextRange();
        range2.move('character', preText.length);
        range2.select();
        return;
      }

      throw 'unsupported browser';
    }

    function setVisible(visible) {
      var prevState = local.visible;
      local.visible = visible;

      if (visible) {
        $root.css('display', local.settings.displayType);

        $input.focus();
        if (local.settings.events.onVisibilityChanged && prevState !== local.visible) {
          local.settings.events.onVisibilityChanged.call(self, local.visible);
        }
      }
      else {
        $root.css('display', 'none');
        if (local.settings.events.onVisibilityChanged && prevState !== local.visible) {
          local.settings.events.onVisibilityChanged.call(self, local.visible);
        }
      }
    }

    function buildSymbolContainer(container, symbols) {
      if (symbols && symbols.length) {
        $.each(symbols, function (index, item) {
          $("<div></div>")
            .attr("title", item.description)
            .addClass(local.settings.css.symbolButtonClass)
            .append($("<span></span>").css(item.style).append(item.key))
            .appendTo(container)
            .on('click', (function (key) {
              return function (event) {
                updateText(key, 0);
                $keyboard.setLastUsedSymbolKey(key);
              }
            })(item.key));
        });
      }
    }

    var isTouchDevice = function () {
      return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }

    // disable hover effect for touch devices.
    if (isTouchDevice()) {
      local.settings.css.keyHoverClass = null;
    }

    // convert double clicks/taps into 2 clicks.
    $root.on('touchstart', function (e) {
      var t2 = e.timeStamp;
      var t1 = $(this).data('lastTouch') || t2;
      var dt = t2 - t1;
      var fingers = e.originalEvent.touches.length;
      $(this).data('lastTouch', t2);
      if (!dt || dt > 400 || fingers > 1) return; // not double-tap

      e.preventDefault(); // double tap - prevent the zoom
      // also synthesize click events we just swallowed up
      //$(e.currentTarget).trigger('click');
    });

    // register event to hide popup when clicked anywhere else on the page.
    $(document.body).bind('click', function (e) {
      (function (elements) {
        var cascade = true;
        $.each(elements, function (index, ele) {
          cascade = cascade && $(e.target).closest($(ele)).length === 0;
        });

        if (cascade) {
          hide();
        }

      })([$root, $input, $suggestionList]);
    });

    $target.on('change keypress keydown keyup input propertychange click', function () {
      if (local.settings.enabled) {
        if (!local.visible) {
          show();
        }
      }
    });

    $keyboard.toggleLanguage();

    return {
      getText: getText,
      setText: setText,
      setSuggestionList: setSuggestionList,
      show: show,
      hide: hide,
      setEnabled: setEnabled,
      getEnabled: getEnabled
    };
  }

  AssistedKeyboard.prototype = {
    setText: function () {
      setText();
    },
    getText: function () {
      getText();
    },
    setSuggestionList: function (term, list) {
      setSuggestionList(term, list);
    },
    show: function () {
      show();
    },
    hide: function () {
      hide();
    },
    setEnabled: function (enabled) {
      setEnabled(enabled);
    },
    getEnabled: function () {
      getEnabled();
    }
  }

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, pluginName)) {
        var plugin = new AssistedKeyboard(this, options);
        $.data(this, pluginName, plugin);
      }
    });
  }

})(jQuery, window, document);