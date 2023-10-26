<template>
  <div class="breadcrumbs">
    <nuxt-link v-for="(link, idx) in links" :key="idx" :to="localePath(link.url)" tag="a">
      <div class="flexy">
        <p class="" :class="{ textChange: links.length == idx + 1 }">
          {{ link.title }}
        </p>
        <span v-if="links.length - 1 != idx" class="mx-1">/</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style lang="scss" scoped>
.mx-1 {
  margin-left: 5px;
  margin-right: 5px;
}
.flexy {
  display: flex;
}
.breadcrumbs {
  padding-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  a {
    text-decoration: none;
    color: #7D92A1;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
  }
  p {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
  }
  .textChange {
    color: $c-orange;
    font-style: normal;
    font-weight: 400;
  }
}
</style>
