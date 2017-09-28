describe('Multi Filter', function() {

  var $filter;


  var entity1 = {
    id: '1234',
    name: 'Test Blog',
    source: {
      locale: 'en-US',
      status: 'importing'
    },
    statuses: {
      'ar-AE': "none",
      'de-DE': "none",
      'fr-FR': "pending"
    },
    type: 'blog-posts',
    url: 'blog/test-blog'
  };

  var entity2 = {
    id: '1235',
    name: 'My Blog',
    source: {
      locale: 'en-US',
      status: 'edited'
    },
    statuses: {
      'ar-AE': "importing",
      'de-DE': "none",
      'fr-FR': "pending"
    },
    type: 'blog-posts',
    url: 'blog/my-blog'
  };

  var entity3 = {
    id: '1236',
    name: 'Your Blog',
    source: {
      locale: 'en-US',
      status: 'current'
    },
    statuses: {
      'ar-AE': "importing",
      'de-DE': "none",
      'fr-FR': "pending"
    },
    type: 'blog-posts',
    url: 'blog/your-blog'
  };

  var entity4 = {
    id: '1237',
    name: 'Their Blog',
    source: {
      locale: 'en-US',
      status: 'importing'
    },
    statuses: {
      'ar-AE': "importing",
      'de-DE': "none",
      'fr-FR': "pending"
    },
    type: 'blog-posts',
    url: 'blog/their-blog'
  };

  var entities = [entity1, entity2, entity3];

  beforeEach(angular.mock.module('app.filters'));

  beforeEach(inject(function($injector) {
    $filter = $injector.get('$filter');
  }));

  it('should exist', function() {
    expect($filter('multiFilter')).toBeDefined();
  });

  it('should return the input when either input is undefined', function() {
    var searchGroup;
    var searchObject;
    var result = $filter('multiFilter')(searchGroup, searchObject);
    expect(result).toEqual(undefined);
    searchGroup = entities;
    result = $filter('multiFilter')(searchGroup, searchObject);
    expect(result).toEqual(entities);
  });

  it('should return the input if an attribute of searchObject is not present', function() {
    var searchGroup = entities;
    var searchObject = {
      names: [],
      urls: [],
      wildcards: [],
    };
    var result = $filter('multiFilter')(searchGroup, searchObject);
    expect(result).toEqual(entities);
  });

  it('should return edited statuses', function() {
    var searchGroup = entities;
    var searchObject = {
      names: [],
      urls: [],
      wildcards: [],
      statuses: ['edited']
    };
    var result = $filter('multiFilter')(searchGroup, searchObject);
    var shouldBe = [entity2];
    expect(result).toEqual(shouldBe);
  });

  it('should return importing statuses', function() {
    var searchGroup = entities;
    searchGroup.push(entity4);
    var searchObject = {
      names: [],
      urls: [],
      wildcards: [],
      statuses: ['importing']
    };
    var result = $filter('multiFilter')(searchGroup, searchObject);
    var shouldBe = [entity2, entity3, entity4, entity1];
    expect(result).toEqual(shouldBe);
  });

  it('should return everything with blog in the title', function() {
    var searchGroup = entities;
    var searchObject = {
      names: ['blog'],
      urls: [],
      wildcards: [],
      statuses: []
    };
    var result = $filter('multiFilter')(searchGroup, searchObject);
    var shouldBe = entities;
    expect(result).toEqual(shouldBe);
  });

  it('should return entities with your-blog in the path', function() {
    var searchGroup = entities;
    var searchObject = {
      names: [],
      urls: ['your-blog'],
      wildcards: [],
      statuses: []
    };
    var result = $filter('multiFilter')(searchGroup, searchObject);
    var shouldBe = [entity3];
    expect(result).toEqual(shouldBe);
  });

  it('should return entities with your-blog in the path', function() {
    var searchGroup = entities;
    var searchObject = {
      names: [],
      urls: [],
      wildcards: ['en-US'],
      statuses: []
    };
    var result = $filter('multiFilter')(searchGroup, searchObject);
    var shouldBe = entities;
    expect(result).toEqual(shouldBe);
  });

});
