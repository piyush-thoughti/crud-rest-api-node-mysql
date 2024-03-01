import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config('../.env');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // to off the console logging on each query we fire
    // modelPaths: [path.resolve(__dirname, 'models')], // if we change folder  name other than model then we can use this.
});

(async () => {
    await sequelize.sync();
})();

export default sequelize;
