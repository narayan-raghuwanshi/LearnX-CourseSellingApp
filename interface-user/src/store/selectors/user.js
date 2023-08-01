import {selector} from "recoil";
import { userState } from "../atoms/user";

export const isLoadingSelector = selector({
    key: "userLoadingState",
    get: ({get})=>{
        const state = get(userState);
        return state.isLoading;
    }
});

export const userEmailSelector  = selector({
    key:"userEmailState",
    get: ({get})=>{
        const state= get(userState);
        return state.userEmail;
    }
})