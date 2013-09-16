﻿'use strict';
define(['core/app/detourService'], function (detour) {
    detour.registerController([
        'EditOneToManyCtrl',
        ['$scope', 'logger', '$detour', '$stateParams', '$http',
            function ($scope, logger, $detour, $stateParams, $http) {
                var validator = $("#onetomany-form").validate({
                    errorClass: "inputError"
                });

                $scope.saveAndView = function () {
                    ToggleReadonly(false);
                    var form = $('#onetomany-form');
                    if (!validator.form()) {
                        return null;
                    }
                    var promise = $http({
                        url: form.attr('action'),
                        method: form.attr('method'),
                        data: form.serialize(),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function () {
                        logger.success('success');
                    }, function (result) {
                        logger.error('Failed:\n' + result.responseText);
                    });
                    ToggleReadonly(true);
                    return promise;
                };

                $scope.exit = function () {
                    $detour.transitionTo('EntityDetail.Relationships', { Id: $stateParams.EntityName });
                };
                
                $scope.saveAndBack = function () {
                    var promise = $scope.saveAndView();
                    promise && promise.then(function () {
                        $scope.exit();
                    });
                };
            }]
    ]);
});

function ToggleReadonly(condition) {
    $("input.primary-entity").prop('disabled', condition);
    $("#relation-name").prop('disabled', condition);
    $("input.related-entity").prop('disabled', condition);
    //$("#relation-deleteOption").prop('disabled', condition);
}