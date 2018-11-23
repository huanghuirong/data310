<template>
	<div class="footer">
		<div>建议使用谷歌、火狐、IE10以上的浏览器</div>
		<div>梦和远方（北京）网络科技有限公司 京IC</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
			}
		},
		created() {

		},
		props: {

		},
		methods: {

		},
		components: {

		},
		computed: {
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.footer{
		width:100%;
		height:120px;
		background:#333333;
		color:#FFFFFF;
		font-size:12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.footer div:nth-child(1){
		margin-bottom:10px;
	}
</style>
