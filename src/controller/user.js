var User = require("D:/Documentos_D/UFCG/2021.1e/Projeto em Computação I/Projeto - AnimeTags/projeto1-backend/src/models/user.js");

module.exports = function createUser(name, email, password) {
    var user = new User(name, email, password)
    return user;
}







