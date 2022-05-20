export const COLUMNS = [
    {
        title: "ID",
        dataIndex: "id",
        width: "50px"
    },
    {
        title: "产品型号",
        dataIndex: "deviceType",
    },
    {
        title: '主版本号',
        dataIndex: 'mFirmwareVersion',
        width: "120px",
    },
    {
        title: "子版本号",
        dataIndex: "sFirmwareVersion",
        width: "120px"
    },
    {
        title: "下载链接",
        dataIndex: "downloadLink",
        width: "180px"
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