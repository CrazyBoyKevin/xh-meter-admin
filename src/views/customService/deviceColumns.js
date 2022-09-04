export const COLUMNS = [
    {
        title: "头像",
        dataIndex: "customer.avatar",
        scopedSlots: { customRender: 'avatar' },
        width: "60px",
        fixed: 'left'
    },
    {
        title: "微信昵称",
        dataIndex: "customer.nickname",
        fixed: 'left',
        width: "160px"
    },
    {
        title: "MAC地址",
        dataIndex: "macAddress",
        width: "130px"
    },
    {
        title: "用户名",
        dataIndex: "username",
        width: "300px"
    },
    {
        title: "绑定时间",
        dataIndex: "boundTime",
        width: "180px"
    },
    {
        title: "型号",
        dataIndex: "type",
        width: "120px"
    },
    {
        title: "状态",
        dataIndex: "status",
        scopedSlots: { customRender: 'status' },
        width: "120px"
    },
    {
        title: '操作',
        key: 'action',
        align: "right",
        scopedSlots: { customRender: 'action' },
        fixed: 'right'
    },
]