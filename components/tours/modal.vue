<template>
  <v-dialog v-model="modalOpen" max-width="850" persistent>
    <div class="modal">
      <Close @click="closeModal" class="modal__close" />
      <div class="modal__title">{{ tour.name }}</div>

      <div class="modal__text">{{ tour.short_description }}</div>
      <client-only>
        <swiper :pagination="true" class="swiper" :options="swiperOptions">
          <swiper-slide
            v-for="image in tour.images"
            :key="image.id"
            class="mini__photo"
          >
            <img :src="image.image" alt="mini photo" />
          </swiper-slide>
          <div slot="button-prev" class="swiper-button-prev">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
                fill="#DDE1E6"
                fill-opacity="0.2"
              />
              <path
                d="M13.8047 7.52876C14.0651 7.78911 14.0651 8.21122 13.8047 8.47157L10.2761 12.0002L13.8047 15.5288C14.0651 15.7891 14.0651 16.2112 13.8047 16.4716C13.5444 16.7319 13.1223 16.7319 12.8619 16.4716L8.86193 12.4716C8.60158 12.2112 8.60158 11.7891 8.86193 11.5288L12.8619 7.52876C13.1223 7.26841 13.5444 7.26841 13.8047 7.52876Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
          <div slot="button-next" class="swiper-button-next">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
                transform="matrix(-1 0 0 1 24 0)"
                fill="#DDE1E6"
                fill-opacity="0.2"
              />
              <path
                d="M10.1953 16.4712C9.93491 16.2109 9.93491 15.7888 10.1953 15.5284L13.7239 11.9998L10.1953 8.47124C9.93491 8.21089 9.93491 7.78878 10.1953 7.52843C10.4556 7.26808 10.8777 7.26808 11.1381 7.52843L15.1381 11.5284C15.3984 11.7888 15.3984 12.2109 15.1381 12.4712L11.1381 16.4712C10.8777 16.7316 10.4556 16.7316 10.1953 16.4712Z"
                fill="white"
              />
            </svg>
          </div>
        </swiper>
      </client-only>
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
          <div class="circle"></div>
          <div>{{ tag.name }}</div>
        </div>
      </div>
      <div class="btns">
        <UiButton
          type="outlined"
          @click.native="$router.push(localePath(`/tours/${tour.id}/`))"
          >{{ $t("tours.seeTour") }}</UiButton
        >
        <UiButton @click.native="navigateToContacts">{{
          $t("main.form.sendRequest")
        }}</UiButton>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);
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
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      },
    };
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

  @include phone {
    padding: 20px;
  }

  &__close {
    width: 24px;
    height: 24px;
    color: $c-yellow;
    margin-left: auto;
    cursor: pointer;
    margin-bottom: 40px;
  }

  &__title {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    margin-bottom: 20px;
    @include phone {
      font-size: 18px;
      line-height: 21px;
    }
  }

  &__text {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    white-space: pre-line;
    margin-bottom: 24px;
    @include phone {
      font-size: 16px;
    }
  }

  &__places {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 24px;
    &:last-of-type {
      margin-top: 8px;
    }
  }

  &__place {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #324552;

    padding: 4px 12px;
    gap: 5px;
    border-radius: 10px;
    background: #f9f9f9;
    &--green {
      background: #f0fff4 !important;
    }

    @include phone {
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
    }
  }
}

.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(239, 127, 26, 0.6);
}

.swiper {
  width: 100%;
  height: 374px;
  border-radius: 10px;

  @include phone {
    width: 100%;
    height: 180px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
}

.btns {
  display: flex;
  flex-direction: row;
  gap: 22px;
  margin-top: 36px;
  @include phone {
    gap: 10px;
    flex-direction: column;
  }
}
.button-outlined,
.button-primary {
  height: 41px;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 500 !important;
  line-height: 21px !important;
  border-radius: 12px !important;
  @include phone {
    height: 27px;
    padding: 6px 10px !important;
    font-size: 12px !important;
    font-style: normal !important;
    font-weight: 500 !important;
    line-height: normal !important;
  }
}

.swiper-button-prev:after,
.swiper-button-next:after {
  display: none;
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0.5;
}
.swiper-button-prev,
.swiper-button-next {
  height: auto;
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  left: 16px;
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  right: 16px;
}
:deep(.swiper-pagination-bullet-active) {
  background: $c-orange !important;
}
:deep(.swiper-pagination-bullet) {
  background: $c-white;
  opacity: 1;
}
</style>