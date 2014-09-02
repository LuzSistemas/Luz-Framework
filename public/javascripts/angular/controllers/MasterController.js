/**
 * Created by Pedro Luz on 23/08/2014.
 */
//Diretiva da classe validate para validação client-side.
window.BigJS.controller('MasterController', ['$scope', '$http', function ($scope, $http) {
    $scope.inputs =  {};
    $scope.panels = {};

    $scope.insertInput = function (input)
    {
        $scope.inputs[input.id] = input;
    };

    $scope.insertPanel = function (panel)
    {
        $scope.panels[panel.id] = panel;
    };

    $scope.currentPage = window.currentPage;
    var cookieCommonStrings = $.cookie("commonStrings");
    if (!cookieCommonStrings) {
        debugger;
        $http.get('/api/commonStrings')
            .success(function (data) {
                $.cookie('commonStrings', JSON.stringify(data), {expires: 3, path: '/'});
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

window.BigJS.directive('luzinput', function ($compile) {
    return {
        scope: true,
        restrict: 'E',
        link: function(scope, elm, attrs)
        {
            var inputScope = {
                id: attrs.id,
                attributes: attrs,
                label: {
                    text: attrs.labelText,
                    gridSize: attrs.labelGridSize
                },
                input: {
                    gridSize: attrs.inputGridSize,
                    html: 'teste'
                },
                validation: {}
            };

            scope.inputId = attrs.id;
            scope.insertInput(inputScope);
        },
        templateUrl: '/components/luzinput.html'
    };
});


window.BigJS.directive('luzpanel', function ($compile) {
    return {
        scope: true,
        restrict: 'E',
        controller: function ($scope) {
            $scope.widgetTranscludes = [];
            $scope.widgetDefs = [];
            $scope.transcludes = {};

            this.registerTransclude = function (directiveTransclude) {
                var id = directiveTransclude.id;
                $scope.transcludes[id] = directiveTransclude;
            };

            this.addWidgetTransclude = function (widgetTransclude) {
                var widgetDef = {
                    id: $scope.widgetDefs.length, // index in widgetTranscludes array
                    name: widgetTransclude.name
                };

                $scope.widgetDefs.push(widgetDef);
                $scope.widgetTranscludes.push(widgetTransclude);
            };
        },
        link: function(scope, elm, attrs)
        {
            attrs.hasFooter = (elm[0].innerHTML.indexOf("<!-- csSection: footer -->") > 0);
            scope.panelId = attrs.id;
            scope.insertPanel(attrs);
            var templateString = '<div ng-include="\'/components/luzpanel.html\'"></div>';
            var contentElement = angular.element(templateString);
            elm.append(contentElement);
            $compile(contentElement)(scope);
        }
    };
});

window.BigJS.directive('csSection', function () {
        return {
            scope: true,
            transclude: 'element',
            priority: 100,
            require: '^luzpanel',
            link: function (scope, element, attrs, ctrl, $transclude) {
                var directiveTransclude = {
                    id: attrs.csSection,
                    transclude: $transclude,
                    element: element
                };

                ctrl.registerTransclude(directiveTransclude);
            }
        };
    })
    // directive to capture "cs-widget" content
    .directive('csWidget', function () {
        return {
            transclude: 'element',
            priority: 100,
            require: '^luzpanel',
            link: function (scope, element, attrs, ctrl, $transclude) {
                var widgetTransclude = {
                    transclude: $transclude,
                    element: element,
                    name: attrs.csName
                };

                ctrl.addWidgetTransclude(widgetTransclude);
            }
        };
    })
    // directive to output "cs-section" content
    .directive('csTransclude', function () {
        return {
            transclude: true,
            link: function (scope, element, attrs) {
                var id = attrs.csTransclude;
                var directiveTransclude = scope.transcludes[id];
                if (directiveTransclude) {
                    var selectedScope = scope.$new();
                    directiveTransclude.transclude(selectedScope, function (clone) {
                        element.append(clone);
                    });
                }
            }
        };
    })
    .directive('csWidgetTransclude', function () {
        return {
            transclude: true,
            link: function (scope, element, attrs) {
                var widgetDef = scope.$eval(attrs.csWidgetTransclude);
                var selectedScope = scope.$new();
                var widgetTransclude = scope.widgetTranscludes[widgetDef.id];

                widgetTransclude.transclude(selectedScope, function (clone) {
                    element.append(clone);
                });
            }
        };
    });