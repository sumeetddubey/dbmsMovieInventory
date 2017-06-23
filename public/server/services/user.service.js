/**
 * Created by sumeetdubey on 6/20/17.
 */
module.exports=function(app, db){
    var mysql=require('mysql');
    var q=require('q');

    app.get('/api/allUsers', getAllUsers);
    app.post('/api/login', login);
    app.post('/api/register', register);
    app.post('/api/paymentDetails', paymentDetails);
    app.post('/api/userMovies', getUserMovies);
    app.post('/api/updateUser', updateUser);
    app.post('/api/addPaymentMethod', addPaymentMethod);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/admin/addUser', addUser);
    app.delete('/api/deleteUser/:userId', deleteUser);

    function addUser(req, res){
        var user=req.body;
        addUserToDb(user)
            .then(
                function(doc){
                    res.send(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function addUserToDb(user){
        var deferred= q.defer();
        var queryStr='CALL add_user(?,?,?,?,?,?,?)';
        db.query(queryStr,[user.username, user.password, user.firstname, user.lastname, user.dob, user.phno, user.email], function(err,res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function deleteUser(req, res){
        var userId=req.params.userId;
        deleteUserFromDb(userId)
            .then(
                function(doc){
                    res.send(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function deleteUserFromDb(userId){
        var deferred= q.defer();
        var queryStr='DELETE FROM users WHERE user_id=?';
        db.query(queryStr,[userId], function(err,res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function getAllUsers(req, res){
        getAllUsersDb()
            .then(
                function(doc){
                    res.send(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function getAllUsersDb(){
        var deferred= q.defer();
        var queryStr='SELECT * FROM users';
        db.query(queryStr, function(err,res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function checkAdmin(req, res){
        var user=req.body;
        checkAdminDb(user)
            .then(
                function(doc){
                    res.send(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function checkAdminDb(user){
        var deferred= q.defer();
        var queryStr='SELECT check_admin(?)';
        db.query(queryStr, [user.username], function(err,res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function updateUser(req, res){
        var user=req.body;
        updateUserDb(user)
            .then(
                function(doc){
                    res.send(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function addPaymentMethod(req, res){
        var payment=req.body;
        console.log(payment);
        addPaymentMethodDb(payment)
            .then(
                function(doc){
                    res.send(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function updateUserDb(user){
        var deferred= q.defer();
        var queryStr='UPDATE users SET user_username=?, user_password=?, user_firstname=?, user_lastname=?, user_dob=?, user_contact_number=?, user_email=? WHERE user_id=?';
        db.query(queryStr, [user.user_username, user.user_password, user.user_firstname, user.user_lastname, user.user_dob, user.user_contact_number, user.user_email, user.user_id], function(err,res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function addPaymentMethodDb(payment){
        console.log(payment);
        var deferred= q.defer();
        var queryStr='INSERT INTO payment_method (card_type, card_number, card_expiry, name_on_card, card_security_code, user_id) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(queryStr, [payment.card_type, payment.card_number, payment.card_expiry, payment.name_on_card, payment.card_security_code, payment.user_id], function(err,res){
            if(err){
                console.log(err);
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function getUserMovies(req, res){
        var user=req.body;
        getUserMoviesFromDb(user)
            .then(
                function(doc){
                    res.send(doc);
                },
                function(err){
                    res.send(err);
                }
            )
    }

    function getUserMoviesFromDb(user){
        //console.log(user);
        var deferred= q.defer();
        var queryStr='CALL get_user_movies(?)';
        db.query(queryStr, [parseInt(user.user_id)], function(err,res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function paymentDetails(req, res){
        var user=req.body;
        getPaymentInfoDb(user)
            .then(
                function(doc){
                    res.send(doc);
                },
                function(err){
                    res.status(400).send(err)
                })
        }

    function getPaymentInfoDb(user){
        var deferred= q.defer();
        var queryStr='CALL payment_info(?)';
        db.query(queryStr, [parseInt(user.user_id)], function(err,res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function login(req, res){
        var user=req.body;
        findUser(user)
            .then(
                function(doc){
                    res.send(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function register(req, res){
        var user=req.body;
        createUser(user)
            .then(
                function(doc){
                    res.send(doc);
                },
                function(err){
                    res.status(400).send(err)
                }
            )
    }

    function createUser(user){
        var deferred= q.defer();
        var values=[[user.username, user.password, user.fName, user.lName, user.dob, user.phno, user.email]];
        var queryStr=mysql.format('INSERT INTO `users` (user_username, user_password, user_firstname, user_lastname, user_dob, user_contact_number, user_email) VALUES ? ');
        db.query(queryStr, [values], function(err,res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function findUser(user){
        var deferred= q.defer();
        var queryStr= mysql.format('Select * from users where user_username=?', user.username);
        db.query(queryStr, function(err, res){
            if(err){
                deferred.reject(err);
            }
            else if(res.length<1){
                deferred.reject('nf');
            }
            else{
                var dbEntry=res[0];
                if(validate(user.password, dbEntry.user_password)){
                    deferred.resolve(res);
                }
                else deferred.reject('nf');
            }
        });
        return deferred.promise;
    }

    function validate(pass1, pass2){
        return (pass1===pass2);
    }
};