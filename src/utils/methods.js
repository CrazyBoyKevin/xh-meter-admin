import request from './request'

export function GET(url, params) {
    return request({
        url: url,
        method: 'get',
        params: params
    })
}

export function POST(url, data) {
    return request({
        url: url,
        method: 'post',
        data: data
    })
}