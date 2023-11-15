<template>
  <v-dialog v-model="modalOpen" max-width="850" persistent>
    <div class="modal">
      <Close @click="closeModal" class="modal__close" />
      <div class="modal__title">{{ tour.name }}</div>
      <div class="modal__places">
        <div class="modal__place">
          <div class="circle"></div>
          <div>{{ tour.country.name }}</div>
        </div>
        <div
          class="modal__place modal__place--green"
          v-for="(tag, idx) in tour.tags"
          :key="idx"
        >
          <div class="circle--green"></div>
          <div>{{ tag.name }}</div>
        </div>
      </div>
      <div class="modal__text">{{ tour.short_description }}</div>
      <div class="modal__images">
        <img
          v-for="(image, idx) in tour.images"
          :key="idx"
          :src="image.image"
          alt="image"
        />
      </div>
      <UiButton @click.native="navigateToContacts">{{
        $t("main.form.sendRequest")
      }}</UiButton>
    </div>
  </v-dialog>
</template>

<script>
import Close from "@/assets/icons/close.svg?inline";
export default {
  props: {
    tour: {
      type: Object,
      default: {},
    },

    modalOpen: Boolean,
  },
  components: {
    Close,
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    navigateToContacts() {
      this.$router.push(this.localePath("/contacts"));
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  max-height: 90%;
  display: flex;
  flex-direction: column;

  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.1);
  padding: 40px 50px;
  gap: 20px;

  @include phone {
    padding: 20px;
  }

  &__close {
    width: 24px;
    height: 24px;
    color: $c-yellow;
    margin-left: auto;
    cursor: pointer;
  }

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

  &__places {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    @include phone {
      gap: 5px;
    }
  }

  &__place {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;

    padding: 8px 12px;
    gap: 5px;
    border-radius: 10px;
    border: 2px solid rgba(239, 127, 26, 0.6);

    &--green {
      border: 2px solid rgba(40, 167, 69, 0.6) !important;
    }

    @include phone {
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
    }
  }

  &__text {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    white-space: pre-line;
    @include phone {
      font-size: 16px;
    }
  }

  &__images {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(223px, 1fr));
    gap: 40px;
    img {
      width: 100%;
      height: 240px;
      border-radius: 10px;
      align-self: stretch;
      object-fit: cover;
    }
    @include phone {
      grid-template-columns: 1fr;
      gap: 20px;
      img {
        height: 117px;
      }
    }
  }
}

.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(239, 127, 26, 0.6);
  &--green {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(40, 167, 69, 0.6);
  }
}
</style>