angular.module('app.filters').filter('localeFilter', ['$sce', function($sce) {

  return function(localeCode, languageOnly, countryOnly) {
    if (!localeCode) {
      return;
    }
    localeCode = localeCode.replace('-', '_');
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
  "ar_AE": {
    "locale": "ar_AE",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "AE",
    "country_name": "United Arab Emirates",
    "tms_id": "8",
    "language_name_en": "Arabic"
  },
  "ar_AF": {
    "locale": "ar_AF",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "AF",
    "country_name": "Afghanistan",
    "tms_id": "9",
    "language_name_en": "Arabic"
  },
  "ar_BH": {
    "locale": "ar_BH",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "BH",
    "country_name": "Bahrain",
    "tms_id": "10",
    "language_name_en": "Arabic"
  },
  "ar_DZ": {
    "locale": "ar_DZ",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "DZ",
    "country_name": "Algeria",
    "tms_id": "11",
    "language_name_en": "Arabic"
  },
  "ar_EG": {
    "locale": "ar_EG",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "EG",
    "country_name": "Egypt",
    "tms_id": "12",
    "language_name_en": "Arabic"
  },
  "ar_IQ": {
    "locale": "ar_IQ",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "IQ",
    "country_name": "Iraq",
    "tms_id": "13",
    "language_name_en": "Arabic"
  },
  "ar_JO": {
    "locale": "ar_JO",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "JO",
    "country_name": "Jordan",
    "tms_id": "14",
    "language_name_en": "Arabic"
  },
  "ar_LY": {
    "locale": "ar_LY",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "LY",
    "country_name": "Libya",
    "tms_id": "15",
    "language_name_en": "Arabic"
  },
  "ar_MA": {
    "locale": "ar_MA",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "MA",
    "country_name": "Morocco",
    "tms_id": "16",
    "language_name_en": "Arabic"
  },
  "ar_MR": {
    "locale": "ar_MR",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "MR",
    "country_name": "Mauritania",
    "tms_id": "17",
    "language_name_en": "Arabic"
  },
  "ar_OM": {
    "locale": "ar_OM",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "OM",
    "country_name": "Oman",
    "tms_id": "18",
    "language_name_en": "Arabic"
  },
  "ar_SA": {
    "locale": "ar_SA",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "SA",
    "country_name": "Saudi Arabia",
    "tms_id": "19",
    "language_name_en": "Arabic"
  },
  "ar_SD": {
    "locale": "ar_SD",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "SD",
    "country_name": "Sudan",
    "tms_id": "20",
    "language_name_en": "Arabic"
  },
  "ar_SY": {
    "locale": "ar_SY",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "SY",
    "country_name": "Syria",
    "tms_id": "21",
    "language_name_en": "Arabic"
  },
  "ar_TD": {
    "locale": "ar_TD",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "TD",
    "country_name": "Chad",
    "tms_id": "22",
    "language_name_en": "Arabic"
  },
  "ar_TN": {
    "locale": "ar_TN",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "TN",
    "country_name": "Tunisia",
    "tms_id": "23",
    "language_name_en": "Arabic"
  },
  "ar_UZ": {
    "locale": "ar_UZ",
    "language_code": "ar",
    "language_name": "Arabic",
    "language_native_name": "العربية",
    "language_direction": "RTL",
    "country_code": "UZ",
    "country_name": "Uzbekistan",
    "tms_id": "24",
    "language_name_en": "Arabic"
  },
  "ar_YE": {
    "locale": "ar_YE",
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
  "bg_BG": {
    "locale": "bg_BG",
    "language_code": "bg",
    "language_name": "Bulgarian",
    "language_native_name": "български език",
    "language_direction": "LTR",
    "country_code": "BG",
    "country_name": "Bulgaria",
    "tms_id": "32",
    "language_name_en": "Bulgarian"
  },
  "ca_ES": {
    "locale": "ca_ES",
    "language_code": "ca",
    "language_name": "Catalan",
    "language_native_name": "Català",
    "language_direction": "LTR",
    "country_code": "ES",
    "country_name": "Spain",
    "tms_id": "40",
    "language_name_en": "Catalan"
  },
  "zh_CN": {
    "locale": "zh_CN",
    "language_code": "zh",
    "language_name": "Chinese",
    "language_native_name": "中文",
    "language_direction": "LTR",
    "country_code": "CN",
    "country_name": "China",
    "tms_id": "234",
    "language_name_en": "Chinese"
  },
  "zh_HK": {
    "locale": "zh_HK",
    "language_code": "zh",
    "language_name": "Chinese",
    "language_native_name": "中文",
    "language_direction": "LTR",
    "country_code": "HK",
    "country_name": "Hong Kong",
    "tms_id": "235",
    "language_name_en": "Chinese"
  },
  "zh_SG": {
    "locale": "zh_SG",
    "language_code": "zh",
    "language_name": "Chinese",
    "language_native_name": "中文",
    "language_direction": "LTR",
    "country_code": "SG",
    "country_name": "Singapore",
    "tms_id": "236",
    "language_name_en": "Chinese"
  },
  "zh_TW": {
    "locale": "zh_TW",
    "language_code": "zh",
    "language_name": "Chinese",
    "language_native_name": "中文",
    "language_direction": "LTR",
    "country_code": "TW",
    "country_name": "Taiwan",
    "tms_id": "237",
    "language_name_en": "Chinese"
  },
  "cs_CZ": {
    "locale": "cs_CZ",
    "language_code": "cs",
    "language_name": "Czech",
    "language_native_name": "čeština",
    "language_direction": "LTR",
    "country_code": "CZ",
    "country_name": "Czech Republic",
    "tms_id": "50",
    "language_name_en": "Czech"
  },
  "da_DK": {
    "locale": "da_DK",
    "language_code": "da",
    "language_name": "Danish",
    "language_native_name": "Dansk",
    "language_direction": "LTR",
    "country_code": "DK",
    "country_name": "Denmark",
    "tms_id": "52",
    "language_name_en": "Danish"
  },
  "nl_NL": {
    "locale": "nl_NL",
    "language_code": "nl",
    "language_name": "Dutch",
    "language_native_name": "Nederlands",
    "language_direction": "LTR",
    "country_code": "NL",
    "country_name": "Netherlands",
    "tms_id": "163",
    "language_name_en": "Dutch"
  },
  "nl_BE": {
    "locale": "nl_BE",
    "language_code": "nl",
    "language_name": "Dutch",
    "language_native_name": "Nederlands",
    "language_direction": "LTR",
    "country_code": "BE",
    "country_name": "Belgium",
    "tms_id": "239",
    "language_name_en": "Dutch"
  },
  "en_AU": {
    "locale": "en_AU",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "AU",
    "country_name": "Australia",
    "tms_id": "60",
    "language_name_en": "English"
  },
  "en_CA": {
    "locale": "en_CA",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "CA",
    "country_name": "Canada",
    "tms_id": "61",
    "language_name_en": "English"
  },
  "en_GB": {
    "locale": "en_GB",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "GB",
    "country_name": "United Kingdom",
    "tms_id": "62",
    "language_name_en": "English"
  },
  "en_US": {
    "locale": "en_US",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "US",
    "country_name": "United States",
    "tms_id": "63",
    "language_name_en": "English"
  },
  "en_ZA": {
    "locale": "en_ZA",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "ZA",
    "country_name": "South Africa",
    "tms_id": "64",
    "language_name_en": "English"
  },
  "en_IE": {
    "locale": "en_IE",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "IE",
    "country_name": "Ireland",
    "tms_id": "250",
    "language_name_en": "English"
  },
  "en_IN": {
    "locale": "en_IN",
    "language_code": "en",
    "language_name": "English",
    "language_native_name": "English",
    "language_direction": "LTR",
    "country_code": "IN",
    "country_name": "India",
    "tms_id": "252",
    "language_name_en": "English"
  },
  "et_EE": {
    "locale": "et_EE",
    "language_code": "et",
    "language_name": "Estonian",
    "language_native_name": "Eesti",
    "language_direction": "LTR",
    "country_code": "EE",
    "country_name": "Estonia",
    "tms_id": "87",
    "language_name_en": "Estonian"
  },
  "fa_IR": {
    "locale": "fa_IR",
    "language_code": "fa",
    "language_name": "Farsi (Persian)",
    "language_native_name": "فارسی",
    "language_direction": "RTL",
    "country_code": "IR",
    "country_name": "Iran",
    "tms_id": "89",
    "language_name_en": "Farsi (Persian)"
  },
  "fi_FI": {
    "locale": "fi_FI",
    "language_code": "fi",
    "language_name": "Finnish",
    "language_native_name": "Suomi",
    "language_direction": "LTR",
    "country_code": "FI",
    "country_name": "Finland",
    "tms_id": "91",
    "language_name_en": "Finnish"
  },
  "fr_CA": {
    "locale": "fr_CA",
    "language_code": "fr",
    "language_name": "French",
    "language_native_name": "Fran\u00E7ais",
    "language_direction": "LTR",
    "country_code": "CA",
    "country_name": "Canadian",
    "tms_id": "95",
    "language_name_en": "French"
  },
  "fr_FR": {
    "locale": "fr_FR",
    "language_code": "fr",
    "language_name": "French",
    "language_native_name": "Fran\u00E7ais",
    "language_direction": "LTR",
    "country_code": "FR",
    "country_name": "France",
    "tms_id": "96",
    "language_name_en": "French"
  },
  "fr_CH": {
    "locale": "fr_CH",
    "language_code": "fr",
    "language_name": "French",
    "language_native_name": "Fran\u00E7ais",
    "language_direction": "LTR",
    "country_code": "CH",
    "country_name": "Switzerland",
    "tms_id": "242",
    "language_name_en": "French"
  },
  "fr_US": {
    "locale": "fr_US",
    "language_code": "fr",
    "language_name": "French",
    "language_native_name": "Fran\u00E7ais",
    "language_direction": "LTR",
    "country_code": "US",
    "country_name": "United States",
    "tms_id": "97",
    "language_name_en": "French (Cajun)"
  },
  "de_DE": {
    "locale": "de_DE",
    "language_code": "de",
    "language_name": "German",
    "language_native_name": "Deutsch",
    "language_direction": "LTR",
    "country_code": "DE",
    "country_name": "Germany",
    "tms_id": "53",
    "language_name_en": "German"
  },
  "de_CH": {
    "locale": "de_CH",
    "language_code": "de",
    "language_name": "German",
    "language_native_name": "Deutsch",
    "language_direction": "LTR",
    "country_code": "CH",
    "country_name": "Switzerland",
    "tms_id": "240",
    "language_name_en": "German"
  },
  "de_AT": {
    "locale": "de_AT",
    "language_code": "de",
    "language_name": "German",
    "language_native_name": "Deutsch",
    "language_direction": "LTR",
    "country_code": "AT",
    "country_name": "Austria",
    "tms_id": "243",
    "language_name_en": "German"
  },
  "el_GR": {
    "locale": "el_GR",
    "language_code": "el",
    "language_name": "Greek",
    "language_native_name": "ελληνικά",
    "language_direction": "LTR",
    "country_code": "GR",
    "country_name": "Greece",
    "tms_id": "59",
    "language_name_en": "Greek"
  },
  "he_IL": {
    "locale": "he_IL",
    "language_code": "he",
    "language_name": "Hebrew",
    "language_native_name": "עִברִית",
    "language_direction": "RTL",
    "country_code": "IL",
    "country_name": "Israel",
    "tms_id": "108",
    "language_name_en": "Hebrew"
  },
  "ht_HT": {
    "locale": "ht_HT",
    "language_code": "ht",
    "language_name": "Haitian Creole",
    "language_native_name": "Kreyòl ayisyen",
    "language_direction": "LTR",
    "country_code": "HT",
    "country_name": "Haiti",
    "tms_id": "113",
    "language_name_en": "Haitian Creole"
  },
  "hi_IN": {
    "locale": "hi_IN",
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
  "hu_HU": {
    "locale": "hu_HU",
    "language_code": "hu",
    "language_name": "Hungarian",
    "language_native_name": "Magyar",
    "language_direction": "LTR",
    "country_code": "HU",
    "country_name": "Hungary",
    "tms_id": "114",
    "language_name_en": "Hungarian"
  },
  "id_ID": {
    "locale": "id_ID",
    "language_code": "id",
    "language_name": "Indonesian",
    "language_native_name": "Indonesian",
    "language_direction": "LTR",
    "country_code": "ID",
    "country_name": "Indonesia",
    "tms_id": "116",
    "language_name_en": "Indonesian"
  },
  "it_IT": {
    "locale": "it_IT",
    "language_code": "it",
    "language_name": "Italian",
    "language_native_name": "Italiano",
    "language_direction": "LTR",
    "country_code": "IT",
    "country_name": "Italy",
    "tms_id": "120",
    "language_name_en": "Italian"
  },
  "it_CH": {
    "locale": "it_CH",
    "language_code": "it",
    "language_name": "Italian",
    "language_native_name": "Italiano",
    "language_direction": "LTR",
    "country_code": "CH",
    "country_name": "Switzerland",
    "tms_id": "241",
    "language_name_en": "Italian"
  },
  "ja_JP": {
    "locale": "ja_JP",
    "language_code": "ja",
    "language_name": "Japanese",
    "language_native_name": "日本語",
    "language_direction": "LTR",
    "country_code": "JP",
    "country_name": "Japan",
    "tms_id": "121",
    "language_name_en": "Japanese"
  },
  "ko_KR": {
    "locale": "ko_KR",
    "language_code": "ko",
    "language_name": "Korean",
    "language_native_name": "한국어",
    "language_direction": "LTR",
    "country_code": "KR",
    "country_name": "Korea",
    "tms_id": "132",
    "language_name_en": "Korean"
  },
  "lv_LV": {
    "locale": "lv_LV",
    "language_code": "lv",
    "language_name": "Latvian",
    "language_native_name": "Latviešu valoda",
    "language_direction": "LTR",
    "country_code": "LV",
    "country_name": "Latvia",
    "tms_id": "145",
    "language_name_en": "Latvian"
  },
  "lt_LT": {
    "locale": "lt_LT",
    "language_code": "lt",
    "language_name": "Lithuanian",
    "language_native_name": "Lietuvių kalba",
    "language_direction": "LTR",
    "country_code": "LT",
    "country_name": "Lithuania",
    "tms_id": "143",
    "language_name_en": "Lithuanian"
  },
  "ms_MY": {
    "locale": "ms_MY",
    "language_code": "ms",
    "language_name": "Malay Bahasa Melayu",
    "language_native_name": "بهاس ملايو‎",
    "language_direction": "RTL",
    "country_code": "MY",
    "country_name": "Malaysia",
    "tms_id": "154",
    "language_name_en": "Malay Bahasa Melayu"
  },
  "mt_MT": {
    "locale": "mt_MT",
    "language_code": "mt",
    "language_name": "Maltese",
    "language_native_name": "Malti",
    "language_direction": "LTR",
    "country_code": "MT",
    "country_name": "Malta",
    "tms_id": "155",
    "language_name_en": "Maltese"
  },
  "no_NO": {
    "locale": "no_NO",
    "language_code": "no",
    "language_name": "Norwegian",
    "language_native_name": "Norsk",
    "language_direction": "LTR",
    "country_code": "NO",
    "country_name": "Norway",
    "tms_id": "165",
    "language_name_en": "Norwegian"
  },
  "pl_PL": {
    "locale": "pl_PL",
    "language_code": "pl",
    "language_name": "Polish",
    "language_native_name": "Język polski",
    "language_direction": "LTR",
    "country_code": "PL",
    "country_name": "Poland",
    "tms_id": "177",
    "language_name_en": "Polish"
  },
  "pt_BR": {
    "locale": "pt_BR",
    "language_code": "pt",
    "language_name": "Portuguese",
    "language_native_name": "Português",
    "language_direction": "LTR",
    "country_code": "BR",
    "country_name": "Brazil",
    "tms_id": "179",
    "language_name_en": "Portuguese"
  },
  "pt_PT": {
    "locale": "pt_PT",
    "language_code": "pt",
    "language_name": "Portuguese",
    "language_native_name": "Português",
    "language_direction": "LTR",
    "country_code": "PT",
    "country_name": "Portugal",
    "tms_id": "180",
    "language_name_en": "Portuguese"
  },
  "ro_RO": {
    "locale": "ro_RO",
    "language_code": "ro",
    "language_name": "Romanian",
    "language_native_name": "Limba Română",
    "language_direction": "LTR",
    "country_code": "RO",
    "country_name": "Romania",
    "tms_id": "185",
    "language_name_en": "Romanian"
  },
  "ru_RU": {
    "locale": "ru_RU",
    "language_code": "ru",
    "language_name": "Russian",
    "language_native_name": "Русский",
    "language_direction": "LTR",
    "country_code": "RU",
    "country_name": "Russia",
    "tms_id": "186",
    "language_name_en": "Russian"
  },
  "sk_SK": {
    "locale": "sk_SK",
    "language_code": "sk",
    "language_name": "Slovak",
    "language_native_name": "सराइकी",
    "language_direction": "LTR",
    "country_code": "SK",
    "country_name": "Slovakia",
    "tms_id": "193",
    "language_name_en": "Slovak"
  },
  "sl_SI": {
    "locale": "sl_SI",
    "language_code": "sl",
    "language_name": "Slovenian",
    "language_native_name": "Slovenski jezik",
    "language_direction": "LTR",
    "country_code": "SI",
    "country_name": "Slovenia",
    "tms_id": "194",
    "language_name_en": "Slovenian"
  },
  "es_AR": {
    "locale": "es_AR",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "AR",
    "country_name": "Argentina",
    "tms_id": "66",
    "language_name_en": "Spanish"
  },
  "es_BO": {
    "locale": "es_BO",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "BO",
    "country_name": "Bolivia",
    "tms_id": "67",
    "language_name_en": "Spanish"
  },
  "es_CL": {
    "locale": "es_CL",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "CL",
    "country_name": "Chile",
    "tms_id": "68",
    "language_name_en": "Spanish"
  },
  "es_CO": {
    "locale": "es_CO",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "CO",
    "country_name": "Colombia",
    "tms_id": "69",
    "language_name_en": "Spanish"
  },
  "es_CR": {
    "locale": "es_CR",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "CR",
    "country_name": "Costa Rica",
    "tms_id": "70",
    "language_name_en": "Spanish"
  },
  "es_CU": {
    "locale": "es_CU",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "CU",
    "country_name": "Cuba",
    "tms_id": "71",
    "language_name_en": "Spanish"
  },
  "es_DO": {
    "locale": "es_DO",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "DO",
    "country_name": "Dominican Republic",
    "tms_id": "72",
    "language_name_en": "Spanish"
  },
  "es_EC": {
    "locale": "es_EC",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "EC",
    "country_name": "Ecuador",
    "tms_id": "73",
    "language_name_en": "Spanish"
  },
  "es_ES": {
    "locale": "es_ES",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "ES",
    "country_name": "Spain",
    "tms_id": "74",
    "language_name_en": "Spanish"
  },
  "es_GT": {
    "locale": "es_GT",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "GT",
    "country_name": "Guatemala",
    "tms_id": "75",
    "language_name_en": "Spanish"
  },
  "es_HN": {
    "locale": "es_HN",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "HN",
    "country_name": "Honduras",
    "tms_id": "76",
    "language_name_en": "Spanish"
  },
  "es_MX": {
    "locale": "es_MX",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "MX",
    "country_name": "Mexico",
    "tms_id": "77",
    "language_name_en": "Spanish"
  },
  "es_NI": {
    "locale": "es_NI",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "NI",
    "country_name": "Nicaragua",
    "tms_id": "78",
    "language_name_en": "Spanish"
  },
  "es_PA": {
    "locale": "es_PA",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "PA",
    "country_name": "Panama",
    "tms_id": "79",
    "language_name_en": "Spanish"
  },
  "es_PE": {
    "locale": "es_PE",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "PE",
    "country_name": "Peru",
    "tms_id": "80",
    "language_name_en": "Spanish"
  },
  "es_PR": {
    "locale": "es_PR",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "PR",
    "country_name": "Puerto Rico",
    "tms_id": "81",
    "language_name_en": "Spanish"
  },
  "es_PY": {
    "locale": "es_PY",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "PY",
    "country_name": "Paraguay",
    "tms_id": "82",
    "language_name_en": "Spanish"
  },
  "es_SV": {
    "locale": "es_SV",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "SV",
    "country_name": "El Salvador",
    "tms_id": "83",
    "language_name_en": "Spanish"
  },
  "es_UY": {
    "locale": "es_UY",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "UY",
    "country_name": "Uruguay",
    "tms_id": "85",
    "language_name_en": "Spanish"
  },
  "es_VE": {
    "locale": "es_VE",
    "language_code": "es",
    "language_name": "Spanish",
    "language_native_name": "Espa\u00F1ol",
    "language_direction": "LTR",
    "country_code": "VE",
    "country_name": "Venezuela",
    "tms_id": "86",
    "language_name_en": "Spanish"
  },
  "es_US": {
    "locale": "es_US",
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
  "sw_TZ": {
    "locale": "sw_TZ",
    "language_code": "sw",
    "language_name": "Swahili",
    "language_native_name": "Kiswahili",
    "language_direction": "LTR",
    "country_code": "TZ",
    "country_name": "Tanzania",
    "tms_id": "204",
    "language_name_en": "Swahili"
  },
  "sv_SE": {
    "locale": "sv_SE",
    "language_code": "sv",
    "language_name": "Swedish",
    "language_native_name": "Svenska",
    "language_direction": "LTR",
    "country_code": "SE",
    "country_name": "Sweden",
    "tms_id": "203",
    "language_name_en": "Swedish"
  },
  "th_TH": {
    "locale": "th_TH",
    "language_code": "th",
    "language_name": "Thai",
    "language_native_name": "ไทย",
    "language_direction": "LTR",
    "country_code": "TH",
    "country_name": "Thailand",
    "tms_id": "208",
    "language_name_en": "Thai"
  },
  "tr_TR": {
    "locale": "tr_TR",
    "language_code": "tr",
    "language_name": "Turkish",
    "language_native_name": "Türk\u00E7e",
    "language_direction": "LTR",
    "country_code": "TR",
    "country_name": "Turkey",
    "tms_id": "215",
    "language_name_en": "Turkish"
  },
  "uk_UA": {
    "locale": "uk_UA",
    "language_code": "uk",
    "language_name": "Ukrainian",
    "language_native_name": "українська мова",
    "language_direction": "LTR",
    "country_code": "UA",
    "country_name": "Ukraine",
    "tms_id": "222",
    "language_name_en": "Ukrainian"
  },
  "ur_PK": {
    "locale": "ur_PK",
    "language_code": "ur",
    "language_name": "Urdu",
    "language_native_name": "اردو",
    "language_direction": "RTL",
    "country_code": "PK",
    "country_name": "Pakistan",
    "tms_id": "224",
    "language_name_en": "Urdu"
  },
  "vi_VN": {
    "locale": "vi_VN",
    "language_code": "vi",
    "language_name": "Vietnamese",
    "language_native_name": "Việtnam",
    "language_direction": "LTR",
    "country_code": "VN",
    "country_name": "Viet Nam",
    "tms_id": "227",
    "language_name_en": "Vietnamese"
  },
  "cy_GB": {
    "locale": "cy_GB",
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
