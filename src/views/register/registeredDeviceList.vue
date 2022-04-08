<template>
    <a-card class="registered" :bordered="false" title="注册成功设备">
        <div slot="extra" class="card-header-right">
            <a-button class="reload-btn" @click="reloadRegisteredList()" icon="reload"
                >重置</a-button
            >
            <a-input-search
                href="#"
                placeholder="通过MAC地址查询"
                enter-button
                v-model="searchMacAddress"
                @search="onSearchByMacAddress()"
            />
            <a-button
                type="primary"
                class="checkout-btn"
                @click="deviceFactory()"
                icon="export"
                >出厂</a-button
            >
        </div>

        <a-table
            bordered
            :columns="columns"
            rowKey="id"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
            }"
        >
            <!-- <span slot="status" slot-scope="status"> -->
                <!-- ONLINE：设备在线,OFFLINE：设备离线,UNACTIVE：设备未激活,DISABLE：设备已禁用 -->
                <!-- <a-tag v-if="status == 'ONLINE'" color="#87d068">在线</a-tag>
                <a-tag v-if="status == 'OFFLINE'" color="#999999">离线</a-tag>
                <a-tag v-if="status == 'UNACTIVE'" color="#FFA500">未激活</a-tag>
                <a-tag v-if="status == 'DISABLE'" color="#f50">设备已禁用</a-tag>
            </span> -->
        </a-table>
    </a-card>
</template>

<script>
import { COLUMNS } from "./js/indexColumns";
import { GET, POST } from "@/utils/methods";
export default {
    name: "RegisteredDeviceList",
    data() {
        return {
            columns: COLUMNS,
            data: [],
            searchMacAddress: null,
            loading: false,
            pagination: {
                pageSize: 10,
                current: 1,
            },
            timer: null,
            isTimer: true,
            selectedRowKeys: [],
        };
    },
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
    },
    mounted() {
        this.getNotShippedDeviceList();
        this.timer = setInterval(() => {
            if (this.isTimer) {
                setTimeout(this.getNotShippedDeviceList(), 1000);
            }
        }, 5000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
    methods: {
        deviceFactory() {
            const params = {
                deviceIds: this.selectedRowKeys,
            };
            POST("/device/factory", params).then((res) => {
                if (res.code == 200) {
                    this.getNotShippedDeviceList();
                    this.$notification["success"]({
                        message: "出厂成功",
                    });
                } else {
                    this.$notification["error"]({
                        message: "错误",
                        description: res.msg,
                    });
                }
            });
        },
        onSelectChange(selectedRowKeys) {
            console.log("selectedRowKeys changed: ", selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
        },
        reloadRegisteredList() {
            this.searchMacAddress = null;
            this.getNotShippedDeviceList();
            this.isTimer = true;
        },
        handleTableChange(pagination) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.getNotShippedDeviceList();
        },
        getNotShippedDeviceList() {
            this.loading = true;
            const params = {
                currentPage: this.pagination.current,
                pageSize: this.pagination.pageSize,
            };
            GET("/device/list/not/shipped", params).then((res) => {
                if (res.code == 200) {
                    this.data = res.data;
                    this.pagination.total = res.total;
                    this.pagination.current = res.currentPage;
                } else {
                    this.$notification["error"]({
                        message: "错误",
                        description: res.msg,
                    });
                }
                this.loading = false;
            });
        },
        onSearchByMacAddress() {
            this.isTimer = false;
            const params = {
                macAddress: this.searchMacAddress,
            };
            POST("/device/search/mac", params).then((res) => {
                if (res.code == 200) {
                    this.data = [];
                    this.data.push(res.data);
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

.card-header-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .reload-btn {
        margin-right: 10px;
    }
    .checkout-btn {
        margin-left: 10px;
    }
}
</style>
