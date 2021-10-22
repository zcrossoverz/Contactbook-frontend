<template>
    <div>
        <h4>Chi tiết Liên hệ <i class="fas fa-address-card"></i></h4>
        <div class="row">
            <div class="mb-2 col-12"><strong>Tên:</strong> {{ contact.name }}</div>
            <div class="mb-2 col-12">
                <strong>E-mail:</strong> {{ contact.email }}
            </div>
            <div class="mb-2 col-12">
                <strong>Địa chỉ:</strong> {{ contact.address }}
            </div>
            <div class="mb-2 col-12">
                <strong>Điện thoại:</strong> {{ contact.phone }}
            </div>
            <div class="mb-2 col-12">
                    <strong>Liên hệ yêu thích: </strong>
                    <i v-if="contact.favorite" class="fas fa-check"></i>
                    <i v-else class="fas fa-times"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ContactDetails",
    props: ["contact"],
};
</script>