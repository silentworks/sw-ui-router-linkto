angular.module('sw.ui.router.linkto', ['ui.state'])

.value('$linktoConfig', {
    baseUrl: '',
    html5: false,
    hashPrefix: '#',
})

.directive('linkto', function ($linktoConfig) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<a href="" ng-transclude></a>',
        controller: ['$scope', '$state', function($scope, $state) {
            this.setStateHref = function (stateName, stateParams) {
                /**
                 * This piece of code was taken from uiGoto directive.
                 */
                var params = {};
                if (stateParams) {
                    params = $scope.$eval(stateParams);
                    if (!angular.isObject(params)) {
                        throw new Error("Parameters for stateParams must be an object");
                    }
                }
                /* end of code */

                var href = $state.href(stateName, angular.extend({}, $state.params, params));
                if (!$linktoConfig.html5) {
                    href = $linktoConfig.hashPrefix + href;
                }
                return $linktoConfig.baseUrl + href;
            }
        }],
        link: function ($scope, element, attrs, linktoCtrl) {
            // Remove unnecessary attributes
            element.removeAttr('state');
            element.removeAttr('state-params');
            element.removeAttr('ng-transclude');

            var stateName = attrs.state;
            var stateParams = attrs.stateParams;
            var href = linktoCtrl.setStateHref(stateName, stateParams);

            element.attr('href', href)
        }
    }
});