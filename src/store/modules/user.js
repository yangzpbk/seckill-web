/*
 * @Author: yangzp
 * @Description: 
 * @Date: 2022-10-26 15:39:22
 * @FilePath: \trade-web\src\store\modules\user.js
 */

import types from "../dataUtils/mutation-type";

// store/module/router.js
export default {
    namespaced: true,
    state: {
        userInfo: {},
    },
    mutations: {
        [types.SET_USER_INFO](state, userInfo) {
            console.log(state)
            state.userInfo = userInfo;
        }
    },
    getter: {
        userInfo(state) {
            return state.userInfo;
        }
    }
}

