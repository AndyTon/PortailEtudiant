function makeCertificate(callback){
    var crypto = require('crypto');
    var certificate = crypto.randomBytes(20).toString('hex');

    return callback(certificate);
}

function checkCertificate(){

}

exports.makeCertificate = makeCertificate;
exports.checkCertificate = checkCertificate;