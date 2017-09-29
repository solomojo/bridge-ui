angular.module('app.filters').filter('localeFilter', ['$sce', function($sce) {

  return function(localeCode, languageOnly, countryOnly) {
    if (!localeCode) {
      return;
    }
    var myLocale = localeList[localeCode];
    var toReturn = '';
    if (languageOnly) {
      toReturn = myLocale.language_native_name;
    } else if (countryOnly) {
      toReturn =  myLocale.language_name + ', ' + myLocale.country_name;
    } else {
      toReturn = '[' + myLocale.locale + '] ' + myLocale.language_name + ', ' + myLocale.country_name;
    }
    if (toReturn.length > 30) {
      toReturn = toReturn.substring(0,26) + '...';
    }

    return $sce.trustAsHtml(toReturn);
  };
}]);

var localeList = {
  "ar-AE": {
    "locale": "ar-AE",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "AE",
    "country_name": "United Arab Emirates",
    "tms_id": "8",
    "language_name_en": "Arabic"
  },
  "ar-AF": {
    "locale": "ar-AF",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "AF",
    "country_name": "Afghanistan",
    "tms_id": "9",
    "language_name_en": "Arabic"
  },
  "ar-BH": {
    "locale": "ar-BH",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "BH",
    "country_name": "Bahrain",
    "tms_id": "10",
    "language_name_en": "Arabic"
  },
  "ar-DZ": {
    "locale": "ar-DZ",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "DZ",
    "country_name": "Algeria",
    "tms_id": "11",
    "language_name_en": "Arabic"
  },
  "ar-EG": {
    "locale": "ar-EG",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "EG",
    "country_name": "Egypt",
    "tms_id": "12",
    "language_name_en": "Arabic"
  },
  "ar-IQ": {
    "locale": "ar-IQ",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "IQ",
    "country_name": "Iraq",
    "tms_id": "13",
    "language_name_en": "Arabic"
  },
  "ar-JO": {
    "locale": "ar-JO",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "JO",
    "country_name": "Jordan",
    "tms_id": "14",
    "language_name_en": "Arabic"
  },
  "ar-LY": {
    "locale": "ar-LY",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "LY",
    "country_name": "Libya",
    "tms_id": "15",
    "language_name_en": "Arabic"
  },
  "ar-MA": {
    "locale": "ar-MA",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "MA",
    "country_name": "Morocco",
    "tms_id": "16",
    "language_name_en": "Arabic"
  },
  "ar-MR": {
    "locale": "ar-MR",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "MR",
    "country_name": "Mauritania",
    "tms_id": "17",
    "language_name_en": "Arabic"
  },
  "ar-OM": {
    "locale": "ar-OM",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "OM",
    "country_name": "Oman",
    "tms_id": "18",
    "language_name_en": "Arabic"
  },
  "ar-SA": {
    "locale": "ar-SA",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "SA",
    "country_name": "Saudi Arabia",
    "tms_id": "19",
    "language_name_en": "Arabic"
  },
  "ar-SD": {
    "locale": "ar-SD",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "SD",
    "country_name": "Sudan",
    "tms_id": "20",
    "language_name_en": "Arabic"
  },
  "ar-SY": {
    "locale": "ar-SY",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "SY",
    "country_name": "Syria",
    "tms_id": "21",
    "language_name_en": "Arabic"
  },
  "ar-TD": {
    "locale": "ar-TD",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "TD",
    "country_name": "Chad",
    "tms_id": "22",
    "language_name_en": "Arabic"
  },
  "ar-TN": {
    "locale": "ar-TN",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "TN",
    "country_name": "Tunisia",
    "tms_id": "23",
    "language_name_en": "Arabic"
  },
  "ar-UZ": {
    "locale": "ar-UZ",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "UZ",
    "country_name": "Uzbekistan",
    "tms_id": "24",
    "language_name_en": "Arabic"
  },
  "ar-YE": {
    "locale": "ar-YE",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "YE",
    "country_name": "Yemen",
    "tms_id": "25",
    "language_name_en": "Arabic"
  },
  "ar": {
    "locale": "ar",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "",
    "country_name": "",
    "tms_id": "7",
    "language_name_en": "Arabic (Standard)"
  },
  "bg-BG": {
    "locale": "bg-BG",
    "language_code": "bg",
    "language_name": "Bulgarian",
    "language_native_name": "български език",
    "language_direction": "LTR",
    "country_code": "BG",
    "country_name": "Bulgaria",
    "tms_id": "32",
    "language_name_en": "Bulgarian"
  },
  "ca-ES": {
    "locale": "ca-ES",
    "language_code": "ca",
    "language_name": "Catalan",
    "language_native_name": "Català",
    "language_direction": "LTR",
    "country_code": "ES",
    "country_name": "Spain",
    "tms_id": "40",
    "language_name_en": "Catalan"
  },
  "zh-CN": {
    "locale": "zh-CN",
    "language_code": "zh",
    "language_name": "Chinese",
    "language_native_name": "中文",
    "language_direction": "LTR",
    "country_code": "CN",
    "country_name": "China",
    "tms_id": "234",
    "language_name_en": "Chinese"
  },
  "zh-HK": {
    "locale": "zh-HK",
    "language_code": "zh",
    "language_name": "Chinese",
    "language_native_name": "中文",
    "language_direction": "LTR",
    "country_code": "HK",
    "country_name": "Hong Kong",
    "tms_id": "235",
    "language_name_en": "Chinese"
  },
  "zh-SG": {
    "locale": "zh-SG",
    "language_code": "zh",
    "language_name": "Chinese",
    "language_native_name": "中文",
    "language_direction": "LTR",
    "country_code": "SG",
    "country_name": "Singapore",
    "tms_id": "236",
    "language_name_en": "Chinese"
  },
  "zh-TW": {
    "locale": "zh-TW",
    "language_code": "zh",
    "language_name": "Chinese",
    "language_native_name": "中文",
    "language_direction": "LTR",
    "country_code": "TW",
    "country_name": "Taiwan",
    "tms_id": "237",
    "language_name_en": "Chinese"
  },
  "cs-CZ": {
    "locale": "cs-CZ",
    "language_code": "cs",
    "language_name": "Czech",
    "language_native_name": "čeština",
    "language_direction": "LTR",
    "country_code": "CZ",
    "country_name": "Czech Republic",
    "tms_id": "50",
    "language_name_en": "Czech"
  },
  "da-DK": {
    "locale": "da-DK",
    "language_code": "da",
    "language_name": "Danish",
    "language_native_name": "Dansk",
    "language_direction": "LTR",
    "country_code": "DK",
    "country_name": "Denmark",
    "tms_id": "52",
    "language_name_en": "Danish"
  },
  "nl-NL": {
    "locale": "nl-NL",
    "language_code": "nl",
    "language_name": "Dutch",
    "language_native_name": "Nederlands",
    "language_direction": "LTR",
    "country_code": "NL",
    "country_name": "Netherlands",
    "tms_id": "163",
    "language_name_en": "Dutch"
  },
  "nl-BE": {
    "locale": "nl-BE",
    "language_code": "nl",
    "language_name": "Dutch",
    "language_native_name": "Nederlands",
    "language_direction": "LTR",
    "country_code": "BE",
    "country_name": "Belgium",
    "tms_id": "239",
    "language_name_en": "Dutch"
  },
  "en-AU": {
    "locale": "en-AU",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "AU",
    "country_name": "Australia",
    "tms_id": "60",
    "language_name_en": "English"
  },
  "en-CA": {
    "locale": "en-CA",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "CA",
    "country_name": "Canada",
    "tms_id": "61",
    "language_name_en": "English"
  },
  "en-GB": {
    "locale": "en-GB",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "GB",
    "country_name": "United Kingdom",
    "tms_id": "62",
    "language_name_en": "English"
  },
  "en-US": {
    "locale": "en-US",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "US",
    "country_name": "United States",
    "tms_id": "63",
    "language_name_en": "English"
  },
  "en-ZA": {
    "locale": "en-ZA",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "ZA",
    "country_name": "South Africa",
    "tms_id": "64",
    "language_name_en": "English"
  },
  "en-IE": {
    "locale": "en-IE",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "IE",
    "country_name": "Ireland",
    "tms_id": "250",
    "language_name_en": "English"
  },
  "en-IN": {
    "locale": "en-IN",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "IN",
    "country_name": "India",
    "tms_id": "252",
    "language_name_en": "English"
  },
  "et-EE": {
    "locale": "et-EE",
    "language_code": "et",
    "language_name": "Estonian",
    "language_native_name": "Eesti",
    "language_direction": "LTR",
    "country_code": "EE",
    "country_name": "Estonia",
    "tms_id": "87",
    "language_name_en": "Estonian"
  },
  "fa-IR": {
    "locale": "fa-IR",
    "language_code": "fa",
    "language_name": "Farsi (Persian)",
    "language_native_name": "فارسی",
    "language_direction": "RTL",
    "country_code": "IR",
    "country_name": "Iran",
    "tms_id": "89",
    "language_name_en": "Farsi (Persian)"
  },
  "fi-FI": {
    "locale": "fi-FI",
    "language_code": "fi",
    "language_name": "Finnish",
    "language_native_name": "Suomi",
    "language_direction": "LTR",
    "country_code": "FI",
    "country_name": "Finland",
    "tms_id": "91",
    "language_name_en": "Finnish"
  },
  "fr-CA": {
    "locale": "fr-CA",
    "language_code": "fr",
    "language_name": "French",
    "language_native_name": "Fran\u00E7ais",
    "language_direction": "LTR",
    "country_code": "CA",
    "country_name": "Canadian",
    "tms_id": "95",
    "language_name_en": "French"
  },
  "fr-FR": {
    "locale": "fr-FR",
    "language_code": "fr",
    "language_name": "French",
    "language_native_name": "Fran\u00E7ais",
    "language_direction": "LTR",
    "country_code": "FR",
    "country_name": "France",
    "tms_id": "96",
    "language_name_en": "French"
  },
  "fr-CH": {
    "locale": "fr-CH",
    "language_code": "fr",
    "language_name": "French",
    "language_native_name": "Fran\u00E7ais",
    "language_direction": "LTR",
    "country_code": "CH",
    "country_name": "Switzerland",
    "tms_id": "242",
    "language_name_en": "French"
  },
  "fr-US": {
    "locale": "fr-US",
    "language_code": "fr",
    "language_name": "French",
    "language_native_name": "Fran\u00E7ais",
    "language_direction": "LTR",
    "country_code": "US",
    "country_name": "United States",
    "tms_id": "97",
    "language_name_en": "French (Cajun)"
  },
  "de-DE": {
    "locale": "de-DE",
    "language_code": "de",
    "language_name": "German",
    "language_native_name": "Deutsch",
    "language_direction": "LTR",
    "country_code": "DE",
    "country_name": "Germany",
    "tms_id": "53",
    "language_name_en": "German"
  },
  "de-CH": {
    "locale": "de-CH",
    "language_code": "de",
    "language_name": "German",
    "language_native_name": "Deutsch",
    "language_direction": "LTR",
    "country_code": "CH",
    "country_name": "Switzerland",
    "tms_id": "240",
    "language_name_en": "German"
  },
  "de-AT": {
    "locale": "de-AT",
    "language_code": "de",
    "language_name": "German",
    "language_native_name": "Deutsch",
    "language_direction": "LTR",
    "country_code": "AT",
    "country_name": "Austria",
    "tms_id": "243",
    "language_name_en": "German"
  },
  "el-GR": {
    "locale": "el-GR",
    "language_code": "el",
    "language_name": "Greek",
    "language_native_name": "ελληνικά",
    "language_direction": "LTR",
    "country_code": "GR",
    "country_name": "Greece",
    "tms_id": "59",
    "language_name_en": "Greek"
  },
  "he-IL": {
    "locale": "he-IL",
    "language_code": "he",
    "language_name": "Hebrew",
    "language_native_name": "עִברִית",
    "language_direction": "RTL",
    "country_code": "IL",
    "country_name": "Israel",
    "tms_id": "108",
    "language_name_en": "Hebrew"
  },
  "ht-HT": {
    "locale": "ht-HT",
    "language_code": "ht",
    "language_name": "Haitian Creole",
    "language_native_name": "Kreyòl ayisyen",
    "language_direction": "LTR",
    "country_code": "HT",
    "country_name": "Haiti",
    "tms_id": "113",
    "language_name_en": "Haitian Creole"
  },
  "hi-IN": {
    "locale": "hi-IN",
    "language_code": "hi",
    "language_name": "Hindi",
    "language_native_name": "\"हिन्दी",
    "language_direction": " हिंदी\"",
    "country_code": "LTR",
    "country_name": "IN",
    "tms_id": "India",
    "undefined": "109",
    "language_name_en": "Hindi"
  },
  "hu-HU": {
    "locale": "hu-HU",
    "language_code": "hu",
    "language_name": "Hungarian",
    "language_native_name": "Magyar",
    "language_direction": "LTR",
    "country_code": "HU",
    "country_name": "Hungary",
    "tms_id": "114",
    "language_name_en": "Hungarian"
  },
  "id-ID": {
    "locale": "id-ID",
    "language_code": "id",
    "language_name": "Indonesian",
    "language_native_name": "Indonesian",
    "language_direction": "LTR",
    "country_code": "ID",
    "country_name": "Indonesia",
    "tms_id": "116",
    "language_name_en": "Indonesian"
  },
  "it-IT": {
    "locale": "it-IT",
    "language_code": "it",
    "language_name": "Italian",
    "language_native_name": "Italiano",
    "language_direction": "LTR",
    "country_code": "IT",
    "country_name": "Italy",
    "tms_id": "120",
    "language_name_en": "Italian"
  },
  "it-CH": {
    "locale": "it-CH",
    "language_code": "it",
    "language_name": "Italian",
    "language_native_name": "Italiano",
    "language_direction": "LTR",
    "country_code": "CH",
    "country_name": "Switzerland",
    "tms_id": "241",
    "language_name_en": "Italian"
  },
  "ja-JP": {
    "locale": "ja-JP",
    "language_code": "ja",
    "language_name": "Japanese",
    "language_native_name": "日本語",
    "language_direction": "LTR",
    "country_code": "JP",
    "country_name": "Japan",
    "tms_id": "121",
    "language_name_en": "Japanese"
  },
  "ko-KR": {
    "locale": "ko-KR",
    "language_code": "ko",
    "language_name": "Korean",
    "language_native_name": "한국어",
    "language_direction": "LTR",
    "country_code": "KR",
    "country_name": "Korea",
    "tms_id": "132",
    "language_name_en": "Korean"
  },
  "lv-LV": {
    "locale": "lv-LV",
    "language_code": "lv",
    "language_name": "Latvian",
    "language_native_name": "Latviešu valoda",
    "language_direction": "LTR",
    "country_code": "LV",
    "country_name": "Latvia",
    "tms_id": "145",
    "language_name_en": "Latvian"
  },
  "lt-LT": {
    "locale": "lt-LT",
    "language_code": "lt",
    "language_name": "Lithuanian",
    "language_native_name": "Lietuvių kalba",
    "language_direction": "LTR",
    "country_code": "LT",
    "country_name": "Lithuania",
    "tms_id": "143",
    "language_name_en": "Lithuanian"
  },
  "ms-MY": {
    "locale": "ms-MY",
    "language_code": "ms",
    "language_name": "Malay Bahasa Melayu",
    "language_native_name": "بهاس ملايو‎",
    "language_direction": "RTL",
    "country_code": "MY",
    "country_name": "Malaysia",
    "tms_id": "154",
    "language_name_en": "Malay Bahasa Melayu"
  },
  "mt-MT": {
    "locale": "mt-MT",
    "language_code": "mt",
    "language_name": "Maltese",
    "language_native_name": "Malti",
    "language_direction": "LTR",
    "country_code": "MT",
    "country_name": "Malta",
    "tms_id": "155",
    "language_name_en": "Maltese"
  },
  "no-NO": {
    "locale": "no-NO",
    "language_code": "no",
    "language_name": "Norwegian",
    "language_native_name": "Norsk",
    "language_direction": "LTR",
    "country_code": "NO",
    "country_name": "Norway",
    "tms_id": "165",
    "language_name_en": "Norwegian"
  },
  "pl-PL": {
    "locale": "pl-PL",
    "language_code": "pl",
    "language_name": "Polish",
    "language_native_name": "Język polski",
    "language_direction": "LTR",
    "country_code": "PL",
    "country_name": "Poland",
    "tms_id": "177",
    "language_name_en": "Polish"
  },
  "pt-BR": {
    "locale": "pt-BR",
    "language_code": "pt",
    "language_name": "Portuguese",
    "language_native_name": "Português",
    "language_direction": "LTR",
    "country_code": "BR",
    "country_name": "Brazil",
    "tms_id": "179",
    "language_name_en": "Portuguese"
  },
  "pt-PT": {
    "locale": "pt-PT",
    "language_code": "pt",
    "language_name": "Portuguese",
    "language_native_name": "Português",
    "language_direction": "LTR",
    "country_code": "PT",
    "country_name": "Portugal",
    "tms_id": "180",
    "language_name_en": "Portuguese"
  },
  "ro-RO": {
    "locale": "ro-RO",
    "language_code": "ro",
    "language_name": "Romanian",
    "language_native_name": "Limba Română",
    "language_direction": "LTR",
    "country_code": "RO",
    "country_name": "Romania",
    "tms_id": "185",
    "language_name_en": "Romanian"
  },
  "ru-RU": {
    "locale": "ru-RU",
    "language_code": "ru",
    "language_name": "Russian",
    "language_native_name": "Русский",
    "language_direction": "LTR",
    "country_code": "RU",
    "country_name": "Russia",
    "tms_id": "186",
    "language_name_en": "Russian"
  },
  "sk-SK": {
    "locale": "sk-SK",
    "language_code": "sk",
    "language_name": "Slovak",
    "language_native_name": "सराइकी",
    "language_direction": "LTR",
    "country_code": "SK",
    "country_name": "Slovakia",
    "tms_id": "193",
    "language_name_en": "Slovak"
  },
  "sl-SI": {
    "locale": "sl-SI",
    "language_code": "sl",
    "language_name": "Slovenian",
    "language_native_name": "Slovenski jezik",
    "language_direction": "LTR",
    "country_code": "SI",
    "country_name": "Slovenia",
    "tms_id": "194",
    "language_name_en": "Slovenian"
  },
  "es-AR": {
    "locale": "es-AR",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "AR",
    "country_name": "Argentina",
    "tms_id": "66",
    "language_name_en": "Spanish"
  },
  "es-BO": {
    "locale": "es-BO",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "BO",
    "country_name": "Bolivia",
    "tms_id": "67",
    "language_name_en": "Spanish"
  },
  "es-CL": {
    "locale": "es-CL",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "CL",
    "country_name": "Chile",
    "tms_id": "68",
    "language_name_en": "Spanish"
  },
  "es-CO": {
    "locale": "es-CO",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "CO",
    "country_name": "Colombia",
    "tms_id": "69",
    "language_name_en": "Spanish"
  },
  "es-CR": {
    "locale": "es-CR",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "CR",
    "country_name": "Costa Rica",
    "tms_id": "70",
    "language_name_en": "Spanish"
  },
  "es-CU": {
    "locale": "es-CU",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "CU",
    "country_name": "Cuba",
    "tms_id": "71",
    "language_name_en": "Spanish"
  },
  "es-DO": {
    "locale": "es-DO",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "DO",
    "country_name": "Dominican Republic",
    "tms_id": "72",
    "language_name_en": "Spanish"
  },
  "es-EC": {
    "locale": "es-EC",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "EC",
    "country_name": "Ecuador",
    "tms_id": "73",
    "language_name_en": "Spanish"
  },
  "es-ES": {
    "locale": "es-ES",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "ES",
    "country_name": "Spain",
    "tms_id": "74",
    "language_name_en": "Spanish"
  },
  "es-GT": {
    "locale": "es-GT",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "GT",
    "country_name": "Guatemala",
    "tms_id": "75",
    "language_name_en": "Spanish"
  },
  "es-HN": {
    "locale": "es-HN",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "HN",
    "country_name": "Honduras",
    "tms_id": "76",
    "language_name_en": "Spanish"
  },
  "es-MX": {
    "locale": "es-MX",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "MX",
    "country_name": "Mexico",
    "tms_id": "77",
    "language_name_en": "Spanish"
  },
  "es-NI": {
    "locale": "es-NI",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "NI",
    "country_name": "Nicaragua",
    "tms_id": "78",
    "language_name_en": "Spanish"
  },
  "es-PA": {
    "locale": "es-PA",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "PA",
    "country_name": "Panama",
    "tms_id": "79",
    "language_name_en": "Spanish"
  },
  "es-PE": {
    "locale": "es-PE",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "PE",
    "country_name": "Peru",
    "tms_id": "80",
    "language_name_en": "Spanish"
  },
  "es-PR": {
    "locale": "es-PR",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "PR",
    "country_name": "Puerto Rico",
    "tms_id": "81",
    "language_name_en": "Spanish"
  },
  "es-PY": {
    "locale": "es-PY",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "PY",
    "country_name": "Paraguay",
    "tms_id": "82",
    "language_name_en": "Spanish"
  },
  "es-SV": {
    "locale": "es-SV",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "SV",
    "country_name": "El Salvador",
    "tms_id": "83",
    "language_name_en": "Spanish"
  },
  "es-UY": {
    "locale": "es-UY",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "UY",
    "country_name": "Uruguay",
    "tms_id": "85",
    "language_name_en": "Spanish"
  },
  "es-VE": {
    "locale": "es-VE",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "VE",
    "country_name": "Venezuela",
    "tms_id": "86",
    "language_name_en": "Spanish"
  },
  "es-US": {
    "locale": "es-US",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "US",
    "country_name": "United States",
    "tms_id": "84",
    "language_name_en": "Spanish"
  },
  "es_419": {
    "locale": "es_419",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "419",
    "country_name": "Latin America",
    "tms_id": "251",
    "language_name_en": "Spanish"
  },
  "sw-TZ": {
    "locale": "sw-TZ",
    "language_code": "sw",
    "language_name": "Swahili",
    "language_native_name": "Kiswahili",
    "language_direction": "LTR",
    "country_code": "TZ",
    "country_name": "Tanzania",
    "tms_id": "204",
    "language_name_en": "Swahili"
  },
  "sv-SE": {
    "locale": "sv-SE",
    "language_code": "sv",
    "language_name": "Swedish",
    "language_native_name": "Svenska",
    "language_direction": "LTR",
    "country_code": "SE",
    "country_name": "Sweden",
    "tms_id": "203",
    "language_name_en": "Swedish"
  },
  "th-TH": {
    "locale": "th-TH",
    "language_code": "th",
    "language_name": "Thai",
    "language_native_name": "ไทย",
    "language_direction": "LTR",
    "country_code": "TH",
    "country_name": "Thailand",
    "tms_id": "208",
    "language_name_en": "Thai"
  },
  "tr-TR": {
    "locale": "tr-TR",
    "language_code": "tr",
    "language_name": "Turkish",
    "language_native_name": "Türk\u00E7e",
    "language_direction": "LTR",
    "country_code": "TR",
    "country_name": "Turkey",
    "tms_id": "215",
    "language_name_en": "Turkish"
  },
  "uk-UA": {
    "locale": "uk-UA",
    "language_code": "uk",
    "language_name": "Ukrainian",
    "language_native_name": "українська мова",
    "language_direction": "LTR",
    "country_code": "UA",
    "country_name": "Ukraine",
    "tms_id": "222",
    "language_name_en": "Ukrainian"
  },
  "ur-PK": {
    "locale": "ur-PK",
    "language_code": "ur",
    "language_name": "Urdu",
    "language_native_name": "اردو",
    "language_direction": "RTL",
    "country_code": "PK",
    "country_name": "Pakistan",
    "tms_id": "224",
    "language_name_en": "Urdu"
  },
  "vi-VN": {
    "locale": "vi-VN",
    "language_code": "vi",
    "language_name": "Vietnamese",
    "language_native_name": "Việtnam",
    "language_direction": "LTR",
    "country_code": "VN",
    "country_name": "Viet Nam",
    "tms_id": "227",
    "language_name_en": "Vietnamese"
  },
  "cy-GB": {
    "locale": "cy-GB",
    "language_code": "cy",
    "language_name": "Welsh",
    "language_native_name": "Cymraeg",
    "language_direction": "LTR",
    "country_code": "GB",
    "country_name": "United Kingdom",
    "tms_id": "51",
    "language_name_en": "Welsh"
  }
};
