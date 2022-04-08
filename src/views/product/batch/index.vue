<template>
    <div>
        <BatchList :productId="productId"></BatchList>
    </div>
</template>

<script>
import BatchList from "./batchList.vue";
export default {
    name: "Batch",
    components: {
        BatchList: BatchList,
    },
    data() {
        return {
            productId: null,
        };
    },
    created() {
        this.productId = this.$route.query.productId;
    },
    methods: {},
};
</script>

<style lang="less" scoped></style>
