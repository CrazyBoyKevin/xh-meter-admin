<template>
    <a-card class="custome-service-search" :bordered="false" title="">
        <div slot="extra" class="card-header-right">
            <a-space>
                <div class="count-line">
                    <div class="count-box">
                        <a-tag color="#87d068">在线：{{ onlineCount }}</a-tag>
                    </div>
                    <div class="count-box">
                        <a-tag color="#999999">离线：{{ offlineCount }}</a-tag>
                    </div>
                    <div class="count-box">
                        <a-tag color="#2db7f5"
                            >已绑定：{{ onlineCount + offlineCount }}</a-tag
                        >
                    </div>
                </div>
                <a-button @click="reloadList()" icon="reload"></a-button>
                <a-select
                    style="width: 150px"
                    placeholder="状态"
                    @change="search()"
                    v-model="searchDto.status"
                >
                    <a-select-option
                        v-for="s in statusList"
                        :key="s.status"
                        :value="s.status"
                    >
                        {{ s.desc }}
                    </a-select-option>
                </a-select>
                <a-input-search
                    style="width: 150px"
                    href="#"
                    placeholder="ID"
                    enter-button
                    v-model="searchDto.id"
                    @search="search()"
                />
                <a-input-search
                    href="#"
                    placeholder="备注名"
                    enter-button
                    v-model="searchDto.alias"
                    @search="search()"
                />
                <a-input-search
                    style="width: 150px"
                    href="#"
                    placeholder="版本号(x.x)"
                    enter-button
                    v-model="searchDto.version"
                    @search="search()"
                />
                <a-input-search
                    href="#"
                    placeholder="MAC地址(无:)"
                    enter-button
                    v-model="searchDto.mac"
                    @search="search()"
                />
                <a-input-search
                    href="#"
                    placeholder="USERNAME"
                    enter-button
                    v-model="searchDto.username"
                    @search="search()"
                />
                <a-input-search
                    href="#"
                    placeholder="微信昵称"
                    enter-button
                    v-model="searchDto.nickname"
                    @search="search()"
                />
                <BackButton></BackButton>
            </a-space>
        </div>

        <a-table
            :columns="columns"
            rowKey="id"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            :scroll="{ x: 1500 }"
            @change="handleTableChange"
        >
            <template slot="version" slot-scope="text, record">
                <span>{{ record.mfirmwareVersion + "." + record.sfirmwareVersion }}</span>
            </template>
            <template slot="avatar" slot-scope="avatar">
                <a-avatar :src="avatar" shape="square" :size="35" />
            </template>
            <template slot="status" slot-scope="status">
                <a-tag v-if="status == 'ONLINE'" color="#87d068">在线</a-tag>
                <a-tag v-else-if="status == 'OFFLINE'" color="#999999">离线</a-tag>
                <a-tag v-else color="#f50">未知</a-tag>
            </template>
        </a-table>
    </a-card>
</template>

<script>
import { COLUMNS } from "./deviceColumns";
import { GET, POST } from "@/utils/methods";
import BackButton from "@/components/backButton/backButton.vue";
export default {
    name: "devicesearch",
    components: {
        BackButton: BackButton,
    },
    props: {
        batchId: null,
    },
    data() {
        return {
            columns: COLUMNS,
            data: [],
            searchDto: {
                nickname: null,
                mac: null,
                username: null,
                status: "ONLINE",
                id: null,
                alias: null,
                pageSize: 20,
                current: 1,
            },
            statusList: [
                { status: "OFFLINE", desc: "离线" },
                { status: "ONLINE", desc: "在线" },
            ],
            loading: false,
            pagination: {
                pageSize: 20,
                current: 1,
                total: 0,
                showTotal: (total) => `总共 ${total} 个设备`,
                showSizeChanger: true,
                pageSizeOptions: ["20", "50", "100"],
                onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
            },
            onlineCount: 0,
            offlineCount: 0,
        };
    },
    mounted() {
        this.search();
        this.getDeviceStatisticalData();
    },
    methods: {
        getDeviceStatisticalData() {
            GET("/device/custom/service/statistical/data").then((res) => {
                if (res.code == 200) {
                    this.onlineCount = res.data.onlineCount;
                    this.offlineCount = res.data.offlineCount;
                } else {
                    this.$notification["error"]({
                        message: "错误",
                        description: res.msg,
                    });
                }
            });
        },
        handleTableChange(pagination) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            pager.pageSize = pagination.pageSize;
            this.pagination = pager;
            this.searchDto.current = this.pagination.current;
            this.searchDto.pageSize = this.pagination.pageSize;
            this.search();
        },
        // returnFactory(record) {
        //     const params = {
        //         id: record.id,
        //     };
        //     POST("/device/factory/return", params).then((res) => {
        //         if (res.code == 200) {
        //             this.getDeviceListByBatchId();
        //             this.$notification["success"]({
        //                 message: "返厂成功",
        //             });
        //         } else {
        //             this.$notification["error"]({
        //                 message: "错误",
        //                 description: res.msg,
        //             });
        //         }
        //     });
        // },
        reloadList() {
            this.searchDto = {
                nickname: null,
                mac: null,
                username: null,
            };
            this.pageSize = 20;
            this.current = 1;
            this.search();
        },
        search() {
            this.loading = true;
            this.searchDto.current = this.pagination.current;
            this.searchDto.pageSize = this.pagination.pageSize;
            POST("/device/custom/service/search", this.searchDto).then((res) => {
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
    },
};
</script>

<style lang="less" scoped>
/deep/ .ant-table-tbody > tr > td {
    padding: 10px;
}

.count-line {
    width: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.card-header-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .checkout-btn {
        margin-left: 10px;
    }
}
</style>
