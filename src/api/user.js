import request from "../utils/request";

/**
 * 登录注册
 * @returns 
 */
export function Login(data) {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

/**
 * 发送短信验证码
 * @returns 
 */
 export function sendSms(mobile) {
    return request({
        method: 'get',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}


/**
 * 获取登录用户信息
 * @returns 
 */
 export function getCurrentUser() {
    return request({
        method: 'get',
        url: '/app/v1_0/user'
        // headers:{
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

/**
 * 获取用户频道列表
 * @returns 
 */
 export function getUserChannels() {
    return request({
        method: 'get',
        url: '/app/v1_0/user/channels'
    })
}


/**
 * 关注用户
 * @returns 
 */
 export function addFollow(userId) {
    return request({
        method: 'post',
        url: '/app/v1_0/user/followings',
        data:{
            target:userId
        }
    })
}

/**
 * 取消关注用户
 * @returns 
 */
 export function deleteFollow(userId) {
    return request({
        method: 'deleteFollow',
        url: `/app/v1_0/user/followings/${userId}`
    })
}

/**
 * 获取用户个人资料
 */

 export function getUserProfile() {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/profile`
    })
}