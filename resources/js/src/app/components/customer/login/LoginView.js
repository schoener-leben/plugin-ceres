import Vue from "vue";
const ModalService = require("../../../services/ModalService");

export default Vue.component("login-view", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-login-view"
        }
    },

    methods:
    {
        openGuestModal()
        {
            ModalService.findModal(this.$refs.guestModal).show();
        }
    }
});
