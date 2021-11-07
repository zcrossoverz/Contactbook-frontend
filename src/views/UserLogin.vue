<template>
    <div class="edit-form">
        <h4>Đăng nhập</h4>
        <AuthForm
        :user="user"
        :isLogin="true"
        @user-submit="userLogin"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import AuthForm from "../components/AuthForm.vue";
import { mapGetters } from "vuex";

export default {
    name: "UserLogin",
    components: {
        AuthForm
    },
    data() {
        return {
            message: "",
            user: {
               
            },
            loading: false,
        }
    },
    computed: {
        ...mapGetters([
            "userLoggedIn"
        ]),
    },
    methods: {
        async userLogin(user){
            this.loading = true;

            const [error] = await this.handle(
                this.$store.dispatch("login", user)
            );
            if (error) {
                console.log(error);
                this.loading = false;
                this.message = "Đăng nhập thất bại";
            } else {
                this.$router.push("/profile");
            }
        }
    },
    mounted() {
        this.message = "";
    }
};
</script>
