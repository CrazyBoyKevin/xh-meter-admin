<template>
    <div class="main">
        <a-form
            id="formLogin"
            class="user-layout-login"
            ref="formLogin"
            :form="form"
            @submit="handleSubmit"
        >
            <a-form-item>
                <a-input
                    size="large"
                    type="text"
                    placeholder="用户名"
                    v-decorator="[
                        'username',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写用户名',
                                },
                            ],
                            validateTrigger: 'blur',
                        },
                    ]"
                >
                    <a-icon
                        slot="prefix"
                        type="user"
                        :style="{ color: 'rgba(0,0,0,.25)' }"
                    />
                </a-input>
            </a-form-item>

            <a-form-item>
                <a-input-password
                    size="large"
                    placeholder="请输入密码"
                    v-decorator="[
                        'password',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写密码',
                                },
                            ],
                            validateTrigger: 'blur',
                        },
                    ]"
                >
                    <a-icon
                        slot="prefix"
                        type="lock"
                        :style="{ color: 'rgba(0,0,0,.25)' }"
                    />
                </a-input-password>
            </a-form-item>

            <a-form-item style="margin-top: 24px">
                <a-button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    class="login-button"
                    :loading="state.loginBtn"
                    :disabled="state.loginBtn"
                    >登 录</a-button
                >
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import md5 from "md5";
import { mapActions } from "vuex";
import { timeFix } from "@/utils/util";

export default {
    data() {
        return {
            loginBtn: false,
            loginType: 0,
            isLoginError: false,
            form: this.$form.createForm(this),
            state: {
                time: 60,
                loginBtn: false,
                loginType: 0,
                smsSendBtn: false,
            },
        };
    },
    created() {},
    methods: {
        ...mapActions(["Login", "Logout"]),
        handleSubmit(e) {
            e.preventDefault();
            const {
                form: { validateFields },
                state,
                Login,
            } = this;

            state.loginBtn = true;
            const validateFieldsKey = ["username", "password"];
            validateFields(validateFieldsKey, { force: true }, (err, values) => {
                if (!err) {
                    const loginParams = { ...values };
                    delete loginParams.username;
                    loginParams.username = values.username;
                    loginParams.password = values.password;
                    // loginParams.password = md5(values.password);
                    Login(loginParams)
                        .then((res) => {
                            if (res.code == 200) {
                                this.loginSuccess(res);
                            } else {
                                this.requestFailed(res);
                            }
                        })
                        .catch((err) => {
                            this.requestFailed(err);
                        })
                        .finally(() => {
                            state.loginBtn = false;
                        });
                } else {
                    setTimeout(() => {
                        state.loginBtn = false;
                    }, 600);
                }
            });
        },
        loginSuccess(res) {
            this.$router.push("/device/register");
            setTimeout(() => {
                this.$notification.success({
                    message: "欢迎",
                    description: `${timeFix()}，欢迎回来`,
                });
            }, 1000);
            this.isLoginError = false;
        },
        requestFailed(err) {
            this.isLoginError = true;
            this.$notification["error"]({
                message: "错误",
                description: err.msg,
                duration: 3,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.user-layout-login {
    label {
        font-size: 14px;
    }
    button.login-button {
        padding: 0 15px;
        font-size: 16px;
        height: 40px;
        width: 100%;
    }
    .user-login-other {
        text-align: left;
        margin-top: 24px;
        line-height: 22px;
        .item-icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: #1890ff;
            }
        }
    }
}
</style>
