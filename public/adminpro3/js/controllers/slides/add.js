app.controller('AddSlideCtrl', function ($scope,$state,Cloud,Api) {

	$scope.create = function(slides,file){
	    $scope.spinner.on();
	    slides.img = "";
		    if( file != null || file != undefined){
		      Cloud.upload({
		          url: '/api/upload', //webAPI exposed to upload the file
		          data:{
		            folder:'home/', //Carpeta donde se guardará en cloudinary
		            oldFile: slides.img,
		            file:file} //pass file as data, should be user ng-model
		      }).then(function (resp) { //upload function returns a promise
		            slides.img = resp.data.message
		             Api.postSlide(slides).success(function (data){
					      $scope.spinner.off(); 
					      $state.go('app.slides');
					    })
		      });
		    }else{
		      Api.postSlide(slides).success(function (data){
			      $scope.spinner.off(); 
			      $state.go('app.slides');
			    })

		    }
  	}

});