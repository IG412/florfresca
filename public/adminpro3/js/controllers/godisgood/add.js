app.controller('AddGisGCtrl', function ($scope,$state,Upload,Cloud,Api) {

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
  $scope.file = [];
  $scope.Imgs = [];
  $scope.addFieldsimage = function () {
      $scope.Images.push("");
    }

   $scope.removeFieldsimage = function (index,img) {
      $scope.Images.splice(index, 1);
    }

 $scope.create = function(album, file, cover, audio,audio2){
    
      $scope.spinner.on();
      album.month_en = month_en(album.month);
      Api.postGodisgood(album).success( function(data){
        var state = true;
        var state2 = true;
        var stateCover = true;
        var stateImg = true;
        if( cover != null || cover != undefined){
          stateCover = false;
           Cloud.upload({
                url: '/api/upload', //webAPI exposed to upload the file
                data:{
                  folder:'portfolio/', //Carpeta donde se guardará en cloudinary
                  file:cover} //pass file as data, should be user ng-model
            })
            .then(function (resp) { //upload function returns a promise
                    Api.putGodisgoods(data._id,{cover: resp.data.message}).success(function (){ 
                        stateCover = true;
                        if(state2 && state && stateImg && stateCover){
                          console.log('Entro cover');
                          $scope.spinner.off();
                          $state.go('app.gisgs');
                        }
                      })
            });
        }
        if( audio != null || audio != undefined){
          state = false;
           Cloud.upload({
                url: '/api/audio', //webAPI exposed to upload the file
                data:{
                  folder:'audio/', //Carpeta donde se guardará en cloudinary
                  file:audio} //pass file as data, should be user ng-model
            })
            .then(function (resp) { //upload function returns a promise
                    Api.putGodisgoods(data._id,{audio: resp.data.message}).success(function (){ 
                        state = true;
                        console.log("img: "+stateImg+" cover :"+stateCover);
                        if(state2 && state && stateImg && stateCover){
                          console.log('Entro audio');
                          $scope.spinner.off();
                          $state.go('app.gisgs');
                        }
                      })
            });
        }
        if( audio2 != null || audio2 != undefined){
          state2 = false;
           Cloud.upload({
                url: '/api/audio', //webAPI exposed to upload the file
                data:{
                  folder:'audio/', //Carpeta donde se guardará en cloudinary
                  file:audio2} //pass file as data, should be user ng-model
            })
            .then(function (resp) { //upload function returns a promise
                    Api.putGodisgoods(data._id,{audio_en: resp.data.message}).success(function (){ 
                        state2 = true;
                        console.log("img: "+stateImg+" cover :"+stateCover);
                        if(state2 && state && stateImg && stateCover){
                          console.log('Entro audio2');
                          $scope.spinner.off();
                          $state.go('app.gisgs');
                        }
                      })
            });
        }
        if( file.length > 0 && file != undefined){
          stateImg = false;
          angular.forEach(file, function(value, key) {
            Cloud.upload({
                url: '/api/upload', //webAPI exposed to upload the file
                data:{
                  folder:'album/', //Carpeta donde se guardará en cloudinary
                  file:value} //pass file as data, should be user ng-model
            })
            .then(function (resp) { //upload function returns a promise
                  $scope.Imgs[key]={img: resp.data.message, position: album.images[key].position};
                  if($scope.Imgs.length == file.length){
                    Api.putGodisgoods(data._id,{images: $scope.Imgs}).success(function (){ 
                            stateImg = true;
                            if(state2 && state && stateImg && stateCover){
                              console.log('Entro img');
                              $scope.spinner.off();
                              $state.go('app.gisgs');
                            }
                      })
                  }
            });
          });
        }
         if(state2 && state && stateImg && stateCover){
            console.log('Entro create');
            $scope.spinner.off();
            $state.go('app.gisgs');
          }
      });
  }

});