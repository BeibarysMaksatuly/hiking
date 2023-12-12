<template>
  <div class="documents">
    <div class="container-1">
      <UiBreadcrumbs :links="links" />
      <UiHeading class="documents__title">{{
        $t("header.document")
      }}</UiHeading>
      <div class="documents__items">
        <a class="document" v-for="document in documents" :key="document.id">
          <img
            v-if="document.file_type == 'docx'"
            src="@/assets/images/docx.png"
            alt=""
          />
          <img v-else src="@/assets/images/pdf.png" alt="" />
          <p>{{ document.title }}</p>
        </a>
      </div>
    </div>
    <v-overlay :value="$fetchState.pending" z-index="999999">
      <v-progress-circular
        :size="70"
        :width="7"
        color="#EF7F1A"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      documents: {},
    };
  },
  async fetch() {
    this.documents = await this.$axios.$get(`/documents/`);
  },
  computed: {
    links() {
      return [
        {
          title: this.$t("header.main"),
          url: "/",
        },
        {
          title: this.$t("header.document"),
          url: "/documents",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.documents {
  padding-bottom: 80px;
  &__title {
    margin-bottom: 60px;
    @include phone {
      margin-bottom: 24px;
    }
  }
  &__items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px 28px;
    @include phone {
      gap: 20px 15px;
    }
  }
}
.document {
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  border: 1px solid #7d92a1;
  cursor: pointer;
  transition: 0.3s;
  @include phone {
    padding: 16px 28px 8px 28px;
  }
  @media (max-width: 405px) {
    display: flex;
		flex-direction: column;
		width: 100%;
  }
  &:hover {
    opacity: 0.8;
  }
  img {
    width: 168px;
    height: 168px;
    margin-bottom: 28px;
    @include phone {
      width: 108px;
      height: 108px;
      margin-bottom: 20px;
    }
  }
  p {
    color: #06d;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    @include phone {
      font-size: 14px;
    }
  }
}
</style>