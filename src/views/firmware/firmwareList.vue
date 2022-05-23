<template>
    <div>
        <!-- 新增批次弹窗 -->
        <template>
            <a-modal
                v-model="addModel"
                title="新增固件"
                centered
                okText="提交"
                cancelText="取消"
                :maskClosable="false"
                @ok="submitAdd()"
                @cancel="handleCancel()"
            >
                <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-form-item label="产品型号">
                        <a-input
                            style="width: 100%"
                            v-model="form.deviceType"
                            :min="0"
                            placeholder="产品型号"
                        />
                    </a-form-item>
                    <a-form-item label="主版本号">
                        <a-input-number
                            style="width: 100%"
                            v-model="form.mFirmwareVersion"
                            :min="0"
                            placeholder="主版本号"
                        />
                    </a-form-item>
                    <a-form-item label="子版本号">
                        <a-input-number
                            style="width: 100%"
                            v-model="form.sFirmwareVersion"
                            :min="0"
                            placeholder="子版本号"
                        />
                    </a-form-item>
                    <a-form-item label="固件文件">
                        <a-upload
                            :file-list="fileList"
                            :remove="handleRemove"
                            :customRequest="handleUpload"
                            :before-upload="beforeUpload"
                        >
                            <a-button> <a-icon type="upload" /> 选择固件上传 </a-button>
                        </a-upload>
                    </a-form-item>
                    <a-form-item label="版本描述">
                        <a-textarea
                            v-model="form.desc"
                            placeholder="请填写版本描述"
                            :rows="2"
                        />
                    </a-form-item>
                </a-form>
            </a-modal>
        </template>
        <a-card class="firmware-list" :bordered="false" title="固件列表">
            <template #extra>
                <a-space>
                    <a-input-search
                        placeholder="根据型号精确搜索"
                        enter-button
                        @search="onSearchByDevice"
                    />
                    <a-button type="primary" @click="handleAdd()" icon="plus"
                        >新增固件</a-button
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
                <span slot="status" slot-scope="text, record">
                    <a-tag v-if="record.status == 1" color="#87d068">最新版本</a-tag>
                    <a-tag v-if="record.status == 2" color="#999999">历史版本</a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a-popconfirm
                        title="该固件（最新版本）删除后，上一个版本固件将作为最新固件（此操作无法撤回）"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="handleDelete(record.id)"
                    >
                        <a-button type="danger" size="small" href="#">删除</a-button>
                    </a-popconfirm>
                </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
import { GET, POST } from "@/utils/methods";
import { COLUMNS } from "./columns";
export default {
    name: "FirmwareList",
    data() {
        return {
            fileList: [],
            uploading: false,
            addModel: false,
            form: {},
            columns: COLUMNS,
            loading: false,
            data: [],
            deviceType: null,
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                showTotal: (total) => `总共 ${total} 个固件`,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
            },
        };
    },
    mounted() {
        this.getFirmwareList();
    },
    methods: {
        handleDelete(id) {
            POST("/device/firmware/delete/" + id).then((res) => {
                if (res.code == 200) {
                    this.getFirmwareList();
                    this.$notification["success"]({
                        message: "删除成功",
                    });
                } else {
                    this.$notification["error"]({
                        message: "错误",
                        description: res.msg,
                    });
                }
            });
        },
        handleRemove(file) {
            const index = this.fileList.indexOf(file);
            const newFileList = this.fileList.slice();
            newFileList.splice(index, 1);
            this.fileList = newFileList;
        },
        beforeUpload(file) {
            this.fileList = [];
            this.fileList = [...this.fileList, file];
        },
        handleUpload() {
            const { fileList } = this;
            const formData = new FormData();
            formData.append("file", fileList[0]);
            this.uploading = true;
            POST("/file/upload", formData).then((res) => {
                if (res.code == 200) {
                    this.form.downloadLink = res.data;
                } else {
                    this.$notification["error"]({
                        message: "错误",
                        description: res.msg,
                    });
                }
                this.uploading = false;
            });
        },
        handleAdd() {
            this.addModel = true;
            this.form = {};
        },
        submitAdd() {
            const { form } = this;
            const data = {
                mfirmwareVersion: form.mFirmwareVersion,
                sfirmwareVersion: form.sFirmwareVersion,
                downloadLink: form.downloadLink,
                deviceType: form.deviceType,
                description: form.desc,
            };
            console.log(data);
            POST("/device/firmware/add", data).then((res) => {
                if (res.code == 200) {
                    this.handleCancel();
                    this.getFirmwareList();
                } else {
                    this.$notification["error"]({
                        message: "错误",
                        description: res.msg,
                    });
                }
            });
        },
        handleCancel() {
            this.addModel = false;
            this.form = {};
            this.fileList = [];
        },
        onSearchByDevice(deviceType) {
            this.deviceType = deviceType;
            this.getFirmwareList();
        },
        handleTableChange(pagination) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.getFirmwareList();
        },
        getFirmwareList() {
            this.loading = true;
            const params = {
                currentPage: this.pagination.current,
                pageSize: this.pagination.pageSize,
                deviceType: this.deviceType,
            };
            GET("/device/firmware/list", params).then((res) => {
                if (res.code == 200) {
                    this.loading = false;
                    this.data = res.data;
                    this.pagination.total = res.total;
                    this.pagination.current = res.currentPage;
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
