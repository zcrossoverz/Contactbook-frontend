<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
      <div class="mr-auto navbar-nav">
        <li class="nav-item">
          <router-link to="/contactbook" class="nav-link">
          Danh bạ <i class="fas fa-address-book"></i>
          </router-link>
        </li>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/register" class="nav-link">
                        Đăng ký
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/login" class="nav-link">
                        Đăng nhập
                    </router-link>
                </li>
            </div>

            <div v-if="currentUser" class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/profile" class="nav-link">
                        {{ currentUser.username }}
                    </router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click.prevent="logout"> Đăng xuất </a>
                </li>
            </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  computed: {
        ...mapGetters({
            currentUser: "loggedInUser",
        }),
    },
  data() {
    return {
      
    };
  },
  methods: {
    ...mapMutations([
            "initAuthState" 
        ]),
    logout() {
      this.$store.commit("logout");
      this.$router.push("login");
    }
  },
   mounted() {
        this.initAuthState();
        
    }
};
</script>
