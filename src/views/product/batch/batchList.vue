<template>
    <div>
        <!-- 新增批次弹窗 -->
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
                    <a-form-item label="批次号">
                        <a-input-number
                            style="width: 100%"
                            v-model="form.batchNo"
                            :min="0"
                            placeholder="请填写批次号"
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
        <!-- 修改配额弹窗 -->
        <template>
            <a-modal
                v-model="addQuotaModel"
                title="修改配额"
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
        <!-- 批次列表 -->
        <a-card :bordered="false" title="产品批次">
            <template #extra>
                <a-space>
                    <a-button type="primary" icon="plus" @click="handleAdd()"
                        >新增批次</a-button
                    >
                    <a-select
                        style="width: 160px"
                        @change="handleChangeProduct"
                        placeholder="请选择产品"
                    >
                        <a-select-option
                            v-for="item in productList"
                            :key="item.id"
                            :value="item.id"
                        >
                            {{ item.productName }}
                        </a-select-option>
                    </a-select>
                    <a-input-search
                        placeholder="批次号搜索"
                        enter-button
                        v-model="searchBatchNo"
                        @search="getProductBatchList"
                    />
                    <a-button class="reload-btn" @click="handleReset()" icon="reload"
                        >重置</a-button
                    >
                    <BackButton></BackButton>
                </a-space>
            </template>
            <a-table
                bordered
                :columns="columns"
                rowKey="id"
                :data-source="data"
                :pagination="pagination"
            >
                <span slot="status" slot-scope="text, record">
                    <a-tag
                        v-if="record.status == 1"
                        @click="toDeviceList(record)"
                        color="#87d068"
                        >生产中</a-tag
                    >
                    <a-tag
                        v-if="record.status == 2"
                        @click="toDeviceList(record)"
                        color="#999999"
                        >停产</a-tag
                    >
                </span>
                <span slot="action" slot-scope="text, record">
                    <a-button
                        style="margin-right: 10px"
                        type="primary"
                        v-if="record.status == 1"
                        @click="handleAddQuota(record)"
                        >修改配额
                    </a-button>

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
                        <a-button type="danger" v-if="record.status == 1" href="#"
                            >停产</a-button
                        >
                    </a-popconfirm>
                    <a-popconfirm
                        :title="
                            `确定开始生产产品[` +
                            record.product.productName +
                            `]批次号为[` +
                            record.batchNo +
                            `]？`
                        "
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="startProduceBatchConfirm(record)"
                        @cancel="startProduceBatchCancel()"
                    >
                        <a-button type="primary" v-if="record.status == 2" href="#"
                            >开始生产</a-button
                        >
                    </a-popconfirm>
                </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
import { COLUMNS } from "./columns";
import { GET, POST } from "@/utils/methods";
import BackButton from "@/components/backButton/backButton.vue";
export default {
    name: "BatchList",
    components: {
        BackButton: BackButton,
    },
    props: {
        productId: null,
    },
    data() {
        return {
            columns: COLUMNS,
            data: [],
            productList: [],
            selectedProductId: null,
            searchBatchNo: null,
            addModel: false,
            addQuotaModel: false,
            form: {},
            quotaForm: {},
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
                showTotal: (total) => `总共 ${total} 个批次`,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
            },
        };
    },
    created() {
        this.selectedProductId = this.productId;
        this.getProductBatchList();
        this.getProductList();
    },
    methods: {
        toDeviceList(obj) {
            this.$router.push("/batch/device?batchId=" + obj.id);
        },
        handleReset() {
            this.selectedProductId = null;
            this.searchBatchNo = null;
            this.getProductBatchList();
        },
        handleChangeProduct(id) {
            this.selectedProductId = id;
            this.getProductBatchList();
        },
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
        handleCancel() {
            this.addQuotaModel = false;
            this.addModel = false;
            this.form = {};
            this.quotaForm = {};
        },
        handleTableChange(pagination) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.getProductBatchList();
        },
        getProductBatchList() {
            const params = {
                currentPage: this.pagination.current,
                pageSize: this.pagination.pageSize,
                productId: this.selectedProductId,
                batchNo: this.searchBatchNo,
            };
            GET("/product/batch/list", params).then((res) => {
                if (res.code == 200) {
                    this.data = res.data;
                    this.pagination.total = res.total;
                    this.pagination.current = res.currentPage;
                } else {
                    this.$notification["error"]({
                        message: "ERROR",
                        description: res.msg,
                    });
                }
            });
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
        startProduceBatchConfirm(record) {
            const params = {
                batchNo: record.batchNo,
                productId: record.product.id,
            };
            POST("/product/batch/start", params).then((res) => {
                if (res.code == 200) {
                    this.$notification["success"]({
                        message: "开始生产成功",
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
        startProduceBatchCancel() {
            this.$notification["info"]({
                message: "提示",
                description: "取消生产操作",
            });
        },
    },
};
</script>

<style lang="less" scoped></style>
