<template>
    <div>
        <h4>Thêm Liên hệ</h4>
        <ContactForm 
        :contact="contact"
        @contact-submit="addContact"
        />
        <p>{{ message }}</p>
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
      contact: {},
      message: "",
    };
  },
  methods: {
    async addContact(contact) {
      const [error, response] = await this.handle(ContactService.create(contact));
      if (error) {
        console.log(error);
      } else {
        this.message = "Thêm liên hệ thành công";
        console.log(response.data);
      }
    }
  },
  mounted() {
    this.message = "";
  },
};
</script>
<style>
.edit-form {
    max-width: 400px;
    margin: auto;
}
</style>
