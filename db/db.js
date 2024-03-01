import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('basic-crud-db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // to off the console logging on each query we fire
    // modelPaths: [path.resolve(__dirname, 'models')], // if we change folder  name other than model then we can use this.
});

(async () => {
    await sequelize.sync();
})();

export default sequelize;
