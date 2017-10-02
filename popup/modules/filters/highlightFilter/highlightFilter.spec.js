describe('highlightFilter', function() {

  var $filter, $sce;

  // for testing with $sce
  // http://stackoverflow.com/questions/20946418/unit-testing-the-output-of-sce-trustashtml-in-angular

  beforeEach(angular.mock.module('app.filters'));

  beforeEach(inject(function($injector) {
    $filter = $injector.get('$filter');
    $sce = $injector.get('$sce');
  }));

  it('should exist', function() {
    expect($filter('highlight')).toBeDefined();
  });

  it('should return undefined', function() {
    var text;
    var result = $filter('highlight')(text);
    expect(result).toEqual(undefined);
  });

  it('should return highlighted text', function() {
    var text = 'I will highlight this';
    var phrase = 'highlight';
    var result = $filter('highlight')(text, phrase);
    var shouldBe = 'I will <b style="color:black;">highlight</b> this';
    expect($sce.getTrustedHtml(result)).toEqual(shouldBe);
  });

  it('should return the original text', function() {
    var text = 'I will highlight this';
    var phrase;
    var result = $filter('highlight')(text, phrase);
    expect($sce.getTrustedHtml(result)).toEqual(text);
  });

});
