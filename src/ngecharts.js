/**
 * Created by liekkas.zeng on 2015/1/7.
 */
angular.module('ng-echarts',['ng-echarts.theme'])
    .directive('ngEcharts',['theme',function(theme){
        return {
            controller: function($scope,$element){
                //var t1 = new Date();
                $scope.chart = echarts.init($element[0]);
                //console.log($scope.chart.id + "耗时：" + (new Date().getTime()-t1.getTime()) +"s");
                $scope.chart.showLoading({text: '数据加载中...'});

                this.getChart = function(){
                    return $scope.chart;
                }
            },
            link: function(scope,element,attrs){
                var chart = scope.chart;
                bindevent();

                function refreshChart(){

                    var tn = theme.getTheme(scope.theme);
                    chart.clear();
                    chart.setOption(scope.option);
                    chart.setTheme(tn||{});
                    chart.resize();

                    chart.hideLoading();
                };

                function bindevent(){
                    if(angular.isArray(scope.event)){
                        angular.forEach(scope.event,function(value,key){
                            for(var e in value){
                                chart.on(e,value[e]);
                            }
                        });
                    }
                }

                //如果第一个参数直接写成scope.theme;那么只会是第一个图表生效
                //问题可见 http://segmentfault.com/q/1010000000720618
                scope.$watch(
                    function () { return scope.theme; },
                    function (value) {if (value) {refreshChart();}}
                );

                //第三个参数需要设置为true，只要option上某个属性变化就能刷新图表
                //很显然咱们需要做深度侦察
                scope.$watch(
                    function () { return scope.option; },
                    function (value) {if (value) {refreshChart();}},
                    true
                );
            },
            scope:{
                theme:'=',
                option:'=',
                event:'='
            },
            restrict:'EA'
        }
    }]);

