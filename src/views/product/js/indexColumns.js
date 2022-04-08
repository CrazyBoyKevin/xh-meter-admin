export const COLUMNS = [
    {
        title: "ID",
        dataIndex: "id",
        width: "80px"
    },
    {
        title: "产品名称",
        dataIndex: "productName",
    },
    {
        title: "产品型号",
        dataIndex: "type",
    },
    {
        title: '设备数量',
        dataIndex: 'deviceCount',
    },
    {
        title: "添加时间",
        dataIndex: "createTime",
        width: "180px"
    },
    {
        title: "操作",
        key: 'action',
        align: "right",
        scopedSlots: { customRender: 'action' },
    },
]