import colors from 'vuetify/es5/util/colors'
import { resolve } from 'path'
const locales = [
	{ code: 'ru', iso: 'ru', file: 'ru.js', name: 'Russian' },
	{ code: 'kk', iso: 'kaz', file: 'kz.js', name: 'Kazakh' },
	{ code: 'en', iso: 'en', file: 'en.js', name: 'English' },
]
export default {
	loading: {
		color: 'orange',
		height: '5px'
	},
	// Global page headers: https://go.nuxtjs.dev/config-head
	ssr: true,
	head: {
		title: 'Camping Life',
		htmlAttrs: {
			lang: "en"
		},
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ hid: "description", name: "description", content: "" },
			{
				name: "msapplication-TileColor",
				content: "#da532c"
			},
			{
				name: "theme-color",
				content: "#ffffff"
			}
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
			{ rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
			{ rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
			{ rel: "manifest", href: "/site.webmanifest" },
			{ rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" }
		],
	},

	styleResources: {
		scss: ['~/assets/scss/_layout.scss', '~/assets/scss/_variables.scss'],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/scss/main.scss',
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '@/plugins/swiper.js', mode: 'client' },
		{ src: '@/plugins/axios.js' },
		{ src: "~/plugins/vmask.js", mode: "client" },
		{ src: "@/plugins/vClickOutside.js", mode: 'client' }
	],
	alias: {
		icons: resolve(__dirname, 'assets/icons'),
	},

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/i18n',
		'@nuxtjs/axios',
		'@nuxtjs/style-resources',
		'@nuxtjs/svg'
	],

	axios: {
		baseURL: 'http://194.110.54.147/api'
	},

	i18n: {
		locales,
		langDir: '@/lang/',
		defaultLocale: 'ru',
		vueI18nLoader: true,
		vueI18n: {
			fallbackLocale: 'ru',
			silentTranslationWarn: true,
			silentFallbackWarn: true
		},
		detectBrowserLanguage: {
			useCookie: false,
			redirectOn: 'root',
		}
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			dark: false,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	}
}
