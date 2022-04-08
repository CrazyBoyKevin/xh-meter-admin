<template>
    <a-card class="repeat" :bordered="false" title="设备MAC地址重复列表">
        <a-table :columns="columns" rowKey="timestamp" :data-source="data" bordered>
            <span slot="action" slot-scope="text, record">
                <a-popconfirm
                    :title="
                        `确定注册MAC地址为` +
                        record.mac_address +
                        `的设备？此操作将删除之前注册设备的所有数据`
                    "
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="confirmRegisterRepeat(record)"
                >
                    <a href="#">确认</a>
                </a-popconfirm>

                <a-divider type="vertical" />

                <a-popconfirm
                    :title="
                        `确定注册MAC地址为` +
                        record.macAddress +
                        `的设备？此操作将删除之前注册设备的所有数据`
                    "
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="giveUpRegisterRepeat(record)"
                >
                    <a href="#">丢弃</a>
                </a-popconfirm>
            </span>
        </a-table>
    </a-card>
</template>

<script>
import { COLUMNS } from "./js/repeatColumns";
import { GET, POST } from "@/utils/methods";
export default {
    name: "RepeatDeviceList",
    data() {
        return {
            columns: COLUMNS,
            data: [],
            timer: null,
        };
    },
    mounted() {
        this.getRepeatDeviceList();
        this.timer = setInterval(() => {
            setTimeout(this.getRepeatDeviceList(), 1000);
        }, 1000 * 10);
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
    methods: {
        getRepeatDeviceList() {
            GET("/device/repeat/register").then((res) => {
                if (res.code == 200) {
                    this.data = res.data;
                } else {
                    this.$notification["error"]({
                        message: "错误",
                        description: res.msg,
                    });
                }
            });
        },
        giveUpRegisterRepeat(record) {
            const params = {
                macAddress: record.macAddress,
            };
            POST("/device/repeat/register/give/up", params).then((res) => {
                if (res.code == 200) {
                    this.$notification["success"]({
                        message: "丢弃成功",
                    });
                    this.getRepeatDeviceList();
                } else {
                    this.$notification["error"]({
                        message: "错误",
                        description: res.msg,
                    });
                }
            });
        },
        confirmRegisterRepeat(record) {
            const params = {
                macAddress: record.macAddress,
                timestamp: record.timestamp,
            };
            POST("/device/repeat/register/confirm", params).then((res) => {
                if (res.code == 200) {
                    this.$notification["success"]({
                        message: "注册成功",
                    });
                    this.getRepeatDeviceList();
                } else {
                    this.$notification["error"]({
                        message: "错误",
                        description: res.msg,
                    });
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
/deep/ .ant-table-tbody > tr > td {
    padding: 10px;
}
</style>
