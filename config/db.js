import mysql from "mysql2/promise";

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "newdb",
});

export default mysqlPool;
