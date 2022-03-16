<template>
    <div id="userLayout">
        <div class="container">
            <div class="login-bg">
                <img src="../assets/login-bg.png" alt="" />
            </div>
            <div class="login-form">
                <div class="header">
                    <span class="title">XIN HUA Manager</span>
                </div>
                <router-view />
            </div>
        </div>

        <div class="copyright">Copyright &copy; 2022 XinhuaSmart</div>
    </div>
</template>

<script>
export default {
    name: "UserLayout",
};
</script>

<style lang="less" scoped>
#userLayout {
    height: 100%;
    margin: 0 auto;
    background-image: url("../assets/background.svg");
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .container {
        width: 750px;
        margin-top: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-bg {
            width: 45%;
            img {
                width: 100%;
            }
        }
        .login-form {
            width: 60%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            .header {
                margin: 20% 0 10% 0;
                height: 44px;
                line-height: 44px;
                .title {
                    font-size: 26px;
                    color: rgba(0, 0, 0, 0.35);
                    font-weight: 600;
                }
            }
            .main {
                min-width: 260px;
                width: 368px;
                margin: 0 auto;
            }
        }
    }

    // .container {
    //     margin-top: 10%;
    //     width: 550px;
    //     height: 380px;
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     justify-content: flex-start;
    //     box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    //     .header {
    //         margin: 10% 0 5% 0;
    //         height: 44px;
    //         line-height: 44px;
    //         .title {
    //             font-size: 26px;
    //             color: rgba(0, 0, 0, 0.85);
    //             font-weight: 600;
    //         }
    //     }
    //     .main {
    //         min-width: 260px;
    //         width: 368px;
    //         margin: 0 auto;
    //     }
    // }
    .copyright {
        width: 100%;
        text-align: center;
        position: absolute;
        right: 0;
        left: 0;
        bottom: 20px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
    }
}
</style>
