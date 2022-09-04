import { UserLayout, BasicLayout } from '@/layouts'

const RouteView = {
    name: 'RouteView',
    render: h => h('router-view')
}

export const asyncRouterMap = [
    {
        path: '/',
        name: 'index',
        component: BasicLayout,
        meta: { title: '首页' },
        redirect: '/device/register',
        children: [
            {
                path: '/device/register',
                name: 'deviceRegister',
                component: () => import('@/views/register/index.vue'),
                meta: { title: '设备注册', keepAlive: true, icon: "dashboard", roles: ['ADMIN'] }
            },
            {
                path: '/product',
                name: 'product',
                component: () => import('@/views/product/index.vue'),
                meta: { title: '产品', keepAlive: true, icon: "gold", roles: ['ADMIN'] }
            },
            {
                path: '/firmware',
                name: 'firmware',
                component: () => import('@/views/firmware/index.vue'),
                meta: { title: '固件', keepAlive: true, icon: "file-zip", roles: ['ADMIN'] }
            },
            {
                path: '/custom/service',
                name: 'customService',
                component: () => import('@/views/customService/deviceSearch.vue'),
                meta: { title: '售后查询', keepAlive: true, icon: "file-zip", roles: ['ADMIN'] }
            },
            // {
            //     path: '/device',
            //     name: 'Device',
            //     redirect: '/device/quota',
            //     component: RouteView,
            //     meta: { title: '设备', keepAlive: true, icon: "dashboard", roles: ['ADMIN'] },
            //     children: [
            //         {
            //             path: '/device/quota',
            //             name: 'Quota',
            //             component: () => import('@/views/device/quota/index.vue'),
            //             meta: { title: '配额', keepAlive: true }
            //         },
            //     ]
            // },
        ],
    },
    {
        path: '/product',
        name: 'product',
        component: BasicLayout,
        meta: { keepAlive: true, roles: ['ADMIN'] },
        children: [
            {
                path: '/batch',
                name: 'batch',
                component: () => import('@/views/product/batch/index.vue'),
            },
            {
                path: '/batch/device',
                name: 'batchDevice',
                component: () => import('@/views/product/device/index.vue'),
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/user/Login')
            },
        ]
    }
    // {
    //     path: '/404',
    //     component: () => import('@/views/exception/404')
    // }
]
