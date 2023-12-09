import { Sequelize } from "sequelize";

const db = new Sequelize('Users_db','test-db','123456', {
    host: "/cloudsql/test123-407613:asia-southeast2:test-db",
    dialect: "mysql",
    dialectOptions: {
        socketPath: '/cloudsql/test123-407613:asia-southeast2:test-db'
    }
});

export default db;