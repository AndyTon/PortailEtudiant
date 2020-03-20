function validateLogin(user,pw, con, callback){

    queryPw = con.query("SELECT * FROM user WHERE email=\'" + user + "\'", function(err, result){
        if(err) throw err;

        if(result[0] == null){
            return callback(false);
        }

        queryPW = result[0].password;

        if(queryPW == pw){
            return callback(true);
        }

        return callback(false);
    })
}

exports.validateLogin = validateLogin;