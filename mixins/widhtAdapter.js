export default {
	data: () => ({
		mobileView: false,
		mobileViewSwiper: false,
	}),
	mounted: function () {
		this.$nextTick(function () {
			this.handleView();
		})
		window.addEventListener('resize', this.handleView)
	},
	methods: {
		handleView() {
			this.mobileView = window.innerWidth <= 515
			this.mobileViewSwiper = window.innerWidth <= 960
		},
	}
}