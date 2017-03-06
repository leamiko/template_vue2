import converse from '../../api/jetperu'

function getUser() {
    if (typeof localStorage.data != 'undefined') {
        let user = {};
        user = JSON.parse(localStorage.data);
        return user.name
    } else {
        return 'Usuario'
    }
}
function getRole() {
    if (typeof localStorage.data != 'undefined') {
        let data;
        data = JSON.parse(localStorage.data);
        return data.role_id;
    } else {
        return '';
    }
}
function getStatus() {
    return !!localStorage.token
}
const state = {
    user: getUser(),
    role: getRole(),
    loggedIn: getStatus(),
    expired: false
};

// getters
const getters = {
    getToken: state => {
        const prefix= 'Bearer ';
        if (typeof localStorage.token != 'undefined') {
            return prefix+localStorage.token;
        } else {
            return '';
        }
    },
    isExpired:  ()=> {
        if (typeof localStorage.data != 'undefined') {
            let data;
            data = JSON.parse(localStorage.data);
            return new Date().getTime() > parseInt(data.expiration);
        } else {
            return false;
        }
    }
};

// actions
const actions = {

};

// mutations
const mutations = {
    changeStateLogin (state, new_state) {
        state.loggedIn = new_state
    },
    changeUser (state, name) {
        state.user = name
    },
    changeRole (state, role) {
        state.role = role
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
