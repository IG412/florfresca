app.controller('EditGisGCtrl', function ($scope,$state,$stateParams,Upload,Cloud,Api) {
	$scope.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
  function month_en (arg) {
    var month = '';
    switch(arg){
      case 'Enero':   month = 'January'; break;
      case 'Febrero':  month = 'February'; break;
      case 'Marzo':  month = 'March'; break;
      case 'Abril':  month = 'April'; break;
      case 'Mayo':  month = 'May'; break;
      case 'Junio':  month = 'June'; break;
      case 'Julio':  month = 'July'; break;
      case 'Agosto':  month = 'August'; break;
      case 'Septiembre':  month = 'September'; break;
      case 'Octubre':  month = 'October'; break;
      case 'Noviembre':  month = 'November'; break;
      case 'Diciembre':  month = 'December'; break;
      default:  month = 'January'; break;
    }
    return month;
  }
	$scope.Images = [];
  $scope.ImgDelete =[];
  $scope.con = 0;
  $scope.file = [];
  $scope.Imgs = [];
  var imgs = [];

	function loadData(){
	    $scope.spinner.on();
	    Api.getGodisgood($stateParams.id).success(function (album) {
	      $scope.Albums = album;
	      $scope.Images = album.images;
        imgs  = album.images;
        (album.audio) ? $scope.Audio = Cloud.load(album.audio) : null;
        (album.audio_en) ? $scope.Audio2 = Cloud.load(album.audio_en) : null;
	      $scope.spinner.off();
	    })
  	}

  loadData();

  $scope.loadFiles = function(img){
    return Cloud.load(img);
  }
  $scope.addFieldsimage = function () {
      $scope.con++;
      $scope.Images.push("");
    }

  $scope.removeFieldsimage = function (index,img) {
      if(img != undefined){
        $scope.ImgDelete.push(img);  
      }
      $scope.Images.splice(index, 1);
    }

  $scope.create = function(album, file, cover, audio,audio2){
    
      $scope.spinner.on();
      album.month_en = month_en(album.month);
      Api.putGodisgoods(album._id, album).success( function(data){
        var state = true;
        var state_en = true;
        var stateCover = true;
        var stateImg = true;
        angular.forEach($scope.ImgDelete, function(value, key) {
            Cloud.delete({
                        url: '/api/upload', //webAPI exposed to upload the file
                        data:{
                          folder:'album/', //Carpeta donde se guardará en cloudinary
                          file:value} //pass file as data, should be user ng-model
            }).then(function(e){
              console.log(e);
            })
        });
        if( cover != null || cover != undefined){
          console.log("Entro cover");

          stateCover = false;
           Cloud.upload({
                url: '/api/upload', //webAPI exposed to upload the file
                data:{
                  folder:'portfolio/', //Carpeta donde se guardará en cloudinary
                  oldFile: album.cover,
                  file:cover} //pass file as data, should be user ng-model
            })
            .then(function (resp) { //upload function returns a promise
                    Api.putGodisgoods(album._id,{cover: resp.data.message}).success(function (){ 
                        stateCover = true;
                        console.log(state_en,state,stateImg,stateCover);
                        if(state_en && state && stateImg && stateCover){
                          console.log('Entro cover');
                          $scope.spinner.off();
                          $state.go('app.gisgs');
                        }
                      })
            });
        }
        if( audio != null || audio != undefined){
          console.log("Entro Audio");
          state = false;
           Cloud.upload({
                url: '/api/audio', //webAPI exposed to upload the file
                data:{
                  folder:'audio/', //Carpeta donde se guardará en cloudinary
                  oldFile: album.audio,
                  file:audio} //pass file as data, should be user ng-model
            })
            .then(function (resp) { //upload function returns a promise
                    Api.putGodisgoods(album._id,{audio: resp.data.message}).success(function (){
                        state = true;
                        if(state_en && state && stateImg && stateCover){
                          console.log('Entro audio');
                          $scope.spinner.off();
                          $state.go('app.gisgs');
                        }
                      })
            });
        }
         if( audio2 != null || audio2 != undefined){
          console.log("Entro Audio2");
          var state_en = false;
           Cloud.upload({
                url: '/api/audio', //webAPI exposed to upload the file
                data:{
                  folder:'audio/', //Carpeta donde se guardará en cloudinary
                  oldFile: album.audio_en,
                  file:audio} //pass file as data, should be user ng-model
            })
            .then(function (resp) { //upload function returns a promise
                    Api.putAlbum(album._id,{audio_en: resp.data.message}).success(function (){
                        var state_en = true;
                        if(state_en && state && stateImg && stateCover){
                          console.log('Entro audio');
                          $scope.spinner.off();
                          $state.go('app.albums');
                        }
                      })
            });
        }
        if( file.length > 0 && file != undefined){
          stateImg = false;
          angular.forEach(file, function(value, key) {
            console.log("Entro imagenes");
            Cloud.upload({
                url: '/api/upload', //webAPI exposed to upload the file
                data:{
                  folder:'album/', //Carpeta donde se guardará en cloudinary
                  oldFile: album.audio,
                  file:value} //pass file as data, should be user ng-model
            })
            .then(function (resp) { //upload function returns a promise
                  imgs[key].img = resp.data.message;
                  if(file.length == imgs.length){
                    Api.putGodisgoods(album._id,{images: imgs}).success(function (){ 
                            stateImg = true;
                            if(state_en && state && stateImg && stateCover){
                              console.log('Entro img');
                              $scope.spinner.off();
                              $state.go('app.gisgs');
                            }
                      })
                  }
            });
          });
        }
        if(state_en && state && stateImg && stateCover){
          console.log('Entro img');
          $scope.spinner.off();
          $state.go('app.gisgs');
        }
      });
  }

});