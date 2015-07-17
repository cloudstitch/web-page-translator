/*
 * Args:
 *   $            : jQuery - jQuery Object
 *   languages    : Array  - An array of objects
 *   translations : Array  - An array of objects
 *   opts         : Object - Other settings
 *
 * Languages: An array of objects, e.g.:
 *  [ {code: 'es', name: 'Español'} ]
 *
 * Translations: An array of objects, e.g.:
 *  [ {en: 'school', es: 'escuela'} ]
 *
 * Opts: Extra options
 *  - defaultLanguage : String the starting language of the web page
 *
 */
function WebPageTranslator($, languages, translations, opts) {

  opts = opts || {};

  // Default to English
  opts.defaultLanguage = opts.defaultLanguage || 'en';

  // Set the current language
  var currentLanguage = opts.defaultLanguage;

  return {
    /**
     * @param toLanguage {string} Language code.
     */
    translate: function(toLanguage) {
      if (toLanguage == currentLanguage)
        return;

      var textNodes = this.textNodes();

      textNodes.each(function(idx, node) {
        $.each(translations, function(idx, translation) {
            node.nodeValue = node.nodeValue.replace(translation[currentLanguage], translation[toLanguage]);
        });
      });

      currentLanguage = toLanguage;
    },
    /**
     * @param $e {jQuery} jQuery-encapsulated DOM element to append the UI into.
     */
    drawInterface: function($e) {
      var availableLanguages = this.availableLanguages(),
          menu = $('<ul class="wpt-menu"></ul>'),
          target = $e || $('body'),
          self = this;

      $.each(availableLanguages, function(idx, language) {
        var el = $('<li><a href="#' + language.code + '">' + language.name + '</li>');

        if (language.code == currentLanguage)
          el.addClass('current');

        el.appendTo(menu);
      });

      menu.on('click', 'a', function() {
        var link = $(this),
            control = link.parent(),
            language = link.attr('href').replace('#', '');

        control.addClass('current').siblings().removeClass('current');
        self.translate(language);
      });

      menu.appendTo(target);
    },
    /**
     * @returns {Array} A list of items in the LANGUAGES object that also have data in the TRANSLATIONS object.
     */
    availableLanguages: function() {
      var availableCodes = {},
          result = [];

      $.each(translations, function(idx, translation) {
        $.each(translation, function(code) {
          availableCodes[code] = true;
        });
      });

      $.each(languages, function(idx, language) {
        if (availableCodes[language.code])
          result.push(language);
      });

      return result;
    },
    /**
     * Finds all the text nodes in the document.
     * @returns {jQuery} jQuery-encapsulated array of text nodes.
     */
    textNodes: function() {
      var textNodes = $('body').find(':not(iframe, .wpt-menu, .wpt-menu *)').addBack().contents().filter(function() {
        return this.nodeType == 3;
      });

      return textNodes;
    }
  }
}