/**
 * Created by Pedro Luz on 22/08/2014.
 */
window.BigJS.controller('LeftMenuController', ['$scope', '$http', function ($scope, $http) {
    var cookieMenuItems = $.cookie("userMenuItems");
    if (!cookieMenuItems) {
        debugger;
        $http.get('/api/menuItems')
            .success(function (data) {
                $.cookie('userMenuItems', JSON.stringify(data), { expires: 3, path: '/' });
                $scope.menuItems = data;
            })
            .error(function (err) {
                console.log('Error: ' + err);
            });
    }
    else {
        $scope.menuItems = JSON.parse(cookieMenuItems);
    }
}]);