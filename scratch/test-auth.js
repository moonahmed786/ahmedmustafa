const bcrypt = require('bcryptjs');
const password = 'BeGood@2255';
const hash = '$2b$12$xMObCVYQ6Jy9Gh5vXETbUuPig/B6Tzvnj9haWapemdpudCuVmQOii';

console.log('Password:', password);
console.log('Hash:', hash);
console.log('Match Result:', bcrypt.compareSync(password, hash));
