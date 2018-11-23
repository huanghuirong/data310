<template>
	<div id="homepage">
		<el-row :gutter="10">
			<el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
				<div class="grid-content bg-purple"></div>
			</el-col>
			<el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
				<div class="grid-content bg-purple-light"></div>
			</el-col>
			<el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
				<div class="grid-content bg-purple"></div>
			</el-col>
			<el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
				<div class="grid-content bg-purple-light"></div>
			</el-col>
		</el-row>
	</div>

</template>
<script>
	

	export default {
		data() {
			return {
				

			}
		},
		props: {

		},
		created() {
			
		},
		watch: {

		},
		methods: {
			closeshade() {
				this.shadeShow = false;
			},
		
		},
		components: {
			
		},
		computed: {

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@function px2rem($n) {
		@return $n / 75 * 1rem;
	}
	
	#homepage {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		display: flex;
		flex-direction: column;
	}
</style>