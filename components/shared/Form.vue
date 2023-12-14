<template>
  <div class="form">
    <div class="container-1">
      <div class="data">
        <UiHeading class="data__title">
          {{ $t("main.form.leaveRequest") }}
        </UiHeading>
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
              height="51"
              outlined
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
              height="51"
              outlined
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
              height="51"
              outlined
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
              height="51"
              outlined
            ></v-text-field>
          </div>
          <UiButton class="data__button" @click.native="postForm()">{{
            $t("main.form.sendRequest")
          }}</UiButton>
        </v-form>
      </div>
      <img src="@/assets/images/form.png" alt="form" class="form__image" />
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
        this.form = {
          full_name: "",
          phone_number: "",
          email: "",
          comment: "",
        };
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
  background: white;
  @include phone {
    background-color: #f8fafb;
  }
  &__data {
    width: 602px;
    display: flex;
    flex-direction: column;

    padding: 24px 30px 38px;
    gap: 20px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.1);
    @include phone {
      width: 100%;
      padding: 15px 20px;
    }
  }

  &__image {
    width: 100%;
    height: 532px;
    object-fit: cover;
    border-radius: 10px;
    @include phone {
      width: 100%;
      height: 254.751px;
    }
  }
}

.container-1 {
  max-width: 1280px;
  padding-top: 80px;
  padding-bottom: 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-end;
  gap: 43px;
  @include phone {
    display: flex;
    grid-template-columns: unset;
    flex-direction: column-reverse;
    gap: 40px;
    padding-top: 20px;
    padding-bottom: 0px;
  }
}

.data {
  width: 100%;
  &__title {
    margin-bottom: 40px;
    @include phone {
      margin-bottom: 20px;
    }
  }
  &__button {
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
    font-weight: 500;
    line-height: 21px;
    margin-bottom: 12px;
    @include phone {
      font-size: 16px;
      margin-bottom: 10px;
    }
    span {
      color: rgba(220, 53, 69, 1);
    }
  }
}
</style>