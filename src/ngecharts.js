/**
 * Created by liekkas.zeng on 2015/1/7.
 */
angular.module('ng-echarts',['ng-echarts.theme'])
    .directive('ngEcharts',['theme',function(theme){
        return {
            link: function(scope,element,attrs){
                var chart = echarts.init(element[0]);

                function refreshChart(){

                    var option = scope[attrs['option']];
                    var tn = theme.getTheme(scope[attrs['theme']]);
                    chart.clear();
                    chart.setOption(option);
                    chart.setTheme(tn||{});
                    chart.resize();
                };

                //如果第一个参数直接写成scope[attrs['theme']];那么只会是第一个图表生效
                //问题可见 http://segmentfault.com/q/1010000000720618
                scope.$watch(
                    function () { return scope[attrs['theme']]; },
                    function (value) {if (value) {refreshChart();}}
                );

                //第三个参数需要设置为true，只要option上某个属性变化就能刷新图表
                //很显然咱们需要做深度侦察
                scope.$watch(
                    function () { return scope[attrs['option']]; },
                    function (value) {if (value) {refreshChart();}},
                    true
                );
            },
            scope:true,
            restrict:'EA'
        }
    }]);

