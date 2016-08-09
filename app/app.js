(function () {
    angular
        .module('app', [
            'ui.router'
        ])
        .component('ninjaComponent', {
            template: '<input type="text" ng-model="$ctrl.greeting"/>'+
                        '<button ng-click="$ctrl.onUpdate{{value: $ctrl.greeting}}"> Click me2</button>',
            bindings: {
                greeting: '<',
                onUpdate: '&'
            }
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/404");

            $stateProvider
                .state('app', {
                    url: '/',
                    controller: "appCtrl",
                    controllerAs: 'vm',
                    template: '<section>'+
                                '<h1 ng-bind="vm.greeting"></h1>'+
                                '<ninja-component greeting="vm.greeting" on-update="vm.updateGreeting(value)"></ninja-component>'+
                                '<button ng-click="vm.loadState()">Click me</button>'+
                                '</section>'
                })
                .state('masterState', {
                    url: '/master-state',
                    template: "<h1>Hello master</h1>"+
                                "<a ui-sref='abc'>Some link</a>",
                    onEnter: function () {
                        alert('You came here')
                    },
                    resolve: false

                })
                .state('404', {
                    url: "/404",
                    template: "<h1>Not found</h1>"
                })
        })
        .controller('appCtrl', function ($state) {
            var vm = this
            vm.greeting = 'Hello my master'
            vm.loadState = loadState
            vm.updateGreeting = updateGreeting;

            function loadState() {
                $state.go('masterState')
            }
            function updateGreeting(value) {
                vm.greeting = value;
            }

        })
})();

