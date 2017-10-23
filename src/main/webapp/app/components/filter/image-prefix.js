/**
 * Created by Administrator on 2017/10/23 0023.
 */
(function () {
    'use strict';

    angular
        .module('cameraApp')
        .filter('imagePrefix', imagePrefix);

    function imagePrefix() {
        var IMAGE_PREFIX = "http://localhost/static-images/";

        return imagePrefixFilter;

        function imagePrefixFilter(input) {
            return angular.isString(input) ? IMAGE_PREFIX + input : input;
        }
    }
})();
