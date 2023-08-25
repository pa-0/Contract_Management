import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import conn from "../../../../../Database/dbConnection";

const secret = process.env.AUTH_SECRET_CODE;

export default async function (req, res) {
    //------------------- Backend start -----------------------------
    const isAuthorizedFromBackend = async (emailID,password) => { 
        const values = [emailID,password];
        const query = `SELECT employee_id,email,role,name,logo->>'url' as "url" FROM LOGIN JOIN EMPLOYEE ON LOGIN.EMPLOYEE_ID = EMPLOYEE.EID WHERE email = $1 and password = $2;`;
        const result = await conn.query(query,values);
        return result.rows;
    }
    //------------------- Backend end ---------------------------------
    const { email , password } = req.body;
    // Check in the database
    try {
        let loginData = await isAuthorizedFromBackend(email,password);
        if (email && loginData.length>0) {
            const token = sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
                    id: loginData[0].employee_id,
                    email: loginData[0].email,
                    name: loginData[0].name,
                    role: loginData[0].role,
                    logoURL: loginData[0].url
                },
                secret
            );

            const serialised = serialize("SIGNJWT", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });

            res.setHeader("Set-Cookie", serialised);
            res.status(200).json({
                status: "Success", data: {
                    id: loginData[0].employee_id,
                    email: loginData[0].email,
                    name: loginData[0].name,
                    role: loginData[0].role,
                    logoURL: loginData[0].url
                }
            });
        } else {
            res.status(200).json({ status: "failure" });
        }
    } catch (e) {
        res.status(500).json({ status: "500" });
    }

}