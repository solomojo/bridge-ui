var app = angular.module('popupApp', [
  'checklist-model',
  'uiMessage',
  'ngMaterial',
  'pascalprecht.translate',
  'app.factories',
  'app.directives',
  'app.components',
  'app.filters',
  'app.controllers'
])

.config([
  '$compileProvider','$sceDelegateProvider', function($compileProvider, $sceDelegateProvider){
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'chrome-extension://*'
    ]);
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension):|data:image\//);
}])

  .config(['$translateProvider', function ($translateProvider) {
    // add translation table
    $translateProvider.useStaticFilesLoader({
      prefix: 'locales/',
      suffix: '/locale.json'
    });
    $translateProvider.preferredLanguage('en_US');
  }])

  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    var customPrimary = {
      '50': '#a8c7e7',
      '100': '#94bae2',
      '200': '#80aedc',
      '300': '#6ca1d7',
      '400': '#5894d1',
      '500': '#4487cc',
      '600': '#357ac2',
      '700': '#2f6eae',
      '800': '#2a619a',
      '900': '#245486',
      'A100': '#bcd4ed',
      'A200': '#d0e1f2',
      'A400': '#e4eef8',
      'A700': '#1f4872'
    };
    $mdThemingProvider.definePalette('customPrimary', customPrimary);

    var customAccent = {
      '50': '#04080d',
      '100': '#091521',
      '200': '#0e2236',
      '300': '#142e4a',
      '400': '#193b5e',
      '500': '#1f4772',
      '600': '#29619a',
      '700': '#2f6dae',
      '800': '#347ac2',
      '900': '#4387cd',
      'A100': '#29619a',
      'A200': '#245486',
      'A400': '#1f4772',
      'A700': '#5793d2'
    };
    $mdThemingProvider.definePalette('customAccent', customAccent);

    $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent');
}]);
