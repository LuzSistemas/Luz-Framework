/**
 * Created by Pedro Luz on 22/08/2014.
 */
window.BigJS.controller('LeftMenuController', ['$scope', '$http', function ($scope, $http) {
    var cookieMenuItems = $.cookie("userMenuItems");

    if (!cookieMenuItems)
    {
        cookieMenuItems = '[]';
    }

    var menuItems = JSON.parse(cookieMenuItems);
    $scope.menuItems = menuItems.menuItems;
    $http.get('/api/menuItems')
        .success(function (data) {
            //If menu items have been updated
            if (data.lastUpdate != menuItems.lastUpdate)
            {
                //Update cookie and update scope with new server data
                $.cookie('userMenuItems', JSON.stringify(data));
                $scope.menuItems = data.menuItems;
            }
        })
        .error(function (err) {
            console.log('Error retrieving menu items from server: ' + err);
        });
}]);