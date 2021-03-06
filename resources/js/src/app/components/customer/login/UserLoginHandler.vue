<template>
    <div class="position-relative">
        <div class="dropdown" v-if="isLoggedIn">
            <a href="#" class="dropdown-toggle nav-link" id="accountMenuList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-boundary="window">
                <i class="fa fa-user mr-1 d-sm-none" aria-hidden="true"></i>
                <span class="d-none d-sm-inline">{{ $translate("Ceres::Template.loginHello", {"username": username }) }}</span>
            </a>
            <div class="dropdown-menu small m-0 p-0 mw-100">
                <div class="list-group" aria-labelledby="accountMenuList" >
                    <a :href="$ceres.urls.myAccount" class="list-group-item small"><i class="fa fa-user"></i> {{ $translate("Ceres::Template.loginMyAccount") }}</a>
                    <a href="#" class="list-group-item small" v-logout><i class="fa fa-sign-out"></i> {{ $translate("Ceres::Template.loginLogout") }}</a>
                </div>
            </div>
        </div>
        <div v-if="!isLoggedIn">
            <a class="nav-link" :href="isLogin ? 'javascript:void(0)' : '#login'" :data-toggle="isLogin ? false : 'modal'" @click="createLoginModal(); unmarkInputFields();">
                <i class="fa fa-user mr-1" aria-hidden="true"></i>
                <span class="d-none d-sm-inline">{{ $translate("Ceres::Template.login") }}</span>
            </a>
            <span class="pipe" v-if="showRegistration"></span>
            <a class="nav-link" :href="isRegister ? 'javascript:void(0)' : '#registration'" :data-toggle="isRegister ? false : 'modal'"  @click="createRegisterModal(); unmarkInputFields();" v-if="showRegistration">
                <i class="fa fa-user-plus mr-1" aria-hidden="true"></i>
                <span class="d-none d-sm-inline">{{ $translate("Ceres::Template.loginRegister") }}</span>
            </a>
        </div>
    </div>
</template>

<script>
import ApiService from "../../../services/ApiService";
import ValidationService from "../../../services/ValidationService";
import { isDefined } from "../../../helper/utils";
import { mapGetters, mapActions } from "vuex";

export default {
    props: {
        showRegistration: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        ...mapGetters([
           "username",
           "isLoggedIn"
        ])
    },

    created()
    {
        ApiService.get("/rest/io/customer", {}, { keepOriginalResponse: true })
            .done(response =>
            {
                if (isDefined(response.data))
                {
                    this.$store.commit("setUserData", response.data);
                }
            });

        this.isLogin = App.templateType === "login";
        this.isRegister = App.templateType === "register";
    },

    /**
     * Add the global event listener for login and logout
     */
    mounted()
    {
        this.$nextTick(() =>
        {
            this.addEventListeners();
        });
    },

    methods: {
        /**
         * Adds login/logout event listeners
         */
        addEventListeners()
        {
            ApiService.listen("AfterAccountAuthentication", userData =>
            {
                this.$store.commit("setUserData", userData.accountContact);
            });

            ApiService.listen("AfterAccountContactLogout", () =>
            {
                this.$store.commit("setUserData", null);
            });
        },

        unmarkInputFields()
        {
            ValidationService.unmarkAllFields($("#login"));
            ValidationService.unmarkAllFields($("#registration"));
        },

        createLoginModal()
        {
            this.loadComponent("login-modal");

        },

        createRegisterModal()
        {
            this.loadComponent("register-modal");
        },

        ...mapActions([
            "loadComponent"
        ])
    }
}
</script>
