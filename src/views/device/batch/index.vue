<template>
    <div>
        <template>
            <a-modal
                v-model="addModel"
                title="新增批次"
                centered
                okText="提交"
                cancelText="取消"
                :maskClosable="false"
                @ok="handleSubmit()"
                @cancel="handleCancel()"
            >
                <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-form-item label="配额">
                        <a-input-number
                            style="width: 100%"
                            v-model="form.quota"
                            :min="0"
                            placeholder="批次配额"
                        />
                    </a-form-item>
                    <a-form-item label="产品">
                        <a-select
                            v-model="form.productId"
                            placeholder="选择生产对应的产品"
                        >
                            <a-select-option
                                v-for="product in productList"
                                :key="product.id"
                                :value="product.id"
                            >
                                {{ product.productName }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-form>
            </a-modal>
        </template>

        <template>
            <a-modal
                v-model="addQuotaModel"
                title="添加配额"
                centered
                okText="提交"
                cancelText="取消"
                :maskClosable="false"
                @ok="handleSubmitAddQuota()"
                @cancel="handleCancel()"
            >
                <a-form
                    :form="quotaForm"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                >
                    <a-form-item label="批次号">
                        <a-input
                            style="width: 100%"
                            v-model="quotaForm.batchNo"
                            disabled
                        />
                    </a-form-item>
                    <a-form-item label="剩余配额">
                        <a-input-number
                            style="width: 100%"
                            v-model="quotaForm.quota"
                            :min="0"
                        />
                    </a-form-item>
                    <a-form-item label="产品">
                        <a-input
                            disabled
                            style="width: 100%"
                            :defaultValue="quotaForm.productName"
                        />
                    </a-form-item>
                </a-form>
            </a-modal>
        </template>

        <a-card :bordered="false">
            <a-space style="margin-bottom: 10px">
                <a-button type="primary" icon="plus" @click="handleAdd()"
                    >新增批次</a-button
                >
            </a-space>

            <a-table :columns="columns" rowKey="id" :data-source="data">
                <span slot="status" slot-scope="status">
                    <a-tag v-if="status == 1" color="#87d068">生产中</a-tag>
                    <a-tag v-if="status == 2" color="#999999">停产</a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a-popconfirm
                        :title="
                            `确定将产品[` +
                            record.product.productName +
                            `]批次号为[` +
                            record.batchNo +
                            `]停产？`
                        "
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="stopProduceBatchConfirm(record)"
                        @cancel="stopProduceBatchCancel()"
                    >
                        <a v-if="record.status == 1" href="#">停产</a>
                    </a-popconfirm>

                    <a-divider type="vertical" />
                    <a v-if="record.status == 1" @click="handleAddQuota(record)"
                        >修改配额
                    </a>
                </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
import { COLUMNS } from "./columns";
import { GET, POST } from "@/utils/methods";
export default {
    name: "Batch",
    data() {
        return {
            columns: COLUMNS,
            data: [],
            productList: [],
            addModel: false,
            addQuotaModel: false,
            form: {},
            quotaForm: {},
        };
    },
    mounted() {
        this.getProductBatchList();
    },
    methods: {
        handleSubmitAddQuota() {
            const params = {
                quota: this.quotaForm.quota,
                batchNo: this.quotaForm.batchNo,
            };
            POST("/product/batch/quota/update", params).then((res) => {
                if (res.code == 200) {
                    this.$notification["success"]({
                        message: "修改成功",
                    });
                    this.getProductBatchList();
                    this.handleCancel();
                } else {
                    this.$notification["error"]({
                        message: res.msg,
                    });
                }
            });
        },
        handleAddQuota(record) {
            this.quotaForm = {
                quota: record.quota,
                productName: record.product.productName,
                batchNo: record.batchNo,
            };
            this.addQuotaModel = true;
        },
        stopProduceBatchConfirm(record) {
            const params = {
                batchNo: record.batchNo,
            };
            POST("/product/batch/stop", params).then((res) => {
                if (res.code == 200) {
                    this.$notification["success"]({
                        message: "停产成功",
                    });
                } else {
                    this.$notification["error"]({
                        message: "错误",
                        description: res.msg,
                    });
                }
                this.getProductBatchList();
            });
        },
        stopProduceBatchCancel() {
            this.$notification["info"]({
                message: "提示",
                description: "取消停产操作",
            });
        },
        handleSubmit() {
            if (this.form.quota == null || this.form.productId == null) {
                this.$notification["warning"]({
                    message: "警告",
                    description: "请完整填写表单",
                });
            } else {
                POST("/product/batch", this.form).then((res) => {
                    if (res.code == 200) {
                        this.$notification["success"]({
                            message: "添加成功",
                        });
                        this.getProductBatchList();
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
        handleAdd() {
            this.addModel = true;
            this.getProductList();
        },
        getProductList() {
            GET("/product/list").then((res) => {
                if (res.code == 200) {
                    this.productList = res.data;
                } else {
                    this.$notification["error"]({
                        message: "ERROR",
                        description: res.msg,
                    });
                }
            });
        },
        handleDelete(record) {
            console.log(record);
        },
        getProductBatchList() {
            GET("/product/batch/list?productId=1").then((res) => {
                if (res.code == 200) {
                    this.data = res.data;
                } else {
                    this.$notification["error"]({
                        message: "ERROR",
                        description: res.msg,
                    });
                }
            });
        },
        handleCancel() {
            this.addQuotaModel = false;
            this.addModel = false;
            this.form = {};
            this.quotaForm = {};
        },
    },
};
</script>

<style lang="less" scoped></style>
