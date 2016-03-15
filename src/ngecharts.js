/**
 * Created by liekkas.zeng on 2015/1/7.
 */
angular.module('ng-echarts',['ng-echarts.theme'])
    .directive('ngEcharts',['theme',function(theme){
        return {
            controller: ['$scope','$element', function($scope,$element){
                $scope.chart = echarts.init($element[0]);

                this.getChart = function(){
                    return $scope.chart;
                };

                this.showLoading = function (loadingOption) {

                    var op = loadingOption || {
                            text : '数据加载中',
                            effect : 'bubble',
                            textStyle : {
                                fontSize : 20
                            }
                        };
                    $scope.chart.showLoading(op);
                };

                this.hideLoading = function () {
                    $scope.chart.hideLoading();
                };
            }],
            link: function(scope,element,attrs,ctrl){
                var chart = scope.chart;

                function refreshChart(){
                    chart.clear();
                    if(scope.config && scope.config.dataLoaded === false){
                        ctrl.showLoading(scope.config.loadingOption);
                    }

                    if(scope.config && scope.config.dataLoaded){
                        var tn = theme.getTheme(scope.config.theme);
                        chart.setOption(scope.option);
                        chart.setTheme(tn||{});
                        chart.resize();
                        ctrl.hideLoading();
                    }
                };

                //事件绑定
                function bindevent(){
                    if(angular.isArray(scope.config.event)){
                        angular.forEach(scope.config.event,function(value,key){
                            for(var e in value){
                                chart.on(e,value[e]);
                            }
                        });
                    }
                }

                if(scope.config.event){
                    bindevent();
                }

                //自定义参数 -
                // event 定义事件
                // theme 主题
                // dataLoaded 数据是否加载

                scope.$watch(
                    function () { return scope.config; },
                    function (value) {if (value) {refreshChart();}},
                    true
                );

                //图表原生option
                scope.$watch(
                    function () { return scope.option; },
                    function (value) {if (value) {refreshChart();}},
                    true
                );
            },
            scope:{
                option:'=ecOption',
                config:'=ecConfig'
            },
            restrict:'EA'
        }
    }]);
