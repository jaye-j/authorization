const pbkdf2 = require('pbkdf2');
const crypto = require('crypto');

let password = 'password123';

let salt = crypto.randomBytes(20).toString('hex');

let key = pbkdf2.pbkdf2Sync(password, salt, 3600, 256, 'sha256')

let hash = key.toString('hex');

// console.log(salt);
// console.log('hello world');
// console.log(hash);

//this will be stored in our database

let stored_password = `pbkdf2_sha256$3600$${salt}$${hash}`;

//1. validating user password

//checking a password
///////////////////////////////////////////////////////////////

let login = "password123";

let password_parts = stored_password.split('$');

// password_parts = ['password123', '3600', 'salt', 'hash']

let keyNewLogin = pbkdf2.pbkdf2Sync(
    login,
    password_parts[2],
    parseInt(password_parts[1]),
    256,
    'sha256'
);

let hashNewLogin = keyNewLogin.toString('hex');

if(hashNewLogin == password_parts[3]){
    console.log('passwords match');
}else{
    console.log('password doesnt match');
}