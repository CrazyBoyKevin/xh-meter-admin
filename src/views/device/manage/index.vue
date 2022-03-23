<template>
    <div class="device-manage">
        <DeviceList></DeviceList>
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
        return {};
    },
    mounted() {},
    methods: {},
};
</script>

<style lang="less" scoped></style>
