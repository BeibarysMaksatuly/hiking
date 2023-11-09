export default {
	data: () => ({
		mobileView: false,
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
		},
	}
}