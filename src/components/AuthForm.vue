<template>
    <Form
    :validation-schema="schema"
    >
        <div class="form-group">
            <label for="username">Tên đăng nhập</label>
            <Field
            name="username"
            type="text"
            class="form-control"
            v-model="userData.username"
            />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group" v-if="!isLogin">
            <label for="email">E-mail</label>
            <Field
            name="email_user"
            type="text"
            class="form-control"
            v-model="userData.email"
            />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field
            name="password"
            type="current-password"
            class="form-control"
            v-model="userData.password"
            />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <button v-if="isLogin" class="btn btn-primary" @click="$emit('user-submit', userData)">Đăng nhập</button>
            <button v-else class="btn btn-primary" @click="$emit('user-submit', userData)">Đăng kí</button>
        </div>
    </Form>
</template>
<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
    name: "ContactForm",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["user-login"],
    props: ["user","isLogin"],
    data() {
        const schema = yup.object().shape({
        username: yup
            .string()
            .required("Tên đăng nhập không được bỏ trống.")
            .min(3, "Tên đăng nhập phải ít nhất 3 kí tự.")
            .max(12, "Tên đăng nhập có nhiều nhất 12 kí tự."),
        email: yup
            .string()
            .required("Email không được bỏ trống.")
            .email("E-mail không đúng.")
            .max(50, "E-mail tối đa 50 ký tự."),
        password: yup.string()
                    .required("Mật khẩu không được bỏ trống.")
                    .min(3, "Mật khẩu tối thiểu 3 kí tự."),
        });
        return {
            schema,
            userData: this.user
        };
    },
    };
</script>
<style>
@import "../assets/styles/main.css";
</style>