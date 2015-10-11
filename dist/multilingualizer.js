(function () {
  var root = typeof self === 'object' && self.self === self && self ||
    typeof global === 'object' && global.global === global && global ||
    this;

  // Create a safe reference to the multilingualizer object for use below.
  var multilingualizer = function (obj) {
    if (obj instanceof multilingualizer) return obj;
    if (!(this instanceof multilingualizer)) return new multilingualizer(obj);
  };

  // Add `multilingualizer` as a global object.
  root.multilingualizer = multilingualizer;


  //-------
  // Config
  //-------

  var DEFAULT_LANG = 'en';
  var LANG_REG_EXP = /\[\[([a-z]{2})\]\]([^\[]+)/g;
  var isStorageEnabled = !(typeof localStorage == 'undefined');
  var user_lang = (navigator.userLanguage || navigator.browserLanguage || navigator.language || DEFAULT_LANG).substr(0, 2);


  //-------
  // Private methods
  //-------

  var globalDict = [];

  var getLangParam = function () {
    var arr = /lang=([a-z]{2})/g.exec(location.search);
    return arr ? arr[1] : null;
  };

  var getLangFromStorage = function () {
    return isStorageEnabled ? localStorage.getItem('lang') : undefined;
  };

  var applyLang = function () {
    globalDict.forEach(function (v) {
      $(v.elm).html(v.dict[user_lang]);
    });

    // Move this to the end of the stack, so it only removes the class after the content is rendered
    setTimeout(function () {
      $('#multilingualizer-loader').removeClass('multilingualizer-spinner');
      $('#multilingualizer-wrapper').removeClass('multilingualizer-cloak');
    }, 0);
  };

  function addCloak() {
    $('#multilingualizer-wrapper').addClass('multilingualizer-cloak');
    $('#multilingualizer-loader').addClass('multilingualizer-spinner');
  }

  function textNodesUnder(el) {
    var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_ALL, null, false);
    while (n = walk.nextNode()) {
      a.push(n);
    }
    return a;
  }

  function getNodesToTranslate() {
    user_lang = getLangParam() || getLangFromStorage() || user_lang;

    if (isStorageEnabled) {
      localStorage.setItem('lang', user_lang);
    }

    // bugfix for IE11
    // if multilingual sentence is divided into several text node, restore original text node
    $('*').each(function () {
      if (LANG_REG_EXP.test($(this).text().replace(/\n/g, '')) && $(this).html().indexOf('<') == -1) {
        $(this).text($(this).text().replace(/\n/g, ''));
      }
      var $v = $('#' + $(this).attr('id'));
      if ($v.length > 0 && LANG_REG_EXP.test($v.text().replace(/\n/g, '')) && $v.html().indexOf('<') == -1) {
        $v.text($v.text().replace(/\n/g, ''));
      }
    });

    textNodesUnder(document).filter(function (v) {
      return LANG_REG_EXP.test(v.nodeValue);
    }).forEach(function (v, i) {
      var dict = {};
      var arr;
      while ((arr = LANG_REG_EXP.exec(v.nodeValue)) != null) {
        dict[arr[1]] = arr[2];
      }
      globalDict.push({elm: $(v).parent()[0], dict: dict});
    });
    applyLang();
  }


  //-------
  // Runtime
  //-------

  $(document).ready(function () {
    getNodesToTranslate();
  });


  //-------
  // Public methods
  //-------

  /**
   * @name setLang
   * @description Sets the new language
   * @public
   *
   * @param {String} lang           Language to apply
   * @param {Boolean} removeCloak   Removes the default cloaking mechanism
   *
   * @return {undefined}
   */
  multilingualizer.setLang = function (lang, removeCloak) {
    if (!removeCloak) {
      addCloak();
    }

    // move this to the end of the stack to allow the loader to show up
    setTimeout(function () {
      user_lang = lang;
      if (isStorageEnabled) {
        localStorage.setItem('lang', user_lang);
      }

      applyLang();
    }, 0);
  };

  /**
   * @name apply
   * @description Apply changes to any element loaded after the initial load
   * @public
   *
   * @param {Boolean} removeCloak   Removes the default cloaking mechanism
   *
   * @return {undefined}
   */
  multilingualizer.apply = function (removeCloak) {
    if (!removeCloak) {
      addCloak();
    }

    getNodesToTranslate();
  };
})();
