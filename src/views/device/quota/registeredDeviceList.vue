<template>
    <a-card class="registered" :bordered="false" title="注册成功设备">
        <a-input-search
            slot="extra"
            href="#"
            placeholder="通过MAC地址查询"
            enter-button
            v-model="searchMacAddress"
            @search="onSearchByMacAddress()"
        />
        <a-table :columns="columns" rowKey="id" :data-source="data">
            <span slot="status" slot-scope="status">
                <!-- ONLINE：设备在线,OFFLINE：设备离线,UNACTIVE：设备未激活,DISABLE：设备已禁用 -->
                <a-tag v-if="status == 'ONLINE'" color="#87d068">在线</a-tag>
                <a-tag v-if="status == 'OFFLINE'" color="#999999">离线</a-tag>
                <a-tag v-if="status == 'UNACTIVE'" color="#FFA500">未激活</a-tag>
                <a-tag v-if="status == 'DISABLE'" color="#f50">设备已禁用</a-tag>
            </span></a-table
        >
    </a-card>
</template>

<script>
import { COLUMNS } from "./js/indexColumns";
import { GET } from "@/utils/methods";
export default {
    name: "RegisteredDeviceList",
    data() {
        return {
            columns: COLUMNS,
            data: [],
            searchMacAddress: null,
        };
    },
    mounted() {
        this.getNotShippedDeviceList();
    },
    methods: {
        onSearchByMacAddress() {
            const params = {
                macAddress: this.searchMacAddress,
            };
            POST("/device/search/mac", params).then((res) => {
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
        getNotShippedDeviceList() {
            GET("/device/list/not/shipped").then((res) => {
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
    },
};
</script>

<style lang="less" scoped>
.registered {
    height: 80vh;
}
</style>
