<template>
  <div class="advantages">
    <div v-for="(item, idx) in items" :key="idx">
      <img :src="item.img" alt="" />
      <p>{{ item.title }}</p>
      <span>{{ item.desc }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          img: require("@/assets/icons/credit-card.svg"),
          title: "Безопасная оплата",
          desc: "Бронируйте туры через нашу надежную платежную систему",
        },
        {
          img: require("@/assets/icons/smile.svg"),
          title: "Продуманная спонтанность",
          desc: "Маршруты могут адаптироваться под пожелания группы",
        },
        {
          img: require("@/assets/icons/user-check.svg"),
          title: "Проверенные тревел-эксперты",
          desc: "Маршруты могут адаптироваться под пожелания группы",
        },
        {
          img: require("@/assets/icons/thumbs-up.svg"),
          title: "Гарантированные туры",
          desc: "Маршруты могут адаптироваться под пожелания группы",
        },
        {
          img: require("@/assets/icons/check (1).svg"),
          title: "Небольшие группы",
          desc: "Особенная атмосфера в компании единомышленников",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.advantages {
  width: 100%;
  background: #f8fafb;
  padding: 48px 16px 60px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
  @include phone {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(197px, 1fr));
    padding: 44px 16px 80px;
  }
  div {
    width: 100%;
    max-width: 197px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include phone {
      max-width: 100%;
    }
    img {
      width: 28px;
      height: 28px;
      margin-bottom: 12px;
    }
    p {
      color: #324552;
      text-align: center;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 9px;
      @include phone {
        font-size: 16px;
      }
    }
    span {
      color: #324552;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>