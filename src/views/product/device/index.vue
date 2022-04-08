<template>
    <div class="device-manage">
        <DeviceList :batchId="batchId"></DeviceList>
    </div>
</template>

<script>
import DeviceList from "./deviceList";

export default {
    name: "Manage",
    components: {
        DeviceList: DeviceList,
    },
    data() {
        return {
            batchId: null
        };
    },
    created(){
        this.batchId = this.$route.query.batchId;
    },
    mounted() {},
    methods: {},
};
</script>

<style lang="less" scoped></style>
