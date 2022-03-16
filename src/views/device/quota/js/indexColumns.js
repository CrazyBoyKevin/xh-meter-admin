export const COLUMNS = [
    {
        title: "ID",
        dataIndex: "id",
        width: "50px"
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
        title: 'iotId',
        dataIndex: 'iotId',
    },
    {
        title: "状态",
        dataIndex: "status",
        scopedSlots: { customRender: 'status' },
    },
    {
        title: "注册时间",
        dataIndex: "registerTime",
    },
]