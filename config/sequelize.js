const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: 'eduwork-cruds-v2',
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: ''
});

(async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
    }catch (error) {
        console.error('Unable connect to database', error);
    }
})();


module.exports = sequelize;