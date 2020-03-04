import { GET_ERRORS } from "./types"

export const getErrorLog = (message, status) => {
    return {
        type: GET_ERRORS, 
        payload: { message, status }
    }
}