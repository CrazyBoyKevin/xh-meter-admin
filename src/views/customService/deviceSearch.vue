<template>
    <a-card class="custome-service-search" :bordered="false" title="设备搜索">
        <div slot="extra" class="card-header-right">
            <a-space>
                <a-button @click="reloadList()" icon="reload">重置</a-button>
                <a-input-search
                    href="#"
                    placeholder="MAC地址"
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
        >
            <template slot="avatar" slot-scope="avatar">
                <a-avatar :src="avatar" shape="square" :size="35" />
            </template>
            <template slot="status" slot-scope="status">
                <a-tag v-if="status == 'ONLINE'" color="#87d068">在线</a-tag>
                <a-tag v-else-if="status == 'OFFLINE'" color="#999999">离线</a-tag>
                <a-tag v-else color="#f50">未知</a-tag>
            </template>
            <!-- <span slot="action" slot-scope="text, record"> -->
            <!-- <a-button danger @click="returnFactory(record)">返厂</a-button> -->
            <!-- </span> -->
        </a-table>
    </a-card>
</template>

<script>
import { COLUMNS } from "./deviceColumns";
import { POST } from "@/utils/methods";
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
            },
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
        this.search();
    },
    methods: {
        // handleTableChange(pagination) {
        //     const pager = { ...this.pagination };
        //     pager.current = pagination.current;
        //     pager.pageSize = pagination.pageSize;
        //     this.pagination = pager;
        // },
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
            this.search();
        },
        search() {
            this.loading = true;
            POST("/device/custom/service/search", this.searchDto).then((res) => {
                if (res.code == 200) {
                    this.data = res.data;
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

.card-header-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .checkout-btn {
        margin-left: 10px;
    }
}
</style>
