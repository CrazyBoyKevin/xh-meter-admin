export const COLUMNS = [
    {
        title: "头像",
        dataIndex: "customer.avatar",
        scopedSlots: { customRender: 'avatar' },
        width: "60px",
        fixed: 'left',
        align: "center"
    },
    {
        title: "微信昵称",
        dataIndex: "customer.nickname",
        fixed: 'left',
        width: "160px"
    },
    {
        title: "ID",
        dataIndex: "id",
        width: "80px"
    },
    {
        title: "备注名",
        dataIndex: "alias",
        width: "120px"
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
        title: "IP地址",
        dataIndex: "ipAddress",
        width: "140px"
    },
    {
        title: "绑定时间",
        dataIndex: "boundTime",
        width: "180px"
    },
    {
        title: "过期时间",
        dataIndex: "expireDate",
        width: "180px"
    },
    {
        title: "型号",
        dataIndex: "type",
        width: "100px"
    },
    {
        title: "版本",
        width: "75px",
        align: "center",
        scopedSlots: { customRender: 'version' },
    },
    // {
    //     title: "子版本",
    //     dataIndex: "sfirmwareVersion",
    //     width: "75px",
    //     align: "center"
    // },
    {
        title: "状态",
        dataIndex: "status",
        scopedSlots: { customRender: 'status' },
        width: "120px"
    },
    {
        title: "最后推送时间",
        dataIndex: "lastPushTime",
        width: "180px"
    },
    // {
    //     title: "更新时间",
    //     dataIndex: "updateTime",
    //     width: "180px"
    // },
    {
        title: '操作',
        key: 'action',
        align: "right",
        scopedSlots: { customRender: 'action' },
        fixed: 'right'
    },
]