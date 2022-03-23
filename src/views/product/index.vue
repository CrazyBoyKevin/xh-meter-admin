<template>
    <div class="product">
        <ProductList></ProductList>
    </div>
</template>

<script>
import ProductList from "./productList";

export default {
    name: "Product",
    components: {
        ProductList: ProductList,
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {},
};
</script>

<style lang="less" scoped></style>
