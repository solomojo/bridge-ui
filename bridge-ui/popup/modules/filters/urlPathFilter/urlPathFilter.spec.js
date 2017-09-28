describe('urlPathFilter', function() {

  var $filter;

  beforeEach(angular.mock.module('app.filters'));

  beforeEach(inject(function($injector) {
    $filter = $injector.get('$filter');
  }));

  it('should exist', function() {
    expect($filter('urlPath')).toBeDefined();
  });

  it('should return the input when either input is undefined', function() {
    var input;
    var result = $filter('urlPath')(input);
    expect(result).toEqual(undefined);
  });

  it('should return the correct path', function() {
    var input = 'http://developer-portal.hs-sites.com/blog/-temporary-slug-229';
    var result = $filter('urlPath')(input);
    var shouldBe = 'blog/-temporary-slug-229';
    expect(result).toEqual(shouldBe);
  });

  it('should return the input', function() {
    var input = 'www.google.com';
    var result = $filter('urlPath')(input);
    expect(result).toEqual(input);
  });

});
