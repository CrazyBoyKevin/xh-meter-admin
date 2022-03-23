<template>
    <a-card class="product-list" :bordered="false">
        <a-table
            :columns="columns"
            rowKey="id"
            :data-source="data"
            :loading="loading"
            bordered
            :pagination="pagination"
            @change="handleTableChange"
        >
        </a-table>
    </a-card>
</template>

<script>
import { COLUMNS } from "./js/indexColumns";
import { GET } from "@/utils/methods";
export default {
    name: "ProductList",
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
                showTotal: (total) => `总共 ${total} 个产品`,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
            },
        };
    },
    mounted() {
        this.getProductList();
    },
    methods: {
        handleTableChange(pagination) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.getProductList();
        },
        getProductList() {
            this.loading = true;
            GET("/product/list").then((res) => {
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
    .reload-btn {
        margin-right: 10px;
    }
    .checkout-btn {
        margin-left: 10px;
    }
}
</style>
