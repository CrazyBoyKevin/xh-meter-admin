import request from '@/utils/request'

const userApi = {
    Logout: '/auth/logout',
    Register: '/auth/register',
    // get my info
    UserInfo: '/user/info',
    UserMenu: '/user/nav'
}


export function getCurrentUserNav() {
    return request({
        url: userApi.UserMenu,
        method: 'get'
    })
}

export function logout() {
    return request({
        url: userApi.Logout,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}