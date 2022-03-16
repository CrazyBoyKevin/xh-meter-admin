export const COLUMNS = [
    {
        title: "ID",
        dataIndex: "id",
        width: "80px"
    },
    {
        title: "设备名",
        dataIndex: "deviceName",
    },
    {
        title: "MAC地址",
        dataIndex: "macAddress",
    },
    {
        title: '地区',
        dataIndex: 'region',
    },
    {
        title: 'iotId',
        dataIndex: 'iotId',
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