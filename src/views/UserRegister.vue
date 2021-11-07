<template>
    <div class="edit-form">
        <h4>Đăng kí tài khoản</h4>
        <AuthForm
        :isLogin="false"
        @user-submit="handleRegister"
        :user="user"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import AuthForm from "../components/AuthForm.vue";
import { mapGetters } from "vuex";

export default {
    name: "UserRegister",
    components: {
        AuthForm
    },
    data() {
        return {
            successful: false,
            loading: false,
            message: "",
            user: {

            }
        };
    },
    computed: {
        ...mapGetters([
            "userLoggedIn"
        ]),
    },
    methods: {
        async handleRegister(user) {
            this.message = "";
            this.successful = false;
            this.loading = true;


            const [error, data] = await this.handle(
                this.$store.dispatch("register", user)
            );
            if (error) {
                console.log(error);
                this.message = "Đăng ký thất bại";
                this.successful = false;
                this.loading = false;
            } else {
                this.message = data.message;
                this.successful = true;
                this.loading = false;
            }
        },
    },
    mounted(){
        this.message = "";
    }
};
</script>
