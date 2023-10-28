export default function (ctx) {
  ctx.$axios.onRequest((config) => {
    const locale = ctx.i18n.locale
    config.headers.common['Accept-Language'] = locale;
  })
  ctx.$axios.onError((error) => {
    const code = error.code || error.response?.status
    if (Number(code) >= 400 && Number(code) < 500) {
      console.log(error?.response?.data)
      // ctx.$services.errors.addNotifications(error?.response?.data)
    } else if (code) {
      // ctx.$services.errors.onError(code)
    }
  })
}
