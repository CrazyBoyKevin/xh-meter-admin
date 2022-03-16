<template>
    <pro-layout
        :menus="menus"
        :collapsed="collapsed"
        :mediaQuery="query"
        :handleMediaQuery="handleMediaQuery"
        :handleCollapse="handleCollapse"
        v-bind="settings"
    >
        <template v-slot:menuHeaderRender>
            <div class="logo-title">
                <logo-svg />
                <div class="title">{{ title }}</div>
            </div>
        </template>
        <template v-slot:headerContentRender>
            <div>
                <a-tooltip title="返回">
                    <a-icon
                        style="font-size: 18px; cursor: pointer"
                        type="rollback"
                        @click="goBack()"
                    />
                </a-tooltip>
            </div>
        </template>

        <template v-slot:rightContentRender>
            <right-content
                :top-menu="settings.layout === 'topmenu'"
                :theme="settings.theme"
            />
        </template>
        <router-view />
    </pro-layout>
</template>

<script>
import { updateTheme } from "@ant-design-vue/pro-layout";
import { mapState } from "vuex";
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE } from "@/store/mutation-types";

import defaultSettings from "@/config/defaultSettings";
import RightContent from "@/components/GlobalHeader/RightContent";
import Ads from "@/components/Other/CarbonAds";
import LogoSvg from "../assets/logo.svg?inline";

export default {
    name: "BasicLayout",
    components: {
        RightContent,
        LogoSvg,
        Ads,
    },
    data() {
        return {
            // preview.pro.antdv.com only use.
            isProPreviewSite:
                process.env.VUE_APP_PREVIEW === "true" && process.env.NODE_ENV !== "dev",
            isDev:
                process.env.NODE_ENV === "dev" || process.env.VUE_APP_PREVIEW === "true",
            // base
            menus: [],
            collapsed: false,
            title: defaultSettings.title,
            settings: {
                // 布局类型
                layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
                // CONTENT_WIDTH_TYPE
                contentWidth:
                    defaultSettings.layout === "sidemenu"
                        ? CONTENT_WIDTH_TYPE.Fluid
                        : defaultSettings.contentWidth,
                // 主题 'dark' | 'light'
                theme: defaultSettings.navTheme,
                // 主色调
                primaryColor: defaultSettings.primaryColor,
                fixedHeader: defaultSettings.fixedHeader,
                fixSiderbar: defaultSettings.fixSiderbar,
                colorWeak: defaultSettings.colorWeak,
                hideHintAlert: false,
                hideCopyButton: false,
            },
            query: {},
        };
    },
    computed: {
        ...mapState({
            // 动态主路由
            mainMenu: (state) => state.permission.addRouters,
        }),
    },
    created() {
        const routes = this.mainMenu.find((item) => item.path === "/");
        this.menus = (routes && routes.children) || [];
        // 处理侧栏收起状态
        this.$watch("collapsed", () => {
            this.$store.commit(SIDEBAR_TYPE, this.collapsed);
        });
    },
    mounted() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf("Edge") > -1) {
            this.$nextTick(() => {
                this.collapsed = !this.collapsed;
                setTimeout(() => {
                    this.collapsed = !this.collapsed;
                }, 16);
            });
        }
        if (process.env.NODE_ENV !== "pro" || process.env.VUE_APP_PREVIEW === "true") {
            updateTheme(this.settings.primaryColor);
        }
    },
    methods: {
        goBack() {
            this.$router.back(-1);
        },
        handleMediaQuery(val) {
            this.query = val;
            if (this.isMobile && !val["screen-xs"]) {
                this.isMobile = false;
                return;
            }
            if (!this.isMobile && val["screen-xs"]) {
                this.isMobile = true;
                this.collapsed = false;
                this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid;
                // this.settings.fixSiderbar = false
            }
        },
        handleCollapse(val) {
            this.collapsed = val;
        },
        handleSettingChange({ type, value }) {
            console.log("type", type, value);
            type && (this.settings[type] = value);
            switch (type) {
                case "contentWidth":
                    this.settings[type] = value;
                    break;
                case "layout":
                    if (value === "sidemenu") {
                        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid;
                    } else {
                        this.settings.fixSiderbar = false;
                        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed;
                    }
                    break;
            }
        },
    },
};
</script>

<style lang="less">
@import "./BasicLayout.less";

.logo-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    .title {
        margin-left: 15px;
        letter-spacing: 1px;
        font-size: 18px;
        font-weight: 600;
        font-family: "title-03W04";
        color: #555;
    }
}
</style>
