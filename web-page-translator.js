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

  // Set the current langauge
  var currentLanguage = opts.defaultLanguage;

  return {
    /*
     * toLanguage:    e.g., 'es'
     */
    translate: function(toLanguage) {
      // TODO: For each item in translations
      // If item[currentLanguage] replace it on the page with item[toLanguage]
    },

    drawInterfaceInElement: function($e) {      
      // TODO: Draw the user interface inside $e
    },

    drawInterfaceGlobal: function() {
      // TODO: Create a sticky bar on the top of window and draw the user interface in that
    },

    availableLanguage: function() {
      /*
       * TODO: Return a list of items in the LANGUAGES object
       * that also have data in the TRANSLATIONS object
       */
    }

  }

};