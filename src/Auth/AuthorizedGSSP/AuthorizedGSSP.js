import jwtDecode from "jwt-decode";

export function AuthorizedGSSP(gssp) {
  return async (context) => {
    if (!context.req.cookies.SIGNJWT) {
      return { redirect: { destination: "/login", permanent: false } };
    }
    const jwtToken = { jwt: context.req.cookies.SIGNJWT };
    const { id, email, name, logoURL } = jwtDecode(context.req.cookies.SIGNJWT);
    const signUser = { id, email, name, logoURL };
    return await gssp(context, jwtToken, signUser); // Continue on to call `getServerSideProps` logic
  };
}

