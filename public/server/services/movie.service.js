/**
 * Created by sumeetdubey on 6/20/17.
 */
module.exports=function(app, db) {
    var mysql = require('mysql');
    var q = require('q');

    app.get('/api/getAllMovies', getAllMovies);
    app.get('/api/getMoviesForPurchase', getMoviesForPurchase);
    app.post('/api/search', search);
    app.post('/api/purchase', purchase);
    app.get('/api/admin/allMovies', getAllMoviesAdmin);
    app.get('/api/admin/moviesPurchase', getMoviesForPurchaseAdmin);
    app.post('/api/admin/addMovie', addMovie);
    app.post('/api/admin/updateMovie', updateMovie);
    app.delete('/api/admin/deleteMovie/:movieId', deleteMovie);
    app.post('/api/admin/addMovieForPurchase', addMovieForPurchase);
    app.post('/api/admin/updateMovieForPurchase', updateMovieForPurchase);
    app.delete('/api/admin/deleteMovieForPurchase/:entryId', deleteMovieForPurchase);
    app.get('/api/getAwards', getAllAwards);

    function getAllAwards(req, res) {
        getAllAwardsDb()
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getAllAwardsDb() {
        var deferred = q.defer();
        var queryStr = 'SELECT * FROM academy_awards';
        db.query(queryStr, function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function addMovie(req, res) {
        var movie = req.body;
        addMovieToDb(movie)
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function addMovieToDb(movie) {
        var deferred = q.defer();
        var queryStr = 'CALL add_movie(?,?,?,?,?,?,?,?,?,?)';
        db.query(queryStr, [movie.movie_name, movie.movie_duration, movie.movie_gross, movie.movie_language, movie.movie_content_rating, movie.movie_imdb_score, movie.movie_budget, movie.movie_year_released, movie.movie_country, movie.movie_director], function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function addMovieForPurchase(req, res) {
        var movie = req.body;
        addMovieForPurchaseDb(movie)
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function addMovieForPurchaseDb(movie) {
        console.log(movie);
        var deferred = q.defer();
        movie.movie_id = parseInt(movie.movie_id);
        var queryStr = 'CALL add_movie_for_purchase(?,?,?)';
        db.query(queryStr, [movie.movie_id, movie.movie_definition, movie.movie_price], function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function deleteMovie(req, res) {
        var movieId = req.params.movieId;
        deleteMovieDb(movieId)
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteMovieDb(movieId) {
        var deferred = q.defer();
        var queryStr = mysql.format('DELETE FROM movies WHERE movie_id=?');
        db.query(queryStr, [movieId], function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function deleteMovieForPurchase(req, res) {
        var entryId = req.params.entryId;
        deleteMovieForPurchaseDb(entryId)
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteMovieForPurchaseDb(entryId) {
        var deferred = q.defer();
        var queryStr = mysql.format('DELETE FROM movies_for_purchase WHERE entry_id=?');
        db.query(queryStr, [entryId], function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function updateMovie(req, res) {
        var movie = req.body;
        updateMovieDb(movie)
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateMovieDb(movie) {
        var deferred = q.defer();
        console.log(movie);
        var queryStr = mysql.format('CALL update_movie(?,?,?,?,?,?,?,?,?,?)');
        db.query(queryStr, [movie.movie_id, movie.movie_name, movie.movie_duration, movie.movie_gross, movie.movie_language, movie.movie_content_rating, movie.movie_imdb_score, movie.movie_budget, movie.movie_year_released, movie.movie_country], function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function updateMovieForPurchase(req, res) {
        var movie = req.body;
        updateMovieForPurchaseDb(movie)
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateMovieForPurchaseDb(movie) {
        var deferred = q.defer();
        console.log(movie);
        var queryStr = mysql.format('CALL update_movie_for_purchase(?,?,?)');
        db.query(queryStr, [movie.entry_id, movie.movie_definition, movie.movie_price], function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function getAllMoviesAdmin(req, res) {
        getAllMoviesAdminDb()
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getAllMoviesAdminDb() {
        var deferred = q.defer();
        var queryStr = mysql.format('SELECT * FROM movies ORDER BY movie_name');
        db.query(queryStr, function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function getMoviesForPurchaseAdmin(req, res) {
        getMoviesForPurchaseAdminDb()
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getMoviesForPurchaseAdminDb() {
        var deferred = q.defer();
        var queryStr = mysql.format('SELECT mp.entry_id, m.movie_id, movie_name, movie_definition, movie_price FROM movies as m JOIN movies_for_purchase as mp ON m.movie_id=mp.movie_id ORDER BY movie_name');
        db.query(queryStr, function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function purchase(req, res) {
        var obj = req.body;
        addPurchaseToDb(obj)
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function addPurchaseToDb(obj) {

        var deferred = q.defer();
        var queryStr = mysql.format('CALL add_purchase(?,?,?,?)');
        db.query(queryStr, [obj.movie.movie_id, obj.user.card.user_id, obj.user.card.entry_id, obj.purchase.quality], function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function search(req, res) {
        var searchObj = req.body;
        if (searchObj.type === 'all') {
            viewAllMovies(searchObj)
                .then(
                    function (doc) {
                        res.send(doc);
                    }
                )
        }
        else {
            if (searchObj.table === 'purchase') {
                console.log('search in purchase');
                searchMoviesForPurchase(searchObj)
                    .then(
                        function (doc) {
                            res.send(doc);
                        }
                    )
            }
            else {
                searchAllMovies(searchObj)
                    .then(
                        function (doc) {
                            res.send(doc);
                        }
                    )
            }
        }

    }

    function viewAllMovies(obj) {
        var deferred = q.defer();
        var queryStr = '';
        if (obj.table === 'purchase') {
            queryStr = mysql.format('CALL view_all_movies_p()');
        }
        else {
            queryStr = mysql.format('CALL view_all_movies()');
        }

        db.query(queryStr, function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function searchAllMovies(obj) {
        var deferred = q.defer();
        var queryStr = '';
        if (obj.type === 'movie') {
            queryStr = mysql.format('CALL search_by_movie(?)');
        }
        else if (obj.type === 'actor') {
            queryStr = mysql.format('CALL search_by_actor(?)');
        }
        else if (obj.type === 'director') {
            queryStr = mysql.format('CALL search_by_director(?)');
        }
        else if (obj.type === 'academy') {
            queryStr = mysql.format('CALL search_by_award(?)');
        }
        db.query(queryStr, [obj.str], function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function searchMoviesForPurchase(obj) {
        console.log(obj);
        var deferred = q.defer();
        var queryStr = '';
        if (obj.type === 'movie') {
            queryStr = mysql.format('CALL search_by_movie_p(?)');
        }
        else if (obj.type === 'actor') {
            queryStr = mysql.format('CALL search_by_actor_p(?)');
        }
        else if (obj.type === 'director') {
            queryStr = mysql.format('CALL search_by_director_p(?)');
        }
        db.query(queryStr, [obj.str], function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }


    function getAllMovies(req, res) {
        getAllMoviesFromDb()
            .then(
                function (doc) {
                    res.send(doc)
                }
            )
    }

    function getMoviesForPurchase(req, res) {
        getMoviesForPurchaseFromDb()
            .then(
                function (doc) {
                    res.send(doc);
                }
            )
    }

    function getMoviesForPurchaseFromDb() {
        var deferred = q.defer();
        var queryStr = mysql.format('SELECT movie_name, movie_duration, movie_language, movie_imdb_score, movie_year_released, movie_definition, movie_price FROM movies JOIN movies_for_purchase ON movies.movie_id=movies_for_purchase.movie_id ORDER BY movie_name');
        db.query(queryStr, function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function getAllMoviesFromDb() {
        var deferred = q.defer();
        var queryStr = mysql.format('Select * from movies');
        db.query(queryStr, function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }
}

