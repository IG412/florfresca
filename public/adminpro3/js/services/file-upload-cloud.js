/**!
 * AngularJS file upload on cloud services. Supoorts: file upload/drop/paste, resume, cancel/abort,
 * @author  Leider Gaitan  <Leider@if-cs.com>
 * @version 0.0.1
 */

var FileUploadCloud = angular.module('Cloud', []);
FileUploadCloud.version = '0.0.2';

FileUploadCloud.service('Cloud',function ($http, $q,$timeout){
	var upload = this;
	// var link="http://localhost:8888/cloud/files/modaadomicilio/";
	var link="http://cloud.if-cs.com/files/camarasinalma/";

	valideFolder = function(folder){
		return (folder) ? folder.replace("/","") :  "";
	}
	valideOldFile = function(img, folder){
		return (!img.indexOf(link)) ?  img.replace(link+folder+"/","") :  img;	
	}
	function BlobToBase64(config){
		var deferred = $q.defer();
		var promise = deferred.promise;
		var reader = new window.FileReader();
     	reader.readAsDataURL(config.data.file); 
	    reader.onload = function (e) {
	      $timeout(function () {
	        config.data.file = e.target.result;
	        sendHttp(config).then(function (data){
	        	deferred.resolve(data);
	        }, function (e){
	        	deferred.reject(e);
	        });
	      });
	    };
	    reader.onerror = function (e) {
	      $timeout(function () {
	        deferred.reject(e);
	      });
	    };
	    promise.success = function (fn) {
	      promise.then(function (response) {
	        fn(response.data, response.status, response.headers, config);
	      });
	      return promise;
	    };

	    promise.error = function (fn) {
	      promise.then(null, function (response) {
	        fn(response.data, response.status, response.headers, config);
	      });
	      return promise;
	    };

	    promise.progress = function (fn) {
	      promise.progressFunc = fn;
	      promise.then(null, null, function (n) {
	        fn(n);
	      });
	      return promise;
	    };
	    promise.abort = promise.pause = function () {
	      if (config.__XHR) {
	        $timeout(function () {
	          config.__XHR.abort();
	        });
	      }
	      return promise;
	    };
	    promise.xhr = function (fn) {
	      config.xhrFn = (function (origXhrFn) {
	        return function () {
	          if (origXhrFn) origXhrFn.apply(promise, arguments);
	          fn.apply(promise, arguments);
	        };
	      })(config.xhrFn);
	      return promise;
	    };
	   return promise;
	}
	function sendHttp(config){
		config.data.folder = valideFolder(config.data.folder);
		config.data.oldFile = (config.data.oldFile) ? valideOldFile(config.data.oldFile,config.data.folder) : null
		config.data.img = (config.data.file.$ngfDataUrl) ? config.data.file.$ngfDataUrl : config.data.file;
		return $http.post(config.url,config.data);
	}
	this.upload = function (config){
		return (config.data.file instanceof Blob) ? BlobToBase64(config) : sendHttp(config);
	}
	this.load = function(img){
    	(img) ? cloudinary = "http://res.cloudinary.com/hncjxyyct/image/upload/"+img : '';
    	return(img) ? (!img.indexOf('http://cloud.if-cs.com/files/camarasinalma/')) ? img : cloudinary : false;
  	}
	this.delete = function(config){
		config.data.folder = valideFolder(config.data.folder);
		config.data.img = (config.data.file) ? valideOldFile(config.data.file,config.data.folder) : null
		return $http.delete(config.url,{params:config.data});
	}

});