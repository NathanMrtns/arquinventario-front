var app = angular.module('app');

app.factory('Files', function (Upload, $q, serverURL) {
    return {
        upload: function (files, filename) {
            var deferred = $q.defer();
            var url = serverURL.value+"/upload/image";
            files.upload = Upload.upload({
                url: url,
                data:{
                    name: filename,
                    file:files
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        }
    }
});