<template>
    <div class="device-quota">
        <RepeatDeviceList class="repeat-device-list"></RepeatDeviceList>
        <!-- <RegisteredDeviceList class="registered-device-list"></RegisteredDeviceList> -->
    </div>
</template>

<script>
import RepeatDeviceList from "./repeatDeviceList";
// import RegisteredDeviceList from "./registeredDeviceList";

export default {
    name: "Quota",
    components: {
        RepeatDeviceList: RepeatDeviceList,
        // RegisteredDeviceList: RegisteredDeviceList,
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {},
};
</script>

<style lang="less" scoped>
.repeat-device-list {
    margin-bottom: 15px;
}
</style>
