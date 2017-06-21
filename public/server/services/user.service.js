/**
 * Created by sumeetdubey on 6/20/17.
 */
module.exports=function(app, db){
    var mysql=require('mysql');
    var q=require('q');

    app.post('/api/login', login);
    app.post('/api/register', register);

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