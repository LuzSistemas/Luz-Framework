/**
 * Created by Pedro Luz on 23/08/2014.
 */
window.BigJS.controller('MasterController', ['$scope', '$http', function ($scope, $http) {
    $scope.currentPage = window.currentPage;
    var cookieCommonStrings = $.cookie("commonStrings");
    if (!cookieCommonStrings) {
        debugger;
        $http.get('/api/commonStrings')
            .success(function (data) {
                $.cookie('commonStrings', JSON.stringify(data), { expires: 3, path: '/' });
                $scope.strings = data;
            })
            .error(function (err) {
                console.log('Error: ' + err);
            });
    }
    else {
        $scope.strings = JSON.parse(cookieCommonStrings);
    }
}]);