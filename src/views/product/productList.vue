<template>
    <a-card class="product-list" :bordered="false" title="产品列表">
        <template>
            <a-modal
                v-model="addModel"
                title="新增产品"
                centered
                okText="添加"
                cancelText="取消"
                @ok="handleSubmit()"
                @cancel="handleCancel()"
            >
                <a-form
                    :form="addForm"
                    @submit="handleSubmit"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                >
                    <a-form-item label="产品名称">
                        <a-input v-model="addForm.productName" type="text"> </a-input>
                    </a-form-item>

                    <a-form-item label="产品型号">
                        <a-input v-model="addForm.type" type="text"> </a-input>
                    </a-form-item>
                </a-form>
            </a-modal>
        </template>
        <template #extra>
            <a-space>
                <a-button type="primary" icon="plus" @click="handleAdd()"
                    >新增产品</a-button
                >
            </a-space>
        </template>
        <a-table
            :columns="columns"
            rowKey="id"
            :data-source="data"
            :loading="loading"
            bordered
            :pagination="pagination"
            @change="handleTableChange"
        >
            <span slot="action" slot-scope="text, record">
                <a-button @click="toProductBatch(record)" type="primary"
                    >查看批次</a-button
                >
            </span>
        </a-table>
    </a-card>
</template>

<script>
import { COLUMNS } from "./js/indexColumns";
import { GET, POST } from "@/utils/methods";
export default {
    name: "ProductList",
    data() {
        return {
            addModel: false,
            addForm: {},
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
        handleSubmit(e) {
            if (
                this.addForm.productName == null ||
                this.addForm.type == null ||
                this.addForm.type == "" ||
                this.addForm.productName == ""
            ) {
                this.$notification["warning"]({
                    message: "警告",
                    description: "请完整填写表单",
                });
            } else {
                POST("/product", this.addForm).then((res) => {
                    if (res.code == 200) {
                        this.$notification["success"]({
                            message: "添加成功",
                        });
                        this.getProductList();
                        this.handleCancel();
                    } else {
                        this.$notification["error"]({
                            message: "添加失败",
                            description: res.msg,
                        });
                    }
                });
            }
        },
        handleCancel() {
            (this.addModel = false), (this.addForm = {});
        },
        handleAdd() {
            this.form = {};
            this.addModel = true;
        },
        toProductBatch(obj) {
            this.$router.push("/batch?productId=" + obj.id);
        },
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
