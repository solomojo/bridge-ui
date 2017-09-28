describe('targetBtns.js', function() {

  var $sce, $compile, targetBtns, scope;

  beforeEach(angular.mock.module('app.components'));

  beforeEach(module(function ($provide) {
    $provide.provider('CONFIG', function () {
      this.chrome.options.showAdvancedOptions = true;
    });
  }));

  beforeEach(inject(function($injector, $rootScope) {
    $sce = $injector.get('$sce');
    $compile = $injector.get('$compile');
    scope = $rootScope.$new();
  }));

  beforeEach(function () {
    targetBtns = getCompiledElement();
  });

  function getCompiledElement () {
    var element = angular.element('<div class="target-btns"></div>');
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  // it('should have div element', function () {
  //   var divElement = targetBtns.find('div');
  //   expect(divElement).toBeDefined();
  // });
  //
  // it('should ', function() {
  //   scope.forceDownload();
  // });

});
