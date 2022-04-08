export const COLUMNS = [
    {
        title: "ID",
        dataIndex: "id",
        width: "50px"
    },
    {
        title: "批次号",
        dataIndex: "batchNo",
        width: "100px"
    },
    {
        title: "产品",
        dataIndex: "product.productName",
    },
    {
        title: "产品型号",
        dataIndex: "product.type",
    },
    {
        title: '生产状态',
        dataIndex: 'status',
        width: "120px",
        scopedSlots: { customRender: 'status' },
    },
    {
        title: "批次剩余配额",
        dataIndex: "quota",
        width: "120px"
    },
    {
        title: "已使用配额",
        dataIndex: "registerCount",
        width: "120px"
    },
    {
        title: "添加时间",
        dataIndex: "createTime",
        width: "180px"
    },
    {
        title: "更新时间",
        dataIndex: "updateTime",
        width: "180px"
    },
    {
        title: '操作',
        key: 'action',
        align: "right",
        scopedSlots: { customRender: 'action' },
    },
]