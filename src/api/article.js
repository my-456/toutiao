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


/**
 * 获取文章详情
 */

 export function getArticleById(articleId){
    return request({
        method:'get',
        url:`/app/v1_1/articles/${articleId}`,
    })
}