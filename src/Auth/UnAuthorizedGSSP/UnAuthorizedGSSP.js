
export function UnAuthorizedGSSP(gssp) {
  return async (context) => {
    if (context.req.cookies.SIGNJWT) {
      return { redirect: { destination: "/", permanent: false } };
    }
    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
