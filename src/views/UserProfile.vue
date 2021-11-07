<template>
    <div>
        <h4>Thông tin người dùng <i class="fas fa-user-tie"></i></h4>
        <div class="row">
            <div class="mb-2 col-12"><strong>ID <i class="fas fa-id-card"></i>: </strong> {{ currentUser.id }}</div>
            <div class="mb-2 col-12"><strong>Tên đăng nhập <i class="fas fa-user"></i>: </strong> {{ currentUser.username }}</div>
            <div class="mb-2 col-12">
                <strong>E-mail <i class="fas fa-at"></i>: </strong> {{ currentUser.email }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Profile",
    computed: {
        ...mapGetters({
            currentUser: "loggedInUser",
        }),
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push("/login");
        }else{
            console.log(this.currentUser);
        }
    },
};
</script>