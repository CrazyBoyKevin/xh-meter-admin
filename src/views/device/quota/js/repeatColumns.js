export const COLUMNS = [
    {
        title: "MAC地址",
        dataIndex: "mac_address",
    },
    {
        title: "重复时间",
        dataIndex: "datetime",
    },
    {
        title: '操作',
        key: 'action',
        align: "right",
        scopedSlots: { customRender: 'action' },
    },
]