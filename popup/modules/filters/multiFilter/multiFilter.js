angular.module('app.filters').filter('multiFilter', ['$filter', function($filter) {

  // input: searchGroup is a list of entities, searchObject is an object containing lists to parse on.
  return function(searchGroup, searchObject, searchOpen) {
    if (!searchGroup || !searchObject || !searchOpen) {return searchGroup;}

    // pull the arrays off the returned object for ease of access below
    var names = searchObject.names;
    var urls = searchObject.urls;
    var wildcards = searchObject.wildcards;
    var statuses = searchObject.statuses;
    var translationProfiles = searchObject.translationProfiles;
    var types = searchObject.types;
    var ids = searchObject.ids;
    var object = {};

    if (!names || !urls || !wildcards || !statuses || !translationProfiles || !types || !ids) {
      return searchGroup;
    }

    // filter the searchGroup based on each name in the array
    for (var i = 0; i < names.length; i++) {
      object = {name: names[i]};
      searchGroup = $filter('filter')(searchGroup, object);
    }
    // filter the searchGroup based on each url in the array
    for (i = 0; i < urls.length; i++) {
      object = {url: urls[i]};
      searchGroup = $filter('filter')(searchGroup, object);
    }

    // filter the searchGroup based on each translation profile name in the array
    for (i = 0; i < translationProfiles.length; i++) {
      object = {translation_profile_name: translationProfiles[i]};
      searchGroup = $filter('filter')(searchGroup, object);
    }

    // filter the searchGroup based on each type name in the array
    for (i = 0; i < types.length; i++) {
      object = {type: types[i]};
      searchGroup = $filter('filter')(searchGroup, object);
    }

    // filter the searchGroup based on each id in the array
    for (i = 0; i < ids.length; i++) {
      object = {id: ids[i]};
      searchGroup = $filter('filter')(searchGroup, object);
    }

    // filter the searchGroup based on each status in the array, since we look at the status in two different places
    // this loop is slightly different, we filter the array on both places and then concat the two arrays together
    // if we didn't to this then no results would return unless the status was the same in both places, which is usually not the case
    for (i = 0; i < statuses.length; i++) {
      // search for the status on source
      var tempSearchGroup = searchGroup;
      object = { source: { status: statuses[i]} };
      tempSearchGroup = $filter('filter')(searchGroup, object);

      // search for the statuses of the target languages
      object = { statuses: { $: statuses[i]} };
      searchGroup = $filter('filter')(searchGroup, object);
      // after doing both searches we combine the arrays
      for (var j = 0; j < tempSearchGroup.length; j++) {
        var toAdd = tempSearchGroup[j];
        var found = false;
        for (var k = 0; k < searchGroup.length; k++) {
          var toCheck = searchGroup[k];
          // this prevents duplicate entities from being added  to the array
          if (toCheck.id === toAdd.id) {
            found = true;
          }
        }
        // if the entity is not found then we add it to the search results
        if (!found) {
          searchGroup.push(toAdd);
        }
      }
    }
    // filter the searchGroup based on each wildcard in the array
    // the wildcard will search deeper and is added to the object as the $ attribute
    // see https://docs.angularjs.org/api/ng/filter/filter for documentation on this
    for (i = 0; i < wildcards.length; i++) {
      object = {$: wildcards[i]};
      searchGroup = $filter('filter')(searchGroup, object);
    }
    return searchGroup;
  };
}]);
