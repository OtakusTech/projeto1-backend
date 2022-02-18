module.exports =  class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password =  password;

    }

    createUser(){
        console.log("hello world");
    }
    saveUser(){

    }
    deleterUser(){

    }
    updateUser(){

    }
    set setName(new_name) {
        this.name = new_name;
    }
    get getName() {
        return this.name;
    }
    set setEmail(new_email) {
        this.email = new_email;
    }
    get getEmail() {
        return this.email;
    }
    set setPassword(new_password) {
        this.password = new_password;
    }
    get getEmail() {
        return this.email;
    }
} 

