<template>
  <div class="form">
    <div class="container-1">
      <div class="form__data">
        <div class="data__title">{{ $t("main.form.leaveRequest") }}</div>
        <UiInput
          :label="$t('main.form.name')"
          :model.sync="form.full_name"
         />
         <UiInput
          :label="$t('main.form.phone')"
          :model.sync="form.phone_number"
         />
         <UiInput
          :label="$t('main.form.email')"
          :model.sync="form.email"
         />
         <UiInput
          :label="$t('main.form.comment')"
          :required="false"
          :model.sync="form.comment"
         />
         <UiButton class="data__button" @click.native="postForm()">{{ $t("main.form.sendRequest") }}</UiButton>
      </div>
      <div class="form__images">
        <img src="@/assets/images/form-bg.png" alt="form" class="form__images-main" />
        <img src="@/assets/images/form.png" alt="form" class="form__images-second" />
      </div>
    </div>
    <SharedModalsSuccess 
      v-if="completed" 
      :success="success"
      @close="completed=false"
    />
  </div>
</template>
<script>
export default {
  name: 'Form',
  data() {
    return {
      form: {
        full_name: '',
        phone_number: '',
        email: '',
        comment: ''
      },
      success: false,
      completed: false,
    }
  },
  methods: {
    async postForm() {
      try {
        await this.$axios.$post('/applications/', this.form)
        this.success = true;
      } catch(e) {
        console.log(e)
        this.success = false;
      } finally {
        this.completed = true;
      }

    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  background-color: $c-gray;
  overflow-x: clip;
  &__data {
    display: flex;
    width: 494px;
    padding: 20px 30px;
    flex-direction: column;
    gap: 20px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.10);
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
</style>