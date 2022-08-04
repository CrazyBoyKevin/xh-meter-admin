export const COLUMNS = [
    {
        title: "产品型号",
        dataIndex: "deviceType",
        width: "140px",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.deviceType.length - b.deviceType.length,
    },
    {
        title: '主版本号',
        dataIndex: 'mfirmwareVersion',
        width: "100px",
    },
    {
        title: "子版本号",
        dataIndex: "sfirmwareVersion",
        width: "100px"
    },
    {
        title: "下载链接",
        dataIndex: "downloadLink",
    },
    {
        title: "状态",
        dataIndex: "status",
        scopedSlots: { customRender: 'status' },
        width: "120px"
    },
    {
        title: "描述",
        dataIndex: "desc",
    },
    {
        title: "添加时间",
        dataIndex: "createTime",
        width: "180px"
    },
    {
        title: '操作',
        key: 'action',
        align: "right",
        scopedSlots: { customRender: 'action' },
    },
]