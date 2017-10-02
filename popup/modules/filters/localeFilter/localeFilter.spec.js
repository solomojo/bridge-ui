describe('localeFilter', function() {

  var $filter, $sce;

  // for testing with $sce
  // http://stackoverflow.com/questions/20946418/unit-testing-the-output-of-sce-trustashtml-in-angular

  beforeEach(angular.mock.module('app.filters'));

  beforeEach(inject(function($injector) {
    $filter = $injector.get('$filter');
    $sce = $injector.get('$sce');
  }));

  it('should exist', function() {
    expect($filter('localeFilter')).toBeDefined();
  });

  it('should return undefined', function() {
    var localeCode;
    var result = $filter('localeFilter')(localeCode);
    expect(result).toEqual(undefined);
  });

  it('should return the locale string with ...', function() {
    var localeCode = 'ar-AE';
    var result = $filter('localeFilter')(localeCode);
    var shouldBe = '[ar_AE] Arabic, United Ara...';
    expect($sce.getTrustedHtml(result)).toEqual(shouldBe);
  });

  it('should return the locale string without ...', function() {
    var localeCode = 'th-TH';
    var result = $filter('localeFilter')(localeCode);
    var shouldBe = '[th_TH] Thai, Thailand';
    expect($sce.getTrustedHtml(result)).toEqual(shouldBe);
  });

  it('should return the negative language name', function() {
    var localeCode = 'de-DE';
    var result = $filter('localeFilter')(localeCode, true);
    var shouldBe = 'Deutsch';
    expect($sce.getTrustedHtml(result)).toEqual(shouldBe);
  });

});
