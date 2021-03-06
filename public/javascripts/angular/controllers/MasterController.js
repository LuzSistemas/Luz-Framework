/**
 * Created by Pedro Luz on 23/08/2014.
 */


window.BigJS.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);

//Diretiva da classe validate para validação client-side.
window.BigJS.controller('MasterController', ['$scope', '$http', function ($scope, $http) {

    /*
     Declaring inputs
     */
    $scope.inputs = {};

    /*
     Declaring panels
     */
    $scope.panels = {};


    /*
     Insert new input function
     */
    $scope.insertInput = function (input) {
        $scope.inputs[input.id] = input;
    };


    /*
     Insert new panel function
     */
    $scope.insertPanel = function (panel) {
        $scope.panels[panel.id] = panel;
    };

    /*
     Setting current page from window variable (JSON rendered through EJS directly on page)
     */
    $scope.currentPage = window.currentPage;

    /*
     Checks if common strings is cached in a cookie, if not, retrieve it.
     TODO: Check if has changed also.
     */
    var cookieCommonStrings = null;//$.cookie("commonStrings"); TEMPORARY!!!!
    if (!cookieCommonStrings) {
        $.ajax({
            url: '/api/commonStrings',
            async: false
        })
            .success(function (data) {
                /*
                 Caches common string a cookie that expires in 3 days.
                 */
                $.cookie('commonStrings', JSON.stringify(data), {expires: 3, path: '/'});
                window.strings = $scope.strings = data;
                window.commonStrings = $scope.commonStrings = data;
            })
            .error(function (err) {
                console.log('Error retrieving common strings from server: ' + err);
            });
    }
    else {
        window.strings = $scope.strings = JSON.parse(cookieCommonStrings);
        window.commonStrings = $scope.commonStrings = JSON.parse(cookieCommonStrings);
    }
}]);


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
        link: function (scope, elm, attrs) {
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

window.BigJS.directive('luzinput', function ($compile) {
    return {
        require: ["^form", "?^luzpanel"],
        scope: true,
        restrict: 'E',
        templateUrl: '/components/luzinput.html',
        link: {
            post: function (scope, elm, attrs, c) {

                var inputScope = {
                    id: attrs.id,
                    attributes: attrs,
                    parentFormController: null,
                    formController: null,
                    label: {
                        text: attrs.labelText,
                        gridSize: attrs.labelGridSize
                    },
                    input: {
                        gridSize: attrs.inputGridSize,
                        html: null
                    },
                    validation: {}
                };

                /*
                 Setting name attribute
                 */
                if (!attrs.name || attrs.name != attrs.id) {
                    $(elm).attr("name", attrs.id);
                }

                /*
                 Generate input information (html, label, validation.. etc)
                 */
                generateInput($compile, scope, elm, attrs, inputScope, c);

                /*
                 Defaulting grid size values
                 */
                if (!inputScope.input.gridSize && !inputScope.label.gridSize) {
                    inputScope.label.gridSize = 3;
                    inputScope.input.gridSize = 9;
                }
                else {
                    if (!inputScope.input.gridSize) {
                        inputScope.label.gridSize = (12 - inputScope.input.gridSize);
                    }

                    if (!inputScope.label.gridSize) {
                        inputScope.input.gridSize = (12 - inputScope.label.gridSize);
                    }
                }

                scope.inputId = attrs.id;
                scope.insertInput(inputScope);
            }
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

function generateInput($compile, scope, elm, attrs, inputScope, c) {
    var htmlInput;
    var inputType = attrs.type;

    /*
     Choosing input type and defining tag name
     */
    if (!inputType) {
        htmlInput = "<input ";
    }
    else {
        switch (inputType) {
            case "textarea":
                htmlInput = "<textarea ";
                break;
            default:
                htmlInput = "<input ";
                break;
        }
    }

    /*
     Checking and appending attributes
     */

    var hasValidation = false;
    var elmAttributes = elm[0].attributes;
    for (var a in elmAttributes) {

        var attr = elmAttributes[a];
        //Ignore attributes without name?
        if (!attr.name)
        {
            continue;
        }
        //Ignoring internal Angular variables.
        if (attr.name.indexOf("$") == 0)
        {
            continue;
        }
        //If it's a validation attribute (and not a message one)
        if (attr.name.indexOf("luz-validation-") == 0 && attr.name.indexOf("-msg") == -1)
        {
            hasValidation = true;

            /*
            Setting validation message or just bool
             */

            var cValidation = attr.name.replace("luz-validation-", "").toLowerCase();
            var attrMsg = elmAttributes["luz-validation-" + cValidation + "-msg"];
            var msg = "";

            /*
            Checks if there's a custom message for this validation error
             */
            if (attrMsg)
            {
                msg = attrMsg.value;
            }
            else
            {
                msg = "TODO: Default error messages"
            }

            inputScope.validation[cValidation] = {
                value: getStringOrBoolean(attr.value),
                message: msg
            };

            switch (attr.name.replace("luz-validation-",""))
            {
                case "required":
                    htmlInput += "ng-required=\"true\"";
                    //Append to input object in inputScope.
                    continue;
                    break;
            }
        }

        //Append the attribute and it's value to the input HTML
        htmlInput += attr.name + "=\"" + attr.value + "\" ";
    }

    //Closes tag
    htmlInput += "/>";

    htmlInput = $(htmlInput).addClass("form-control")[0].outerHTML;

    var angInput = angular.element(htmlInput);
    $(".inputHolder:first", elm).prepend(angInput);
    $compile(elm.contents())(scope);

    inputScope.parentFormController = c[0];
    inputScope.formController = scope[c[0].$name][attrs.id];

    /*
    If this input has a parent panel, reference it
     */
    if (c[1])
    {
        inputScope.parentPanel = c[1];
    }

    //If this control has validation and has a model defined, attach a validator
    if (hasValidation && attrs.ngModel && attrs.id)
    {
        scope.$watch(attrs.ngModel, function (newValue, oldValue, scope) {
            var targetInput = scope.inputs[attrs.id];
            var validation = targetInput.validation ? targetInput.validation : {};

            if (targetInput.formController.$invalid)
            {
                validation.errors = [];
                for (var e in targetInput.formController.$error)
                {
                    validation.errors.push({key: e, message: validation[e].message})
                }
            }
            else
            {
                if (!validation.errors)
                {
                    return;
                }
                delete validation.errors;
            }
        });
    }
}

function getStringOrBoolean(str)
{
    switch (str.toLowerCase())
    {
        case "true":
            return true;
            break;
        case "false":
            return false;
            break;
        default:
            return str;
            break;
    }
}