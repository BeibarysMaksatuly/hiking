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
              <div class="contacts__title">Связаться с нами</div>
              <div class="contacts__subtitle">
                <span>Форма обратной связи</span>
                <ArrowRight />
              </div>
              <div class="contacts__description">Мы искренне благодарны вам за вопросы, отзывы и предложения. Ваше сообщение будет направлено  отдел по работе с клиентами, и мы обязательно ответим вам в ближайщее время</div>
            </div>
            <div class="contacts__add">
              <div class="contacts__add-title">Присоединяйтесь</div>
              <div class="contacts__add-socials">
                <a href="" target="_blank"><Instagram1/></a>
                <a href="" target="_blank"><Youtube1/></a>
              </div>
            </div>
          </div>
          <div class="form__data">
            <UiInput
              class="input"
              label="Ваше имя"
              :model.sync="form.full_name"
            />
            <UiInput
            class="input"
              label="Ваш номер телефона"
              :model.sync="form.phone_number"
            />
            <UiInput
            class="input"
              label="Email"
              :model.sync="form.email"
            />
            <UiInput
            class="input"
              label="Комментарий"
              :required="false"
              :model.sync="form.comment"
            />
            <UiButton class="data__button" @click.native="postForm()">Отправить заявку</UiButton>
          </div>
          <div class="contacts__contact">
            <div class="contact__cont">
              <div class="contact__title">Контакты</div>
              <div class="contact__data">camping.life@gmail.ru</div>
              <div class="contact__data">+7 (708) 454 - 55 - 55</div>
            </div>
            <div class="contact__cont">
              <div class="contact__title">Адрес</div>
              <div class="contact__data">Байзакова, 280</div>
            </div>
            <div class="contact__cont">
              <div class="contact__title">Часы работы</div>
              <div class="contact__data">Без выходных</div>
              <div class="contact__data">10.00 - 19.00</div>
            </div>
            <div class="contact__cont">
              <div class="contact__title">Мы в мессенджерах</div>
              <div class="contacts__add-socials">
                <a href="" target="_blank"><Whatsapp1/></a>
                <a href="" target="_blank"><Telegram1/></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArrowRight from '@/assets/icons/arrow-right.svg?inline';
import Youtube1 from '@/assets/icons/youtube-1.svg?inline';
import Instagram1 from '@/assets/icons/instagram-1.svg?inline';
import Whatsapp1 from '@/assets/icons/whatsapp-1.svg?inline';
import Telegram1 from '@/assets/icons/telegram-1.svg?inline';
export default {
  components: {
    ArrowRight,
    Youtube1,
    Instagram1,
    Whatsapp1,
    Telegram1
  },
  data() {
    return {
      form: {
        full_name: '',
        phone_number: '',
        email: '',
        comment: ''
      }
    }
  },
  methods: {
    postForm() {
      this.$axios.$post('/applications/', this.form)
    }
  },
  computed: {
    links() {
      return [
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Контакты',
          url: '/contacts'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.contacts {
  background-image: url("~/assets/images/contacts-bg.png");
  background-size: 100% 100%;
  position: relative;
  color: #fff;
  @include phone {
    background-size: cover;
  }
  &__overlay {
    background: radial-gradient(620.68% 100% at 0% 23.36%, rgba(2, 49, 70, 0.50) 0%, rgba(2, 49, 70, 0.00) 25.66%, rgba(2, 49, 70, 0.00) 73.96%, rgba(2, 49, 70, 0.50) 100%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &__overlay-1 {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(2, 49, 70, 0.35) 57.29%, rgba(53, 156, 188, 0.00) 100%);
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
    padding-bottom: 155px;
  }
  &__container {
    display: flex;
    flex-direction: row;
    gap: 85px;
    @include phone {
      flex-direction: column;
      gap: 80px;
    }
  }

  &__join {
    padding-right: 12px;
  }

  &__join, &__cont, &__add {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 42px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 50.4px */
    letter-spacing: 0.126px;
    margin-top: 95px;
    margin-bottom: 40px;
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
  }
  &__description {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    margin-bottom: 97px;
    @include phone {
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
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 14px;
    width: 201px;
    flex-shrink: 0;
  }
}

.form {
  &__data {
    margin-top: 95px;
    flex-shrink: 0;
    display: flex;
    width: 380px;
    flex-direction: column;
    gap: 20px;
    @include phone {
      width: 100%;
      margin-top: 0;
    }
  }
}

:deep(.input__text) {
  opacity: 0.7 !important;
  backdrop-filter: blur(2px);
}

.contact {
  &__cont {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  &__title {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px; 
  }
  &__data {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
  }
}
</style>
