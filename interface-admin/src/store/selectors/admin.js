import { adminState } from "../atoms/admin";
import {selector} from "recoil";

export const adminEmailSelector = selector({
    key: "adminEmailState",
    get: ({get})=>{
        const state =get(adminState);
        return state.adminEmail;
    }
});

export const isLoadingSelector = selector({
    key: "adminLoadingState",
    get: ({get})=>{
        const state = get(adminState);
        return state.isLoading;
    }
});