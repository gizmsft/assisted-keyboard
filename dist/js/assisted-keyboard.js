
; function OnScreenKeyboard(options) {
  'use strict';

  var self = this;

  this.attachTo = attachTo;
  this.suggestButtons = suggestButtons;
  this.toggleSymbolKey = toggleSymbolKey;
  this.toggleNumLockKey = toggleNumLockKey;
  this.toggleLanguage = toggleLanguage;
  this.setLastUsedSymbolKey = setLastUsedSymbolKey;

  var defaults = {
    defaultLanguage: 2,
    suggestNextButton: true,
    css: {
      keyboardClass: 'keyboard',
      allKeyClass: 'allbuttons',
      regularKeyClass: 'printbuttons',
      nonshiftkeyClass: 'noshiftbuttons',
      backspaceKeyClass: 'backspacebutton',
      tabKeyClass: 'tabbutton',
      verticalBarKeyClass: 'verticalbarbutton',
      numberLockClass: 'numberlockbutton',
      enterKeyClass: 'enterbutton',
      leftshiftKeyClass: 'leftshiftbutton',
      rightshiftKeyClass: 'rightshiftbutton',
      symbolKeyClass: 'symbolbutton',
      spaceKeyClass: 'spacebutton',
      languageKeyClass: 'languagebuttons',
      cancelKeyClass: 'cancelbutton',
      okKeyClass: 'okbutton',
      keyDownClass: 'buttondown',
      keyHoverClass: 'buttonover',
      text1HoverClass: 'buttontext1over',
      text2HoverClass: 'buttontext2over',
      suggestedKeyClass: 'suggestedButton',

      buttontext1Class: 'buttontext1',
      buttontext2Class: 'buttontext2'
    },
    events: {
      // character code, key code, num lock state, 
      printablekeyClicked: function(event) { console.log('Ok button clicked', event); },
      symbolKeyToggled: function(event) { console.log('Symbol button toggled', event); },
      numLockToggled: function(event) { console.log('Numlock button toggled', event); },
      languageToggled: function(event) { console.log('Language button toggled', event); },
      cancelClicked: function() { console.log('Cancel button clicked'); },
      okClicked: function () { console.log('Ok button clicked'); },
      enterClicked: function () { console.log('Enter button clicked'); }
    }
  };

  var local = {
    currentNumLockStatus: false,
    currentSymbolLockStatus: false,
    currentShiftStatus: false,
    currentLanguageStatus: 1,
    settings: {},
    shiftedKeyTemplate: undefined,
    unshiftedKeyTemplate: undefined,
    regularkeyTemplate: undefined,
    keyboardTemplate: undefined,
    $keyboard: undefined,
    buttonList: undefined,
    indexAttribute: 'data-index'
  };

  local.settings = $.extend(true, {}, defaults, options);

  var css = local.settings.css;
  local.keyboardTemplate = '<div class="' + css.keyboardClass + '"></div>';;
  local.shiftedKeyTemplate = '<div class="' + css.buttontext1Class + '"></div>';
  local.unshiftedKeyTemplate = '<div class="' + css.buttontext2Class + '"></div>';
  local.regularkeyTemplate = '<div class="' + css.allKeyClass + ' ' + css.regularKeyClass + '"></div>';


  // below are keys which are shifted on the buttons
  var shtml = local.shiftedKeyTemplate;

  // row 1
  var $key0101a = $(shtml);
  var $key0102a = $(shtml);
  var $key0103a = $(shtml);
  var $key0104a = $(shtml);
  var $key0105a = $(shtml);
  var $key0106a = $(shtml);
  var $key0107a = $(shtml);
  var $key0108a = $(shtml);
  var $key0109a = $(shtml);
  var $key0110a = $(shtml);
  var $key0111a = $(shtml);
  var $key0112a = $(shtml);
  var $key0113a = $(shtml);

  // row 2
  var $key0202a = $(shtml);
  var $key0203a = $(shtml);
  var $key0204a = $(shtml);
  var $key0205a = $(shtml);
  var $key0206a = $(shtml);
  var $key0207a = $(shtml);
  var $key0208a = $(shtml);
  var $key0209a = $(shtml);
  var $key0210a = $(shtml);
  var $key0211a = $(shtml);
  var $key0212a = $(shtml);
  var $key0213a = $(shtml);
  var $key0214a = $(shtml);

  // row 3
  var $key0302a = $(shtml);
  var $key0303a = $(shtml);
  var $key0304a = $(shtml);
  var $key0305a = $(shtml);
  var $key0306a = $(shtml);
  var $key0307a = $(shtml);
  var $key0308a = $(shtml);
  var $key0309a = $(shtml);
  var $key0310a = $(shtml);
  var $key0311a = $(shtml);
  var $key0312a = $(shtml);

  // row 4
  var $key0402a = $(shtml);
  var $key0403a = $(shtml);
  var $key0404a = $(shtml);
  var $key0405a = $(shtml);
  var $key0406a = $(shtml);
  var $key0407a = $(shtml);
  var $key0408a = $(shtml);
  var $key0409a = $(shtml);
  var $key0410a = $(shtml);
  var $key0411a = $(shtml);

  // below are keys which are non-shifted on the buttons
  var rhtml = local.unshiftedKeyTemplate;

  // row 1
  var $key0101b = $(rhtml);
  var $key0102b = $(rhtml);
  var $key0103b = $(rhtml);
  var $key0104b = $(rhtml);
  var $key0105b = $(rhtml);
  var $key0106b = $(rhtml);
  var $key0107b = $(rhtml);
  var $key0108b = $(rhtml);
  var $key0109b = $(rhtml);
  var $key0110b = $(rhtml);
  var $key0111b = $(rhtml);
  var $key0112b = $(rhtml);
  var $key0113b = $(rhtml);

  // row 2
  var $key0202b = $(rhtml);
  var $key0203b = $(rhtml);
  var $key0204b = $(rhtml);
  var $key0205b = $(rhtml);
  var $key0206b = $(rhtml);
  var $key0207b = $(rhtml);
  var $key0208b = $(rhtml);
  var $key0209b = $(rhtml);
  var $key0210b = $(rhtml);
  var $key0211b = $(rhtml);
  var $key0212b = $(rhtml);
  var $key0213b = $(rhtml);
  var $key0214b = $(rhtml);

  // row 3
  var $key0302b = $(rhtml);
  var $key0303b = $(rhtml);
  var $key0304b = $(rhtml);
  var $key0305b = $(rhtml);
  var $key0306b = $(rhtml);
  var $key0307b = $(rhtml);
  var $key0308b = $(rhtml);
  var $key0309b = $(rhtml);
  var $key0310b = $(rhtml);
  var $key0311b = $(rhtml);
  var $key0312b = $(rhtml);

  // row 4
  var $key0402b = $(rhtml);
  var $key0403b = $(rhtml);
  var $key0404b = $(rhtml);
  var $key0405b = $(rhtml);
  var $key0406b = $(rhtml);
  var $key0407b = $(rhtml);
  var $key0408b = $(rhtml);
  var $key0409b = $(rhtml);
  var $key0410b = $(rhtml);
  var $key0411b = $(rhtml);

  //below we are binding shifted and regular keys to buttons.
  var keyhtml = local.regularkeyTemplate;
  var $key0101 = $(keyhtml).append($key0101a, $key0101b);
  var $key0102 = $(keyhtml).append($key0102a, $key0102b);
  var $key0103 = $(keyhtml).append($key0103a, $key0103b);
  var $key0104 = $(keyhtml).append($key0104a, $key0104b);
  var $key0105 = $(keyhtml).append($key0105a, $key0105b);
  var $key0106 = $(keyhtml).append($key0106a, $key0106b);
  var $key0107 = $(keyhtml).append($key0107a, $key0107b);
  var $key0108 = $(keyhtml).append($key0108a, $key0108b);
  var $key0109 = $(keyhtml).append($key0109a, $key0109b);
  var $key0110 = $(keyhtml).append($key0110a, $key0110b);
  var $key0111 = $(keyhtml).append($key0111a, $key0111b);
  var $key0112 = $(keyhtml).append($key0112a, $key0112b);
  var $key0113 = $(keyhtml).append($key0113a, $key0113b);
  var $key0114 = $('<div class="' + css.allKeyClass + ' ' + css.backspaceKeyClass + ' ' + css.nonshiftkeyClass + '"></div>');

  var $key0201 = $('<div class="' + css.allKeyClass + ' ' + css.tabKeyClass + ' ' + css.nonshiftkeyClass + '"></div>');
  var $key0202 = $(keyhtml).append($key0202a, $key0202b);
  var $key0203 = $(keyhtml).append($key0203a, $key0203b);
  var $key0204 = $(keyhtml).append($key0204a, $key0204b);
  var $key0205 = $(keyhtml).append($key0205a, $key0205b);
  var $key0206 = $(keyhtml).append($key0206a, $key0206b);
  var $key0207 = $(keyhtml).append($key0207a, $key0207b);
  var $key0208 = $(keyhtml).append($key0208a, $key0208b);
  var $key0209 = $(keyhtml).append($key0209a, $key0209b);
  var $key0210 = $(keyhtml).append($key0210a, $key0210b);
  var $key0211 = $(keyhtml).append($key0211a, $key0211b);
  var $key0212 = $(keyhtml).append($key0212a, $key0212b);
  var $key0213 = $(keyhtml).append($key0213a, $key0213b);
  var $key0214 = $('<div class="' + css.allKeyClass + ' ' + css.verticalBarKeyClass + '"></div>').append($key0214a, $key0214b);

  var $key0301 = $('<div class="' + css.allKeyClass + ' ' + css.numberLockClass + ' ' + css.nonshiftkeyClass + '"></div>');
  var $key0302 = $(keyhtml).append($key0302a, $key0302b);
  var $key0303 = $(keyhtml).append($key0303a, $key0303b);
  var $key0304 = $(keyhtml).append($key0304a, $key0304b);
  var $key0305 = $(keyhtml).append($key0305a, $key0305b);
  var $key0306 = $(keyhtml).append($key0306a, $key0306b);
  var $key0307 = $(keyhtml).append($key0307a, $key0307b);
  var $key0308 = $(keyhtml).append($key0308a, $key0308b);
  var $key0309 = $(keyhtml).append($key0309a, $key0309b);
  var $key0310 = $(keyhtml).append($key0310a, $key0310b);
  var $key0311 = $(keyhtml).append($key0311a, $key0311b);
  var $key0312 = $(keyhtml).append($key0312a, $key0312b);
  var $key0313 = $('<div class="' + css.allKeyClass + ' ' + css.enterKeyClass + ' ' + css.nonshiftkeyClass + '"></div>');

  var $key0401 = $('<div class="' + css.allKeyClass + ' ' + css.symbolKeyClass + ' ' + css.nonshiftkeyClass +'"></div>');
  var $key0402 = $(keyhtml).append($key0402a, $key0402b);
  var $key0403 = $(keyhtml).append($key0403a, $key0403b);
  var $key0404 = $(keyhtml).append($key0404a, $key0404b);
  var $key0405 = $(keyhtml).append($key0405a, $key0405b);
  var $key0406 = $(keyhtml).append($key0406a, $key0406b);
  var $key0407 = $(keyhtml).append($key0407a, $key0407b);
  var $key0408 = $(keyhtml).append($key0408a, $key0408b);
  var $key0409 = $(keyhtml).append($key0409a, $key0409b);
  var $key0410 = $(keyhtml).append($key0410a, $key0410b);
  var $key0411 = $(keyhtml).append($key0411a, $key0411b);
  var $key0412 = $("<div class=\"" + css.allKeyClass + " " + css.rightshiftKeyClass + " " + css.nonshiftkeyClass + "\"></div>");

  var $key0501 = $("<div class=\"" + css.allKeyClass + " " + css.regularKeyClass + " " + css.nonshiftkeyClass + "\"></div>");
  var $key0502 = $("<div class=\"" + css.allKeyClass + " " + css.regularKeyClass + " " + css.nonshiftkeyClass + "\"></div>");
  var $key0503 = $("<div class=\"" + css.allKeyClass + " " + css.regularKeyClass + " " + css.nonshiftkeyClass + "\"></div>");
  var $key0504 = $("<div class=\"" + css.allKeyClass + " " + css.regularKeyClass + " " + css.nonshiftkeyClass + "\"></div>"); 
  var $key0505 = $("<div class=\"" + css.allKeyClass + " " + css.spaceKeyClass + " " + css.nonshiftkeyClass + "\"></div>");
  var $key0506 = $("<div class=\"" + css.allKeyClass + " " + css.languageKeyClass + " " + css.nonshiftkeyClass + "\"></div>");
  var $key0507 = $("<div class=\"" + css.allKeyClass + " " + css.languageKeyClass + " " + css.nonshiftkeyClass + "\"></div>");
  var $key0508 = $("<div class=\"" + css.allKeyClass + " " + css.cancelKeyClass + " " + css.nonshiftkeyClass + "\"></div>");
  var $key0509 = $("<div class=\"" + css.allKeyClass + " " + css.okKeyClass + " " + css.nonshiftkeyClass + "\"></div>");

  // add keys to the key array.
  local.buttonList = [
    // row 1
    $key0101, $key0102, $key0103, $key0104, $key0105, $key0106, $key0107, $key0108, $key0109, $key0110, $key0111,
    $key0112, $key0113, $key0114, $("<br />"),
    // row 2
    $key0201, $key0202, $key0203, $key0204, $key0205, $key0206, $key0207, $key0208, $key0209, $key0210, $key0211,
    $key0212, $key0213, $key0214, $("<br />"),
    // row 3
    $key0301, $key0302, $key0303, $key0304, $key0305, $key0306, $key0307, $key0308, $key0309, $key0310, $key0311,
    $key0312, $key0313, $("<br />"),
    // row 4
    $key0401, $key0402, $key0403, $key0404, $key0405, $key0406, $key0407, $key0408, $key0409, $key0410, $key0411,
    $key0412, $("<br />"),
    // row 5
    $key0501, $key0502, $key0503, $key0504, $key0505, $key0506, $key0507, $key0508, $key0509
  ];

  // bind events to the keys
  $.each(local.buttonList, function (index, item) {
    item.attr(local.indexAttribute, index);
    item.on('click', function (e) { keyMouseClicked(e, item, false); });
    item.on('mouseenter', function (e) { keyMouseEnter(e, item, false); });
    item.on('mouseleave', function (e) { keyMouseLeave(e, item, false); });
  });

  function keyMouseClicked(e, key, isShifted) {
    e.stopPropagation();
    handleKeyMouseClick(e, key, isShifted);
  }

  function keyMouseEnter(e, key, isShifted) {
    if (css.keyHoverClass) {
      key.addClass(css.keyHoverClass);
    }
  }

  function keyMouseLeave(e, key, isShifted) {
    if (css.keyHoverClass) {
      key.removeClass(css.keyHoverClass);
    }
  }

  local.$keyboard = $(local.keyboardTemplate).append(local.buttonList);

  // attach mouse events to shifted keys.
  attachedtextMouseEvents([
    $key0101a, $key0102a, $key0103a, $key0104a, $key0105a, $key0106a, $key0107a, $key0108a, $key0109a, $key0110a,
    $key0111a, $key0112a, $key0113a,
    $key0202a, $key0203a, $key0204a, $key0205a, $key0206a, $key0207a, $key0208a, $key0209a, $key0210a, $key0211a,
    $key0212a, $key0213a, $key0214a, $key0302a,
    $key0303a, $key0304a, $key0305a, $key0306a, $key0307a, $key0308a, $key0309a, $key0310a, $key0311a, $key0312a,
    $key0402a, $key0403a, $key0404a, $key0405a, $key0406a, $key0407a, $key0408a, $key0409a, $key0410a, $key0411a
  ], true);

  // attach mouse events to non-shifted keys.
  attachedtextMouseEvents([
    $key0101b, $key0102b, $key0103b, $key0104b, $key0105b, $key0106b, $key0107b, $key0108b, $key0109b, $key0110b,
    $key0111b, $key0112b, $key0113b,
    $key0202b, $key0203b, $key0204b, $key0205b, $key0206b, $key0207b, $key0208b, $key0209b, $key0210b, $key0211b,
    $key0212b, $key0213b, $key0214b,
    $key0302b, $key0303b, $key0304b, $key0305b, $key0306b, $key0307b, $key0308b, $key0309b, $key0310b, $key0311b,
    $key0312b,
    $key0402b, $key0403b, $key0404b, $key0405b, $key0406b, $key0407b, $key0408b, $key0409b, $key0410b, $key0411b
  ], false);

  // attaches key to their respective events.
  function attachedtextMouseEvents(keys, isShifted) {
    $.each(keys, function (index, key) {
      key.on('click', function (e) { textMouseClicked(e, key, isShifted); });
      key.on('mouseenter', function (e) { textMouseEnter(e, key, isShifted); });
      key.on('mouseleave', function (e) { textMouseLeave(e, key, isShifted); });
    });
  }

  function textMouseClicked(e, key, isShifted) {
    e.stopPropagation();
    var parent = key.parent();
    handleKeyMouseClick(e, parent, isShifted);
  }

  function textMouseEnter(e, key, isShifted) {
    if (isShifted) {
      key.parent().addClass(css.text1HoverClass);
    }
    else {
      key.parent().addClass(css.text2HoverClass);
    }
  }

  function textMouseLeave(e, key, isShifted) {
    if (isShifted) {
      key.parent().removeClass(css.text1HoverClass);
    }
    else {
      key.parent().removeClass(css.text2HoverClass);
    }
  }

  function suggestButtons(charList) {

    $.each(local.buttonList, function (index, value) {
      var key0 = value.children().eq(0).text();
      var key1 = value.children().eq(1).text();

      if (charList.indexOf(key0) >= 0 || charList.indexOf(key1) >= 0) {
        value.addClass(local.settings.css.suggestedKeyClass);
      }
      else {
        value.removeClass(local.settings.css.suggestedKeyClass);
      }
    });
  }

  function setLastUsedSymbolKey(value) {
    var symbols = [
      $key0501.text(),
      $key0502.text(),
      $key0503.text(),
      $key0504.text()
    ];

    if (!symbols.includes(value)) {
      $key0501.text(symbols[1]);
      $key0502.text(symbols[2]);
      $key0503.text(symbols[3]);
      $key0504.text(value);
    }
  }
  
    function toggleSymbolKey(status) {
    if (status == null || status === true) {
      local.currentSymbolLockStatus = true;
      $key0401.addClass(css.keyDownClass);
    }
    else {
      local.currentSymbolLockStatus = false;
      $key0401.removeClass(css.keyDownClass);
    }
  }

  // change shift lock key state based on the passed parameter.
  function toggleNumLockKey(status) {
    if (status == null || status === true) {
      local.currentNumLockStatus = true;
      $key0301.addClass(css.keyDownClass);
    }
    else {
      local.currentNumLockStatus = false;
      $key0301.removeClass(css.keyDownClass);
    }
  }

  // change language based on the passed parameters.
  function toggleLanguage(status) {
    if (!status) {
      status = (local.currentLanguageStatus === 1) ? 2 : 1;
    }

    if (status === 1) {
      setLanguage1();
      local.currentLanguageStatus = 1;
      $key0506.removeClass(css.keyDownClass);
      $key0507.addClass(css.keyDownClass);
    }
    else {
      setLanguage2();
      local.currentLanguageStatus = 2;
      $key0506.addClass(css.keyDownClass);
      $key0507.removeClass(css.keyDownClass);
    }
  }

  function handleKeyMouseClick(e, key, isShifted) {
    var index = parseInt(key.attr(local.indexAttribute));

    if (index === 62) {
      // set keyboard to second language
      toggleLanguage(2);
      if (local.settings.events.languageToggled) {
        local.settings.events.languageToggled.call(self, { language: 2 });
      }
    }
    else if (index === 63) {
      // set keyboard to first language
      toggleLanguage(1);
      if (local.settings.events.languageToggled) {
        local.settings.events.languageToggled.call(self, { language: 1 });
      }
    }
    else if (index === 64) {
      // raise cancel event.
      if (local.settings.events.cancelClicked) {
        local.settings.events.cancelClicked.call(self, null);
      }
    }
    else if (index === 65) {
      // raise ok event.
      if (local.settings.events.okClicked) {
        local.settings.events.okClicked.call(self, null);
      }
    }
    else if (index === 30) {
      // change num lock state
      toggleNumLockKey(!local.currentNumLockStatus);
      if (local.settings.events.numLockToggled) {
        local.settings.events.numLockToggled.call(self, { active: local.currentNumLockStatus });
      }
    }
    else if (index === 42) {
      //enter key clicked
      if (local.settings.events.enterClicked) {
        local.settings.events.enterClicked.call(self, null);
      }
    }
    else if (index === 44) {
      //symbol key clicked
	    toggleSymbolKey(!local.currentSymbolLockStatus);  
      if (local.settings.events.symbolKeyToggled) {
        local.settings.events.symbolKeyToggled.call(self, { active: local.currentSymbolLockStatus });
      }
    }
    else {
      handlePrintableKeyClick(index, e, key, isShifted);
    }
  }

  function handlePrintableKeyClick(index, e, key, isShifted) {
    var position = isShifted ? 0 : 1;
    var event = {
      key: undefined
    };

    if ((index >= 0 && index <= 12) || (index >= 16 && index <= 28) || (index >= 31 && index <= 41) || (index >= 45 && index <= 54)) {
      event.key = key.children().eq(position).text();
    }
    else if (index === 13) {
      //backspace
      event.key = '\b';
    }
    else if (index === 15) {
      //tab
      event.key = '\t';
    }
    else if (index === 42) {
      //enter
      event.key = '\n';
    }
    else if (index >= 57 && index <= 60) {
      //symbol 1 to 4
      event.key = key.text();
    }
    else if (index === 61) {
      //space
      event.key = ' ';
    }

    if (local.settings.events.printablekeyClicked) {
      local.settings.events.printablekeyClicked.call(self, event);
    }
  }

  function setLanguage1() {
    // top   
    if (!local.currentNumLockStatus) {

      $key0101a.text('~').attr('title', '');
      $key0102a.text('!').attr('title', '');
      $key0103a.text('@').attr('title', '');
      $key0104a.text('#').attr('title', '');
      $key0105a.text('$').attr('title', '');
      $key0106a.text('%').attr('title', '');
      $key0107a.text('^').attr('title', '');
      $key0108a.text('&').attr('title', '');
      $key0109a.text('*').attr('title', '');
      $key0110a.text('(').attr('title', '');
      $key0111a.text(')').attr('title', '');
      $key0112a.text('_').attr('title', '');
      $key0113a.text('+').attr('title', '');
    }

    $key0114.text('Backspace');

    $key0201.text('Tab').attr('title', '');
    $key0202a.text('Q').attr('title', '');
    $key0203a.text('W').attr('title', '');
    $key0204a.text('E').attr('title', '');
    $key0205a.text('R').attr('title', '');
    $key0206a.text('T').attr('title', '');
    $key0207a.text('Y').attr('title', '');
    $key0208a.text('U').attr('title', '');
    $key0209a.text('I').attr('title', '');
    $key0210a.text('O').attr('title', '');
    $key0211a.text('P').attr('title', '');
    $key0212a.text('}').css({ direction: 'rtl'}).attr('title', '}');
    $key0213a.text('{').css({ direction: 'rtl'}).attr('title', '{');
    $key0214a.text('|').attr('title', '');

    $key0301.text('Num Lock');
    $key0302a.text('A').attr('title', '');
    $key0303a.text('S').attr('title', '');
    $key0304a.text('D').attr('title', '');
    $key0305a.text('F').attr('title', '');
    $key0306a.text('G').attr('title', '');
    $key0307a.text('H').attr('title', '');
    $key0308a.text('J').attr('title', '');
    $key0309a.text('K').attr('title', '');
    $key0310a.text('L').attr('title', '');
    $key0311a.text(':').attr('title', '');
    $key0312a.text('"').attr('title', '');
    $key0313.text('Enter');

    $key0401.text('Symbols');
    $key0402a.text('Z').attr('title', '');
    $key0403a.text('X').attr('title', '');
    $key0404a.text('C').attr('title', '');
    $key0405a.text('V').attr('title', '');
    $key0406a.text('B').attr('title', '');
    $key0407a.text('N').attr('title', '');
    $key0408a.text('M').attr('title', '');
    $key0409a.text('<').attr('title', '');
    $key0410a.text('>').attr('title', '');
    $key0411a.text('?').attr('title', '');
    $key0412.text('');

    $key0505.text('Space');
    $key0506.text('اردو');
    $key0507.text('English');

    // bottom
    if (!local.currentNumLockStatus) {
      $key0101b.text('`').attr('title', '');
      $key0102b.text('1').attr('title', '');
      $key0103b.text('2').attr('title', '');
      $key0104b.text('3').attr('title', '');
      $key0105b.text('4').attr('title', '');
      $key0106b.text('5').attr('title', '');
      $key0107b.text('6').attr('title', '');
      $key0108b.text('7').attr('title', '');
      $key0109b.text('8').attr('title', '');
      $key0110b.text('9').attr('title', '');
      $key0111b.text('0').attr('title', '');
      $key0112b.text('-').attr('title', '');
      $key0113b.text('=').attr('title', '');
    }

    $key0202b.text('q').attr('title', '');
    $key0203b.text('w').attr('title', '');
    $key0204b.text('e').attr('title', '');
    $key0205b.text('r').attr('title', '');
    $key0206b.text('t').attr('title', '');
    $key0207b.text('y').attr('title', '');
    $key0208b.text('u').attr('title', '');
    $key0209b.text('i').attr('title', '');
    $key0210b.text('o').attr('title', '');
    $key0211b.text('p').attr('title', '');
    $key0212b.text(']').css({ direction: 'rtl'}).attr('title', ']');
    $key0213b.text('[').css({ direction: 'rtl'}).attr('title', '[');
    $key0214b.text('\\').attr('title', '');

    $key0302b.text('a').attr('title', '');
    $key0303b.text('s').attr('title', '');
    $key0304b.text('d').attr('title', '');
    $key0305b.text('f').attr('title', '');
    $key0306b.text('g').attr('title', '');
    $key0307b.text('h').attr('title', '');
    $key0308b.text('j').attr('title', '');
    $key0309b.text('k').attr('title', '');
    $key0310b.text('l').attr('title', '');
    $key0311b.text(';').attr('title', '');
    $key0312b.text('\'').attr('title', '');

    $key0402b.text('z').attr('title', '');
    $key0403b.text('x').attr('title', '');
    $key0404b.text('c').attr('title', '');
    $key0405b.text('v').attr('title', '');
    $key0406b.text('b').attr('title', '');
    $key0407b.text('n').attr('title', '');
    $key0408b.text('m').attr('title', '');
    $key0409b.text(',').attr('title', '');
    $key0410b.text('.').attr('title', '');
    $key0411b.text('/').attr('title', '');
  }

  function setLanguage2() {
    // top
    if (!local.currentNumLockStatus) {
      $key0101a.text('~').attr('title', '~');
      $key0102a.text('!').attr('title', '!');
      $key0103a.text('@').attr('title', '@');
      $key0104a.text('#').attr('title', '#');
      $key0105a.text('$').attr('title', '$');
      $key0106a.text('%').attr('title', '%');
      $key0107a.text('^').attr('title', '^');
      $key0108a.text('&').attr('title', '&');
      $key0109a.text('*').attr('title', '*');
      $key0110a.text('(').attr('title', '(');
      $key0111a.text(')').attr('title', ')');
      $key0112a.text('_').attr('title', '_');
      $key0113a.text('+').attr('title', '+');
    }

    $key0114.text('پیچھے');

    $key0201.text('ٹیب');
    $key0202a.text('ـ').attr('title', 'تطویل - دو حروف کو جوڑنے کے لیئے لکیر');
    $key0203a.text('ؤ').attr('title', 'ؤ - جیسے جاؤ');
    $key0204a.text('ّ').attr('title', 'شد - جیسے کوّا');
    $key0205a.text('ڑ').attr('title', 'ڑ - جیسے پہاڑ');
    $key0206a.text('ٹ').attr('title', 'ٹ - جیسے ٹماٹر');
    $key0207a.text('ئ').attr('title', 'ی پر ء');
    $key0208a.text('ۓ').attr('title', 'ے پر ء');
    $key0209a.text('ٔ').attr('title', 'ھمزہ - جیسے مکئی');
    $key0210a.text('ۃ').attr('title', 'دو نقطوں والی ہ - جیسے زکوٰۃ');
    $key0211a.text('ُ').attr('title', 'پیش - جیسے کوُک');
    $key0212a.text('}').css({ direction: 'rtl'}).attr('title', '}');
    $key0213a.text('{').css({ direction: 'rtl'}).attr('title', '{');
    $key0214a.text('|').attr('title', '|');

    $key0301.text('نمبر لاک');
    $key0302a.text('آ').attr('title', 'آ - جیسے آم');
    $key0303a.text('ص').attr('title', 'ص - جیسے صارف');
    $key0304a.text('ڈ').attr('title', 'ڈ - جیسے ڈبہ');
    $key0305a.text('َ').attr('title', 'زبر جیسے اَب');
    $key0306a.text('غ').attr('title', 'غ - جیسے غبارہ');
    $key0307a.text('ھ').attr('title', 'ھ - جیسے کھال');
    $key0308a.text('ژ').attr('title', 'ژ - جیسے ژالہ');
    $key0309a.text('خ').attr('title', 'خ - جیسے خالی');
    $key0310a.text('اً').attr('title', 'الف پر دو زبر');
    $key0311a.text(':').attr('title', ':');
    $key0312a.text('"').attr('title', '"');
    $key0313.text('داخل');

    $key0401.text('علامات');
    $key0402a.text('ذ').attr('title', 'ذ - جیسے ذخیرہ');
    $key0403a.text('ض').attr('title', 'ض - جیسے ظروف');
    $key0404a.text('ث').attr('title', 'ث - جیسے ثمر');
    $key0405a.text('ظ').attr('title', 'ظ - جیسے ظرف');
    $key0406a.text('ٰ').attr('title', 'کھڑی زبر جیسے اعلٰی');
    $key0407a.text('ں').attr('title', 'ں - جیسے ماں');
    $key0408a.text('ِ').attr('title', 'زبر جیسے اِک');
    $key0409a.text('<').attr('title', '<');
    $key0410a.text('>').attr('title', '>');
    $key0411a.text('؟').attr('title', 'علامت - سوالیہ');
    $key0412.text('');

    $key0505.text('فاصلہ');
    $key0506.text('اردو');
    $key0507.text('English');

    // bottom
    if (!local.currentNumLockStatus) {
      $key0101b.text('`').attr('title', '`');
      $key0102b.text('١').attr('title', 'عدد - 1');
      $key0103b.text('٢').attr('title', 'عدد - 2');
      $key0104b.text('٣').attr('title', 'عدد - 3');
      $key0105b.text('٤').attr('title', 'عدد - 4');
      $key0106b.text('٥').attr('title', 'عدد - 5');
      $key0107b.text('٦').attr('title', 'عدد - 6');
      $key0108b.text('٧').attr('title', 'عدد - 7');
      $key0109b.text('٨').attr('title', 'عدد - 8');
      $key0110b.text('٩').attr('title', 'عدد - 9');
      $key0111b.text('٠').attr('title', 'عدد - 0');
      $key0112b.text('-').attr('title', '-');
      $key0113b.text('=').attr('title', '=');
    }

    $key0202b.text('ق').attr('title', 'ق - جیسے قلم');
    $key0203b.text('و').attr('title', 'و - جیسے واجب');
    $key0204b.text('ع').attr('title', 'ع - جیسے علم');
    $key0205b.text('ر').attr('title', 'ر - جیسے راستہ');
    $key0206b.text('ت').attr('title', 'ت - جیسے تتلی');
    $key0207b.text('ی').attr('title', 'ی - جیسے یقین');
    $key0208b.text('ے').attr('title', 'ے - جیسے چائے');
    $key0209b.text('ء').attr('title', 'ء - جیسے علماء');
    $key0210b.text('ہ').attr('title', 'ہ - جیسے ہاں');
    $key0211b.text('پ').attr('title', 'پ - جیسے پانی');
    $key0212b.text(']').css({ direction: 'rtl'}).attr('title', ']');
    $key0213b.text('[').css({ direction: 'rtl'}).attr('title', '[');
    $key0214b.text('\\').attr('title', '\\');

    $key0302b.text('ا').attr('title', 'ا - جیسے ابتدا');
    $key0303b.text('س').attr('title', 'س - جیسے سات');
    $key0304b.text('د').attr('title', 'د - جیسے درخت');
    $key0305b.text('ف').attr('title', 'ف - جیسے فوارہ');
    $key0306b.text('گ').attr('title', 'گ - جیسے گاؤں');
    $key0307b.text('ح').attr('title', 'ح - جیسے حلوہ');
    $key0308b.text('ج').attr('title', 'ج - جیسے جہاں');
    $key0309b.text('ک').attr('title', 'ک - جیسے کام');
    $key0310b.text('ل').attr('title', 'ل - جیسے لب');
    $key0311b.text('؛').attr('title', 'وقفہ - دو جملوں کو جوڑنے کے لیے');
    $key0312b.text('\'').attr('title', '\'');

    $key0402b.text('ز').attr('title', 'ز - جیسے زرخیز');
    $key0403b.text('ش').attr('title', 'ش - جیسے شیر');
    $key0404b.text('چ').attr('title', 'چ - جیسے چوہا');
    $key0405b.text('ط').attr('title', 'ط - جیسے طوطا');
    $key0406b.text('ب').attr('title', 'ب - جیسے برف');
    $key0407b.text('ن').attr('title', 'ن - جیسے نشانہ');
    $key0408b.text('م').attr('title', 'م - جیسے مکڑی');
    $key0409b.text('،').attr('title', 'رکاوٹ - جملے کے حصّوںکو الگ کرنے کے لیے');
    $key0410b.text('۔').attr('title', 'وقفہ - سکون');
    $key0411b.text('/').attr('title', '/');
  }

  function attachTo(parent) {
    parent.append(local.$keyboard);
  }

  toggleLanguage(local.settings.defaultLanguage);

}
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