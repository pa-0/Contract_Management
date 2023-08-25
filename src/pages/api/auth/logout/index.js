import { serialize } from "cookie";

export default async function (req, res) { 
    if(req.cookies.SIGNJWT){
        const serialised = serialize("SIGNJWT", null, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: -1,
            path: "/",
        });
        res.setHeader("Set-Cookie", serialised);
        res.status(200).json({message : "logout Successfully !!"});
    }else{
        res.status(200).json({message : "Haven't login yet !!"});
    }
    
}