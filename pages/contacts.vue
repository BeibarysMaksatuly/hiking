<template>
  <div class="contacts">
    <div class="contacts__overlay"></div>
    <div class="contacts__overlay-1"></div>
    <div class="contacts__data">
      <div class="container-1">
        <UiBreadcrumbs :links="links"></UiBreadcrumbs>
        <div class="contacts__container">
          <div class="contacts__join">
            <div class="contatcs__cont">
              <div class="contacts__title">{{ $t("contacts.contact") }}</div>
              <div class="contacts__subtitle">
                <span>{{ $t("contacts.form") }}</span>
                <ArrowRight />
              </div>
              <div class="contacts__description">
                {{ $t("contacts.formDescription") }}
              </div>
            </div>
            <div class="contacts__add">
              <div class="contacts__add-title">{{ $t("contacts.join") }}</div>
              <div class="contacts__add-socials">
                <a
                  href="https://instagram.com/campinglife.kz?igshid=enN5MWVnaG9mMWs="
                  target="_blank"
                  ><Instagram1
                /></a>
                <a href="" target="_blank"><Youtube1 /></a>
              </div>
            </div>
          </div>
          <v-form ref="form" @submit.prevent="postForm" class="form__data">
            <div class="inputs">
              <p>
                {{ $t("main.form.name") }}
                <span class="red">*</span>
              </p>
              <v-text-field
                v-model="form.full_name"
                :placeholder="$t('main.form.placeholder_name')"
                solo
                dense
                height="41"
                background-color="rgba(246, 248, 250, 0.70)"
                required
                :rules="rules"
              ></v-text-field>
              <p>
                {{ $t("main.form.phone") }}
                <span class="red">*</span>
              </p>
              <v-text-field
                v-model="form.phone_number"
                placeholder="+7 (XXX) XXX XX XX"
                solo
                dense
                height="41"
                background-color="rgba(246, 248, 250, 0.70)"
                required
                :rules="phoneRules"
                v-mask="'+7(###)-###-##-##'"
              ></v-text-field>
              <p>
                {{ $t("main.form.email") }}
                <span class="red">*</span>
              </p>
              <v-text-field
                v-model="form.email"
                :placeholder="$t('main.form.email')"
                solo
                dense
                height="41"
                background-color="rgba(246, 248, 250, 0.70)"
                required
                :rules="emailRules"
              ></v-text-field>
              <p>{{ $t("main.form.comment") }}</p>
              <v-text-field
                v-model="form.comment"
                :placeholder="$t('main.form.comment')"
                solo
                dense
                hide-details=""
                height="41"
                background-color="rgba(246, 248, 250, 0.70)"
              ></v-text-field>
            </div>
            <UiButton class="data__button" @click.native="postForm()">{{
              $t("main.form.sendRequest")
            }}</UiButton>
          </v-form>
          <div class="contacts__contact">
            <div class="contact__cont">
              <div class="contact__title">
                <div></div>
                {{ $t("contacts.contacts") }}
              </div>
              <a href="mailto:kazcamping@gmail.com" class="contact__data"
                >kazcamping@gmail.com</a
              >
              <a href="tel:+7 (707) 617 - 41 - 89" class="contact__data"
                >+7 (707) 617 - 41 - 89</a
              >
            </div>
            <div class="contact__cont">
              <div class="contact__title">
                <div></div>
                {{ $t("contacts.address") }}
              </div>
              <a
                href="https://2gis.kz/almaty/geo/9430047375134121?m=76.98372%2C43.299308%2F15.54"
                target="_blank"
                class="contact__data"
                >{{ $t("footer.address") }}</a
              >
            </div>
            <div class="contact__cont">
              <div class="contact__title">
                <div></div>
                {{ $t("contacts.workingHours") }}
              </div>
              <div class="contact__data">
                {{ $t("contacts.withoutDayoffs") }}
              </div>
              <div class="contact__data">10.00 - 19.00</div>
            </div>
            <div class="contact__cont">
              <div class="contact__title">
                <div></div>
                {{ $t("contacts.messengers") }}
              </div>
              <div class="contacts__add-socials contact__links">
                <a href="https://t.me/CampingLife_Team" target="_blank"
                  ><Telegram1
                /></a>
                <a href="https://wa.me/+77076174189" target="_blank"
                  ><Whatsapp1
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SharedModalsSuccess
      v-if="completed"
      :success="success"
      @close="completed = false"
    />
  </div>
</template>
<script>
import ArrowRight from "@/assets/icons/arrow-right.svg?inline";
import Youtube1 from "@/assets/icons/youtube-1.svg?inline";
import Instagram1 from "@/assets/icons/instagram-1.svg?inline";
import Whatsapp1 from "@/assets/icons/whatsapp-1.svg?inline";
import Telegram1 from "@/assets/icons/telegram-1.svg?inline";
export default {
  components: {
    ArrowRight,
    Youtube1,
    Instagram1,
    Whatsapp1,
    Telegram1,
  },
  data() {
    return {
      form: {
        full_name: "",
        phone_number: "",
        email: "",
        comment: "",
      },
      success: false,
      completed: false,
    };
  },
  computed: {
    links() {
      return [
        {
          title: this.$t("header.main"),
          url: "/",
        },
        {
          title: this.$t("header.contacts"),
          url: "/contacts",
        },
      ];
    },
    rules() {
      return [(value) => !!value || this.$t("main.form.required")];
    },
    phoneRules() {
      return [
        ((v) => {
          return !!v || this.$t("main.form.telephone");
        },
        (v) => v.length == 17 || this.$t("main.form.wrong_number")),
      ];
    },
    emailRules() {
      return [
        (v) => !!v || this.$t("main.form.email_name"),
        (v) => /.+@.+\..+/.test(v) || this.$t("main.form.wrong_email"),
      ];
    },
  },
  methods: {
    postForm() {
      this.$axios.$post("/applications/", this.form);
    },
    async postForm() {
      if (!this.$refs.form.validate()) return;
      try {
        await this.$axios.$post("/applications/", this.form);
        this.success = true;
      } catch (e) {
        console.log(e);
        this.success = false;
      } finally {
        this.completed = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.contacts {
  background-image: url("~/assets/images/contacts-bg.png");
  background-size: 100% 100%;
  position: relative;
  color: #fff;
  @include phone {
    background-size: cover;
    background-image: url("~/assets/images/contacts-bg_mobile.png");
  }
  &__overlay {
    background: radial-gradient(
      620.68% 100% at 0% 23.36%,
      rgba(2, 49, 70, 0.5) 0%,
      rgba(2, 49, 70, 0) 25.66%,
      rgba(2, 49, 70, 0) 73.96%,
      rgba(2, 49, 70, 0.5) 100%
    );
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &__overlay-1 {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(2, 49, 70, 0.35) 57.29%,
      rgba(53, 156, 188, 0) 100%
    );
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  &__data {
    position: relative;
    z-index: 3;
    padding-bottom: 155.5px;
    @include phone {
      padding-bottom: 130px;
    }
  }
  &__container {
    display: flex;
    flex-direction: row;
    gap: 85px;
    @media (max-width: 1140px) {
      gap: 40px;
    }
    @include phone {
      flex-direction: column;
      gap: 80px;
    }
  }

  &__join {
    padding-right: 12px;
    @include phone {
      padding-right: 0px;
    }
  }

  &__join,
  &__cont,
  &__add {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 42px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 50.4px */
    letter-spacing: 0.126px;
    margin-top: 94.5px;
    margin-bottom: 40px;
    @include phone {
      font-size: 24px;
      letter-spacing: 0.072px;
      margin-top: 53px;
    }
  }
  &__subtitle {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    @include phone {
      font-size: 16px;
    }
  }
  &__description {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    margin-bottom: 97px;
    @include phone {
      font-size: 16px;
      margin-bottom: 38px;
    }
  }
  &__add-title {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    margin-bottom: 20px;
  }

  &__add-socials {
    display: flex;
    gap: 20px;
    a {
      width: 32px;
      height: 32px;
    }
  }

  &__contact {
    position: relative;
    width: 201px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 30px;
    margin-top: 14px;
    &::after {
      position: absolute;
      left: 0;
      top: -75px;
      content: "";
      width: 5px;
      height: 700px;
      flex-shrink: 0;
      background: rgba(166, 166, 166, 0.6);
      @include phone {
        top: -50px;
        height: 537px;
      }
    }
    @include phone {
      margin: 0;
    }
  }
}

.form {
  &__data {
    width: 380px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 20px;
    margin-top: 94.5px;
    @include phone {
      width: 100%;
      margin-top: 0;
    }
  }
}

.inputs {
  display: flex;
  flex-direction: column;
  p {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    margin-bottom: 10px;
    span {
      color: rgba(220, 53, 69, 1);
    }
    @include phone {
      font-size: 16px;
    }
  }
}

.contact {
  &__cont {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  &__title {
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      width: 5px;
      height: 30px;
      background: #fff;
      margin-right: 10px;
    }

    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    @include phone {
      font-size: 16px;
    }
  }
  &__data {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    margin-left: 15px;
  }
  &__links {
    margin-left: 15px;
  }
}
</style>
