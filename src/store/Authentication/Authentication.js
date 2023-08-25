const INITIAL_STATE = {
    isAuthorized : false,
    loginData : null,
}

const Authentication = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ON_LOGIN":
            return {
                ...state,
                isAuthorized : true,
                loginData : {...action.value },
            };
        case "ON_LOGOUT":
                return {
                    ...state,
                    isAuthorized : false,
                    loginData : null,
                };

        default:
            return state;
    }
}


export default Authentication;