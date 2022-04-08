export const COLUMNS = [
    {
        title: "MAC地址",
        dataIndex: "macAddress",
    },
    {
        title: "重复时间",
        dataIndex: "timestamp",
    },
    {
        title: '操作',
        key: 'action',
        align: "right",
        scopedSlots: { customRender: 'action' },
    },
]