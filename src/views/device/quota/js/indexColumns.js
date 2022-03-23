export const COLUMNS = [
    {
        title: "ID",
        dataIndex: "id",
        width: "80px",
    },
    {
        title: "设备名",
        dataIndex: "deviceName",
    },
    {
        title: "MAC地址",
        dataIndex: "macAddress",
        width: "140px",
    },
    {
        title: 'iotId',
        dataIndex: 'iotId',
        width: "260px",
    },
    {
        title: "状态",
        dataIndex: "status",
        width: "110px",
        scopedSlots: { customRender: 'status' },
    },
    {
        title: "注册时间",
        dataIndex: "registerTime",
        width: "200px",
    },
]