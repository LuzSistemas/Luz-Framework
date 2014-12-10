/**
 * Created by Pedro on 09/12/2014.
 */
window.BigJS.controller('MailInboxController', ['$scope', '$http', function ($scope, $http) {
    var inbox = {
        title: commonStrings.mail.inbox,
        icon: 'inbox',
        unreadCount: 2
    };
    $scope.mailbox =
    {
        currentFolder: inbox,
        systemFolders:[
            inbox,
            {
                title: commonStrings.mail.folders.starred,
                icon: 'star',
                unreadCount: 1
            },
            {
                title: commonStrings.mail.folders.sent,
                icon: 'send',
                unreadCount: 0
            },
            {
                title: commonStrings.mail.folders.drafts,
                icon: 'pencil',
                unreadCount: 0
            },
            {
                title: commonStrings.mail.folders.trash,
                icon: 'trash',
                unreadCount: 0
            }
        ]
    };
}]);