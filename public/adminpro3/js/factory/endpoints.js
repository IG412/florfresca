angular.module('app')
.factory('Api', function ($http) {
    return {
        //slides
        getSlides: function(){
            return $http.get('/api/slides');
        },
        postSlide: function(query){
            return $http.post('/api/slides', query);
        },
        getSlide: function(query){
            return $http.get('/api/slides/'+query)
        },
        putSlide: function(query){
            return $http.put('/api/slides/'+query._id, query);
        },
        deleteSlide : function(query){
            return $http.delete('/api/slides/'+query);
        },
        //Modelos
        getModels: function(){
            return $http.get('/api/model');
        },
        postModel: function(query){
            return $http.post('/api/model', query);
        },
        getModel: function(query){
            return $http.get('/api/model/'+query)
        }, 
        deleteModel : function(query){
            return $http.delete('/api/model/'+query);
        },
        //Store
        getStores: function(){
            return $http.get('/api/stores');
        },
        postStore: function(query){
            return $http.post('/api/store', query);
        },
        getStore: function(query){
            return $http.get('/api/store/'+query)
        },
        putStore: function(query){
            return $http.put('/api/store/'+query._id, query);
        },
        deleteStore : function(query){
            return $http.delete('/api/store/'+query);
        },
        //Videos
        getVideos: function(){
            return $http.get('/api/videos');
        },
        putVideo: function(query){
            return $http.put('/api/videos/'+query.id, query);
        },
        getVideo: function(id){
            return $http.get('/api/videos/'+id);
        },
        //Orders
        getOrders: function(){
            return $http.get('/api/order');
        },
        getOrder: function(query){
            return $http.get('/api/order/'+query)
        },
        putOrder: function(id,status){
            return $http.put('/api/order/'+id, status);
        },
        //Users
        getUsers: function(){
            return $http.get('/api/user');
        },
        getUser: function(query){
            return $http.get('/api/user/'+query);
        },
        deleteUser: function(query){
            return $http.delete('/api/user/'+query);
        },
        putUser: function(id,query){
            return $http.put('/api/user/'+id,query);
        },
        //Albums
        getAlbums: function(){
            return $http.get('/api/album');
        },
        postAlbums: function(query){
            return $http.post('/api/albums', query);
        },
        getAlbum: function(query){
            return $http.get('/api/albums/'+query)
        },
        putAlbum: function(id,query){
            return $http.put('/api/albums/'+id, query);
        },
        deleteAlbum : function(query){
            return $http.delete('/api/albums/'+query);
        },
        //godisgood
        getGodisgoods: function(){
            return $http.get('/api/gisg');
        },
        postGodisgood: function(query){
            return $http.post('/api/godisgoods', query);
        },
        getGodisgood: function(query){
            return $http.get('/api/godisgood/'+query)
        },
        putGodisgoods: function(id,query){
            return $http.put('/api/godisgood/'+id, query);
        },
        deleteGodisgoods : function(query){
            return $http.delete('/api/godisgood/'+query);
        },
        //Eliminar Imagen
        deleteUpload: function(query){
            return $http.delete('/api/upload'+query);
        },
        //Eliminar Audio
        deleteAudio: function(query){
            return $http.delete('/api/audio'+query);
        }
    }
})