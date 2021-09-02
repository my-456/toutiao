/**
 * 
 */

import request from "../utils/request";

/**
 * 获取文章列表
 */

export function getArticles(data){
    return request({
        method:'get',
        url:'/app/v1_1/articles',
        params:data
    })
}