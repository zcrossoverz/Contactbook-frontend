<template>
    <div class="list row">
        <div class="col-md-10">
            <div class="mb-3 input-group">
                <input
                type="text"
                class="form-control"
                placeholder="Tìm theo tên"
                v-model="nameToSearch"
                />
                <div class="input-group-append">
                    <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="searchName"
                    >
                    Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Danh bạ <i class="fas fa-address-book"></i></h4>
            <ul class="list-group">
                <li
                class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(contact, index) in contacts"
                :key="contact.id"
                @click="setActiveContact(contact, index)"
                >
                {{ contact.name }}
                </li>
            </ul>
            <button class="mt-3 btn btn-sm btn-primary" @click="goToAddContact">
            Thêm Liên hệ
            </button>
            <button
            class="mt-3 ml-2 btn btn-sm btn-danger"
            @click="removeAllContacts"
            >
            Xóa tất cả
            </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentIndex!=-1">
                <ContactDetails
                :contact="currentContact"
                />
                <router-link :to="'/contacts/' + currentContact.id"
                ><span class="badge badge-warning">Hiệu chỉnh</span></router-link>
            </div>
        </div>
    </div>
</template>
<script>
import ContactDetails from "../components/ContactDetails";
import ContactService from "../services/contact.service";

export default {
    name:"ContactBook",
    components: {
        ContactDetails
    },
    data() {
        return {
            contacts: [],
            currentContact: null,
            currentIndex: -1,
            nameToSearch: ""
        };
    },
    methods: {
        setActiveContact(contact, index) {
            this.currentContact = contact;
            this.currentIndex = contact ? index : -1;
        },
        async retrieveContacts() {
            const [error, response] = await this.handle(ContactService.getAll());
            if(error) console.log(error);
            else {
                this.contacts = response.data;
                console.log(response.data);
            }
        },
        refreshList() {
            this.retrieveContacts();
            this.currentContact = null;
            this.currentIndex = -1;
        },
        async removeAllContacts() {
            const [error, response] = await this.handle(ContactService.deleteAll());
            if (error) console.log(error);
            else {
                console.log(response.data);
                this.refreshList();
            }
        },
        goToAddContact() {
            this.$router.push("/add");
        },

        async searchName() {
            const [error, response] = await this.handle(ContactService.findByName(this.nameToSearch));
            if(error) console.log(error);
            else {
                this.contacts = response.data;
                this.setActiveContact(null);
                console.log(response.data);
            }
        },
    },
    mounted() {
        this.retrieveContacts();
    }
};
</script>