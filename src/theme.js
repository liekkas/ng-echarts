/**
 * Created by liekkas.zeng on 2015/1/7.
 */
angular.module('ng-echarts.theme', [])
    .factory('theme',
        ['blue','dark','defaults','gray','green','helianthus','infographic','macarons','red', 'shine',
        function (blue,dark,defaults,gray,green,helianthus,infographic,macarons,red, shine)
    {
        var themes = {
            blue:blue,
            dark:dark,
            defaults:defaults,
            gray:gray,
            green:green,
            helianthus:helianthus,
            infographic:infographic,
            macarons:macarons,
            red:red,
            shine:shine
        };

        return {
            getTheme: function (name) {
                return themes[name] ? themes[name] : defaults;
            }
        };
}]);

