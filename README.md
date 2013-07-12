# linkto directive for AngularJS ui-router

This directive allows you to link to a specific state in ui-router by rendering out an a tag with the correct
url based on the state name. This allows the url to be bookmarkable and not break the browser. It also support
the html5 history API.

This directive is inspired by [uiGoto][uigoto], [EmberJS][emberjs] linkTo helper and this [Tweet][tweet].

## Install

- with bower: `bower install sw-ui-state-linkto`
- by cloning this repo

## How to use

You first need to add this directive as a dependency to your AngularJS project.

```js
angular.module('myProject', ['sw.ui.state.linkto']);
```

All you have to do now is add the `linkto` directive anywhere in your AngularJS template.

### Attributes

The `linkto` directive currently have 2 attributes.

- state
- state-params (optional)

__state__

The state attribute takes the string name of the state you would like to link to.

__state-params__

The state-params attribute is optional, it is only necessary if the state you are linking to has additional parameters.
You can pass in a string or a variable to this attribute.

### Example Usage

__state example__


```html
<linkto state="project">Project</linkto>
```

__state-params example__


```html
<linkto state="project.edit" state-params="{id: 1}">Edit Project</linkto>
```

or with a variable

```html
<linkto state="project.edit" state-params="{id: project.id}">Edit Project</linkto>
```

A complete example

```js
var app = angualar.module('myProject', ['sw-ui-state-linkto']);

app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        /* If no state is matched redirect to dashboard */
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('index', {
                url: "", // root route
                views: {
                    "viewA": {
                        templateUrl: "index.viewA.html"
                    },
                    "viewB": {
                        templateUrl: "index.viewB.html"
                    }
                }
            })
            .state('route1', {
                url: "/about",
                views: {
                    "viewA": {
                        templateUrl: "route1.viewA.html"
                    },
                    "viewB": {
                        templateUrl: "route1.viewB.html"
                    }
                }
            })
            .state('route2', {
                url: "/who",
                views: {
                    "viewA": {
                        templateUrl: "route2.viewA.html"
                    },
                    "viewB": {
                        templateUrl: "route2.viewB.html"
                    }
                }
            })
            .state('route2.plus', {
                url: "/{id}",
                views: {
                    "viewA": {
                        templateUrl: "route2.viewA.html"
                    },
                    "viewB": {
                        templateUrl: "route2.viewB.html"
                    }
                }
            });
    }
]);
```

and the angularjs html

```html
<!-- index.html -->
<body>
    <div ui-view="viewA"></div>
    <div ui-view="viewB"></div>
    <!-- Also a way to navigate -->
    <linkto state="route1">Route 1</linkto>
    <linkto state="route2">Route 2</linkto>
    <linkto state="route2.plus" state-params="{id: 1}">Route with Param</linkto>
</body>
```

The html rendered in the browser will look like this:

```html
<!-- index.html -->
<body>
    <div ui-view="viewA"></div>
    <div ui-view="viewB"></div>
    <!-- Also a way to navigate -->
    <a href="#/about">Route 1</a>
    <a href="#/who">Route 2</a>
    <a href="#/who/1">Route with Param</a>
</body>
```

#### TODO

- find a way to check if $locationProvider.html5Mode() is set to true
- find a way to check what $locationProvider.hashPrefix() is set to

## Authors

[Andrew Smith](https://github.com/silentworks)

## License

MIT Public License

[uigoto]: https://github.com/mgonto/mgo-ui-router-goto
[emberjs]: http://emberjs.com/guides/templates/links/
[tweet]: https://twitter.com/ryanflorence/status/355110904645427201