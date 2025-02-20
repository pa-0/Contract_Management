import { Pool } from "pg";

let conn;

try{
if (!conn) {
  conn = new Pool({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: process.env.PGSQL_PORT,
    database: process.env.PGSQL_DATABASE,
  });
  // console.log("Postgresql Connection Established")
}
}
catch(e){
  // console.log(e)
}

export default conn ;