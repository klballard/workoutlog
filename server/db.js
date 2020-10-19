//1
const Sequelize = require('sequelize');

const sequelize = new Sequelize('newworkoutlog', 'postgres', 'c00ki3s', {
    host: 'localhost',  
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {   
        console.log('Connected to newworkoutlog postgres database');
    },
    function(err){ 
        console.log(err);
    }
);
                
module.exports = sequelize;

