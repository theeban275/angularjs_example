log = function(object) {
	console.log(object);
}

USER_API = 'http://gdata.youtube.com/feeds/api/users/:user/uploads';
SEARCH_API = 'http://gdata.youtube.com/feeds/api/videos';

default_options = {alt:'jsonc', v:2, callback:'JSON_CALLBACK'};

angular.module("YoutubeFeeder", ['ngResource'])

function YoutubeCtrl($scope, $resource) {

	$scope.feeds = [
		{
			name: 'GameSpot', 
			api: USER_API, 
			options: $.extend(default_options, {user:'gamespot'})
		},
		{
			name: 'Sports',
			api: SEARCH_API,
			options: $.extend(default_options, {q:'sports'})
		}
	];

	$scope.entries = [];

	$scope.hasEntries = function() {
		return $scope.entries != undefined && $scope.entries > 0;
	}

	$scope.addFeed = function() {
		$scope.feeds.push({name:$scope.search, api: SEARCH_API, options: $.extend(default_options, {q:$scope.search})});
	}

	$scope.showFeed = function(index) {
		var feed = $scope.feeds[index];
		var resource = $resource(feed.api, feed.options, {get:{method:'JSONP'}});
		resource.get(function(result) {
			$scope.entries = result.data.items;
			log(result.data);
		});
	}

}
