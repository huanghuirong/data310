<template>
	<div id="app">
		<!--<img src="./assets/logo.png">-->
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style lang="scss" scoped>
	/*@function px2rem($n) {
		@return $n / 75 * 1rem;
	}*/
	
* {
	margin: 0;
	padding: 0;
	list-style: none;
	text-decoration-line: none;
}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}
</style>