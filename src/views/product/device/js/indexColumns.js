export const COLUMNS = [
    {
        title: "ID",
        dataIndex: "id",
        width: "80px"
    },
    {
        title: "用户名",
        dataIndex: "username",
    },
    {
        title: "型号",
        dataIndex: "type",
    },
    {
        title: "域名",
        dataIndex: "domain",
    },
    {
        title: "MAC地址",
        dataIndex: "macAddress",
    },
    {
        title: "状态",
        dataIndex: "status",
        scopedSlots: { customRender: 'status' },
    },
    {
        title: "出厂时间",
        dataIndex: "factoryTime",
    },
    {
        title: '操作',
        key: 'action',
        align: "right",
        scopedSlots: { customRender: 'action' },
    },
]