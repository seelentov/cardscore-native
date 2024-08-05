import { createSlice } from "@reduxjs/toolkit"
import { useContext } from "react";
import { NotifContext } from "../../../provider/NotifProvider";
import { useUpdateNotifMutation } from "../api/auth.api";

export interface AuthStore{ token: string }

const initialState: AuthStore = {
    token: ""
}
  
  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setToken: (state, { payload: action }) => {

        state.token = action
      },
    },
  })