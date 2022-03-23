<template>
    <a-card class="registered" :bordered="false">
        <div slot="extra" class="card-header-right">
            <a-button class="reload-btn" @click="reloadList()" icon="reload"
                >重置</a-button
            >
            <a-input-search
                href="#"
                placeholder="MAC地址查询（无:）"
                enter-button
                v-model="searchMacAddress"
                @search="onSearchByMacAddress()"
            />
        </div>

        <a-table
            :columns="columns"
            rowKey="id"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >
            <span slot="status" slot-scope="status">
                <!-- ONLINE：设备在线,OFFLINE：设备离线,UNACTIVE：设备未激活,DISABLE：设备已禁用 -->
                <a-tag v-if="status == 'ONLINE'" color="#87d068">在线</a-tag>
                <a-tag v-if="status == 'OFFLINE'" color="#999999">离线</a-tag>
                <a-tag v-if="status == 'UNACTIVE'" color="#FFA500">未激活</a-tag>
                <a-tag v-if="status == 'DISABLE'" color="#f50">设备已禁用</a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button
                    size="small"
                    type="warning"
                    style="font-size: 10px"
                    @click="returnFactory(record)"
                    >返厂</a-button
                >
            </span>
        </a-table>
    </a-card>
</template>

<script>
import { COLUMNS } from "./js/indexColumns";
import { GET, POST } from "@/utils/methods";
export default {
    name: "DeviceList",
    data() {
        return {
            columns: COLUMNS,
            data: [],
            searchMacAddress: null,
            loading: false,
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                showTotal: (total) => `总共 ${total} 个设备`,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
            },
        };
    },
    mounted() {
        this.getShippedDeviceList();
    },
    methods: {
        handleTableChange(pagination) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.getShippedDeviceList();
        },
        returnFactory(record) {
            const params = {
                id: record.id,
            };
            POST("/device/factory/return", params).then((res) => {
                if (res.code == 200) {
                    this.getShippedDeviceList();
                    this.$notification["success"]({
                        message: "返厂成功",
                    });
                } else {
                    this.$notification["error"]({
                        message: "错误",
                        description: res.msg,
                    });
                }
            });
        },
        reloadList() {
            this.searchMacAddress = null;
            this.getShippedDeviceList();
        },
        handleTableChange(pagination) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.getShippedDeviceList();
        },
        getShippedDeviceList() {
            this.loading = true;
            const params = {
                currentPage: this.pagination.current,
                pageSize: this.pagination.pageSize,
            };
            GET("/device/list/shipped", params).then((res) => {
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
