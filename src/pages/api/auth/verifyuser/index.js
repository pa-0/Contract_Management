import conn from "../../../../../Database/dbConnection";
export default async function (req, res) {
  try {
    const values = [req.body.emailID];
    const query = `SELECT employee_id,email,role,name,logo->>'url' as "url"  FROM LOGIN JOIN EMPLOYEE ON LOGIN.EMPLOYEE_ID = EMPLOYEE.EID WHERE email = $1;`;
    // console.log("Query");
    const result = await conn.query(query,values);
    // console.log("auth");
    // console.log(result.rows);
    res.status(200).json({ data: result.rows});
  } catch (e) {
    res.status(200).json({ status: "500" });
  }
}
