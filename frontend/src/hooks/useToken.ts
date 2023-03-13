import {store} from "../config/store";
import {loginWithRefresh} from "../features/login/userSlice";

export const useToken = async () => {
    const currentToken = store.getState().user.access_token
    console.log("useTokenCheck", currentToken)
    if (currentToken && checkIfTokenValid(currentToken)) {
        return currentToken
    } else {
        await store.dispatch(loginWithRefresh())
        const newToken = store.getState().user.access_token
        return newToken ? newToken : null
    }
}

const checkIfTokenValid = (token: string) => {
    const jwtPayload = JSON.parse(window.atob(token.split('.')[1]))
    return Date.now() < jwtPayload.exp * 1000;
}


