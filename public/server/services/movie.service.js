/**
 * Created by sumeetdubey on 6/20/17.
 */
module.exports=function(app, db){
    var mysql=require('mysql');
    var q=require('q');

    app.get('/api/getAllMovies', getAllMovies);
    app.get('/api/getMoviesForPurchase', getMoviesForPurchase);

    function getAllMovies(req, res){
        getAllMoviesFromDb()
            .then(
                function(doc){
                    res.send(doc)
                }
            )
    }

    function getMoviesForPurchase(req, res){
        getMoviesForPurchaseFromDb()
            .then(
                function(doc){
                    res.send(doc);
                }
            )
    }

    function getMoviesForPurchaseFromDb(){
        var deferred = q.defer();
        var queryStr=mysql.format('SELECT movie_name, movie_duration, movie_language, movie_imdb_score, movie_year_released, movie_definition, movie_price FROM movies JOIN movies_for_purchase ON movies.movie_id=movies_for_purchase.movie_id ORDER BY movie_name');
        db.query(queryStr, function(err, res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function getAllMoviesFromDb(){
        var deferred = q.defer();
        var queryStr=mysql.format('Select * from movies');
        db.query(queryStr, function(err, res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }
};