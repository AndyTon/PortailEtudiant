function validateLogin(user,pw, con, callback){

    queryPw = con.query("SELECT * FROM utilisateurs WHERE email=\'" + user + "\'", function(err, result){
        if(err) throw err;

        if(result[0] == null){
            return callback(false);
        }

        queryPW = result[0].pw;

        if(queryPW == pw){
            return callback(true, result[0]);
        }

        return callback(false);
    })
}

exports.validateLogin = validateLogin;