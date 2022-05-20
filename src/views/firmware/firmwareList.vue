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
                <!-- <span slot="action" slot-scope="text, record">
                <a-button type="primary">查看批次</a-button>
            </span> -->
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
        submitAdd() {},
        handleCancel() {},
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
