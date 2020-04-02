function validateAdressWSQ(user,secretQ, con, callback){

    queryPw = con.query("SELECT * FROM utilisateurs WHERE email=\'" + user + "\'", function(err, result){
        if(err) throw err;

        if(result[0] == null){
            return callback(false);
        }

        querysecretQ= result[0].secretQ;

        if(querysecretQ == secretQ){
            return callback(true, result[0]);
        }

        return callback(false);
    })
}

exports.validateAdressWSQ = validateAdressWSQ;