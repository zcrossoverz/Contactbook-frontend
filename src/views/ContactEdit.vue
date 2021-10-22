<template>
    <div v-if="contact" class="edit-form">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ContactForm
        :contact="contact"
        @contact-submit="updateContact"
        @contact-delete="deleteContact"
        />
        <p>{{ message }}</p>
    </div>
    <div v-else>
        <br />
        <p>Liên hệ không tìm thấy.</p>
    </div>
</template>
<script>
import ContactService from "../services/contact.service";
import ContactForm from "../components/ContactForm";
export default {
  name: "ContactEdit",
  components: {
    ContactForm,
  },
  data() {
    return {
      contact: null,
      message: "",
    };
  },
  methods: {
    async getContact(id) {
      const [error, response] = await this.handle(ContactService.get(id));
      if (error) {
        console.log(error);
      } else {
        this.contact = response.data;
        console.log(response.data);
      }
    },
    async updateContact(data) {
      const [error, response] = await this.handle(
        ContactService.update(this.contact.id, data)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Liên hệ được cập nhật thành công.";
      }
    },
    async deleteContact() {
      const [error, response] = await this.handle(
        ContactService.delete(this.contact.id)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        // Chuyển sang route /contactbook
        this.$router.push({ name: "ContactBook" });
      }
    },
  },
  mounted() {
    this.message = "";
    this.getContact(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
    max-width: 400px;
    margin: auto;
}
</style>
