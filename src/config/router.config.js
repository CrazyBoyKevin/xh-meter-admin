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
        redirect: '/device/quota',
        children: [
            {
                path: '/device',
                name: 'device',
                redirect: '/device/quota',
                component: RouteView,
                meta: { title: '设备', keepAlive: true, icon: "dashboard", roles: ['ADMIN'] },
                children: [
                    {
                        path: '/device/quota',
                        name: 'Quota',
                        component: () => import('@/views/device/quota/index.vue'),
                        meta: { title: '配额', keepAlive: true }
                    },
                    {
                        path: '/device/batch',
                        name: 'Batch',
                        component: () => import('@/views/device/batch/index.vue'),
                        meta: { title: '生产批次', keepAlive: true }
                    }
                ]
            },
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
