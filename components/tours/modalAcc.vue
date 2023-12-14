<template>
  <v-dialog v-model="modalOpen" max-width="627" persistent>
    <div class="modal">
      <div class="modal__header">
        <div class="modal__title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
              stroke="#566976"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 22V12H15V22"
              stroke="#566976"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            /></svg
          >{{ acc.title }}
        </div>
        <Close @click="closeModal" class="modal__close" />
      </div>

      <div class="modal__text">{{ acc.text }}</div>
      <client-only>
        <swiper :pagination="true" class="swiper" :options="swiperOptions">
          <swiper-slide v-for="image in acc.images" :key="image.id">
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
    </div>
  </v-dialog>
</template>

<script>
import Close from "@/assets/icons/close.svg?inline";
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);
export default {
  props: {
    acc: {
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
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  display: flex;
  flex-direction: column;

  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.1);
  padding: 24px 24px 28px;

  @include phone {
    padding: 20px;
  }

  &__close {
    width: 24px;
    height: 24px;
    color: #324552 !important;
    cursor: pointer;
  }

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  &__title {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    svg {
      margin-right: 12px;
    }
    @include phone {
      font-size: 18px;
      line-height: 21px;
    }
  }

  &__text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    white-space: pre-line;
    margin-bottom: 20px;
    @include phone {
      font-size: 14px;
      line-height: 21px;
    }
  }
}

.swiper {
  width: 100%;
  height: 300px;
  border-radius: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
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
  left: 12px;
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  right: 12px;
}
:deep(.swiper-pagination-bullet-active) {
  background: $c-orange !important;
}
:deep(.swiper-pagination-bullet) {
  background: $c-white;
  opacity: 1;
}
</style>