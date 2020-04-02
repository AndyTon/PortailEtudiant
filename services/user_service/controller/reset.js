function validateresetPw(user,newPw,confirmPw, con, callback){

    queryPw = con.query("SELECT * FROM utilisateurs WHERE email=\'" + user + "\'", function(err, result){
        if(err) throw err;

        if(result[0] == null){
            return callback(false);
        }

        if(newPw == confirmPw){
            return callback(true, result[0]);
            let sql = 'UPDATE utilisateurs SET ? WHERE email = :email', {email: email, pw: newPw}
            con.query(sql,
                function(err,result){
                    if(err) throw err;

                    return callback(true);
                });
        }

        return callback(false);
    })
}

exports.validateresetPw = validateresetPw;