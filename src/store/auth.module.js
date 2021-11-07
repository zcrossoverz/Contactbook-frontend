import http from "../common/http";
import { handle } from "../common/promise";

const state = {
    user: {
        id: String,
        username: String,
        email: String,
        accessToken: String
    },
    status: {
        loggedIn: Boolean
    }
};

const mutations = {
    initAuthState(state) {
        state.user = JSON.parse(localStorage.getItem("user"));
        state.status.loggedIn = !!state.user;
    },
    login(state, user) {
        state.status.loggedIn = true;
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
        state.status.loggedIn = false;
        state.user = null;
        localStorage.removeItem("user");
    },
    clearLoginStatus(state) {
        state.status.loggedIn = false;
    },
};

const actions = {
    async login({ commit }, user) {
        let [error, response] = await handle(
            http.post("/auth/signin", {
                username: user.username,
                password: user.password,
            })
        );

        if (error || ! response.data.accessToken) {
            commit("logout");
            if (! error) {
                error = new Error("Whoops, no access token found!");
            }
            throw error;
        }

        commit("login", response.data);
        return response.data;
    },
    async register({ commit }, user) {
        const [error, response] = await handle(
            http.post("/auth/signup", {
                username: user.username,
                email: user.email,
                password: user.password,
            })
        );
        
        commit("clearLoginStatus");
        
        if (error) {
            throw error;
        }
        return response.data;
    }
};

const getters = {
    userLoggedIn(state) {
        return state.status.loggedIn;
    },
    loggedInUser(state) {
        return state.user;
    }
};

export const auth = {
    state,
    mutations,
    actions,
    getters
};