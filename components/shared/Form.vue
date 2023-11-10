<template>
  <div class="form">
    <div class="container-1">
      <v-form ref="form" @submit.prevent="postForm" class="form__data">
        <div class="data__title">{{ $t("main.form.leaveRequest") }}</div>
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
            background-color="#F6F8FA"
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
            background-color="#F6F8FA"
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
            background-color="#F6F8FA"
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
            background-color="#F6F8FA"
          ></v-text-field>
        </div>
        <UiButton class="data__button" @click.native="postForm()">{{
          $t("main.form.sendRequest")
        }}</UiButton>
      </v-form>
      <div class="form__images">
        <img
          src="@/assets/images/form-bg.png"
          alt="form"
          class="form__images-main"
        />
        <img
          src="@/assets/images/form.png"
          alt="form"
          class="form__images-second"
        />
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
export default {
  name: "Form",
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
.form {
  background-color: $c-gray;
  overflow-x: clip;
  &__data {
    width: 494px;
    display: flex;
    flex-direction: column;

    padding: 20px 30px;
    gap: 20px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.1);
    @include phone {
      width: 100%;
      padding: 15px 20px;
    }
  }

  &__images {
    position: relative;
    width: 678px;
    height: 561px;
    flex-shrink: 0;
    border-radius: 10px;
    @media (max-width: 1140px) {
      width: 578px;
    }
    @include phone {
      width: 100%;
      height: 254.751px;
    }

    &-main {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }

    &-second {
      position: absolute;
      pointer-events: none;
      z-index: 10;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 1024px;
      height: 694px;
      object-fit: cover;
      flex-shrink: 0;

      @include phone {
        width: 465px;
        height: 315.146px;
      }
    }
  }
}

.container-1 {
  padding-top: 80px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: row;
  gap: 42px;
  align-items: center;
  @include phone {
    flex-direction: column-reverse;
    gap: 40px;
  }
}

.data {
  &__title {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    @include phone {
      font-size: 18px;
      line-height: 21px;
    }
  }

  &__button {
    background-color: $c-yellow;
    padding: 10px;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
}

.inputs {
  display: flex;
  flex-direction: column;
  p {
    color: #324552;
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    margin-bottom: 10px;
    span {
      color: rgba(220, 53, 69, 1);
    }
  }
}
</style>