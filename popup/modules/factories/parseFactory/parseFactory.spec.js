describe('Parse factory', function() {

  var parseFactory;
  var rootScope;
  beforeEach(angular.mock.module('app.factories'));

  beforeEach(inject(function(_parseFactory_, $injector) {
    parseFactory = _parseFactory_;
    rootScope = $injector.get('$rootScope');
    spyOn(rootScope, '$broadcast');
  }));

  it('should exist', function() {
    expect(parseFactory).toBeDefined();
  });

  it('should parse a string and catch an apostrophe s', function() {
    var searchString = 'in:"blog\'s" test post';
    var result = parseFactory.parseSearchString(searchString);
    var shouldBe = ['in:"blog\'s"', 'test', 'post'];
    expect(result).toEqual(shouldBe);
  });

  it('should search for a dash', function() {
    var searchString = 'test - post';
    var result = parseFactory.parseSearchString(searchString);
    var shouldBe = ['test', '-', 'post'];
    expect(result).toEqual(shouldBe);
  });

  it('should add a dash for a negative search', function() {
    var searchString = 'test -"post"';
    var result = parseFactory.parseSearchString(searchString);
    var shouldBe = ['test', '!"post"'];
    expect(result).toEqual(shouldBe);
  });

  it('should handle complex inner quotes', function() {
    var searchString = 'test -"post \'are pretty\'s "great"\'"';
    var result = parseFactory.parseSearchString(searchString);
    var shouldBe = ['test', '!"post \'are pretty\'s "great"\'"'];
    expect(result).toEqual(shouldBe);
  });

  it('should return a search with only names', function() {
    var searchArray = ['test', '!"post \'are pretty\'s "great"\'"'];
    var result = parseFactory.getSearchObject(searchArray);
    var shouldBe = {
      names: ['test', '!post \'are pretty\'s "great"\''],
      urls: [],
      wildcards: [],
      statuses: []
    };
    expect(result).toEqual(shouldBe);
  });

  it('should return a search with only urls', function() {
    var searchArray = ['in:"test"', 'in:\'blogs\''];
    var result = parseFactory.getSearchObject(searchArray);
    var shouldBe = {
      names: [],
      urls: ['test', 'blogs'],
      wildcards: [],
      statuses: []
    };
    expect(result).toEqual(shouldBe);
  });

  it('should return a search with negative urls', function() {
    var searchArray = ['in:!"test"', 'in:!\'blogs\''];
    var result = parseFactory.getSearchObject(searchArray);
    var shouldBe = {
      names: [],
      urls: ['!test', '!blogs'],
      wildcards: [],
      statuses: []
    };
    expect(result).toEqual(shouldBe);
  });

  it('should add an incomplete url search to the names attribute', function() {
    var searchArray = ['in:"test', 'in:\'blogs\''];
    var result = parseFactory.getSearchObject(searchArray);
    var shouldBe = {
      names: ['in:\"test'],
      urls: ['blogs'],
      wildcards: [],
      statuses: []
    };
    expect(result).toEqual(shouldBe);
  });

  it('should search on all', function() {
    var searchArray = ['all:"test"'];
    var result = parseFactory.getSearchObject(searchArray);
    var shouldBe = {
      names: [],
      urls: [],
      wildcards: ['test'],
      statuses: []
    };
    expect(result).toEqual(shouldBe);
  });

  it('should search on status', function() {
    var searchArray = ['status:"pending"'];
    var result = parseFactory.getSearchObject(searchArray);
    var shouldBe = {
      names: [],
      urls: [],
      wildcards: [],
      statuses: ['pending']
    };
    expect(result).toEqual(shouldBe);
  });

  it('should broadcast togglePath twice', function() {
    // search for url to toggle broadcast and set showPath to true
    var searchArray = ['in:"test"', 'in:\'blogs\''];
    var result = parseFactory.getSearchObject(searchArray);
    var shouldBe = {
      names: [],
      urls: ['test', 'blogs'],
      wildcards: [],
      statuses: []
    };
    expect(result).toEqual(shouldBe);
    expect(rootScope.$broadcast).toHaveBeenCalledWith('togglePath');
    // search for non url to toggle broadcast and set showPath to false
    searchArray = ['test'];
    result = parseFactory.getSearchObject(searchArray);
    shouldBe = {
      names: ['test'],
      urls: [],
      wildcards: [],
      statuses: []
    };
    expect(result).toEqual(shouldBe);
    expect(rootScope.$broadcast).toHaveBeenCalledWith('togglePath');
  });

});
