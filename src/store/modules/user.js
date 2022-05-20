import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { GET, POST } from '@/utils/methods'

const user = {
    state: {
        token: '',
        name: '',
        welcome: '',
        avatar: '',
        roles: '',
        info: {}
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, { name, welcome }) => {
            state.name = name
            state.welcome = welcome
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_INFO: (state, info) => {
            state.info = info
        }
    },

    actions: {
        Login({ commit }, userInfo) {
            return new Promise(resolve => {
                POST("/auth/login?username=" + userInfo.username + "&password=" + userInfo.password, null).then(res => {
                    if (res.code == 200) {
                        const result = res.data
                        storage.set(ACCESS_TOKEN, result.accessToken, 7 * 24 * 60 * 60 * 1000)
                        commit('SET_TOKEN', result.accessToken)
                        // let roles = []
                        // roles.push(result.role)
                        // commit('SET_TOKEN', result.accessToken)
                    }
                    resolve(res)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                GET("/user/info").then(response => {
                    const result = response.data
                    if (result.role) {
                        let r = []
                        r.push(result.role)
                        commit('SET_ROLES', r)
                        commit('SET_INFO', result)
                    } else {
                        reject(new Error('getInfo: roles must be a non-null array !'))
                    }
                    commit('SET_NAME', { name: result.username, welcome: welcome() })
                    resolve(result)
                    // if (result.role && result.role.permissions.length > 0) {
                    //     const role = result.role
                    //     role.permissions = result.role.permissions
                    //     role.permissions.map(per => {
                    //         if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                    //             const action = per.actionEntitySet.map(action => { return action.action })
                    //             per.actionList = action
                    //         }
                    //     })
                    //     role.permissionList = role.permissions.map(permission => { return permission.permissionId })
                    //     commit('SET_ROLES', result.role)
                    //     commit('SET_INFO', result)
                    // } else {
                    //     reject(new Error('getInfo: roles must be a non-null array !'))
                    // }

                    // commit('SET_NAME', { name: result.name, welcome: welcome() })
                    // commit('SET_AVATAR', result.avatar)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout({ commit, state }) {
            return new Promise((resolve) => {
                // logout(state.token).then(() => {
                //     commit('SET_TOKEN', '')
                //     commit('SET_ROLES', [])
                //     storage.remove(ACCESS_TOKEN)
                //     resolve()
                // }).catch((err) => {
                //     console.log('logout fail:', err)
                //     // resolve()
                // }).finally(() => {
                // })
            })
        }
    }
}

export default user
