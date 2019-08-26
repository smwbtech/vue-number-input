<template>
	<div id="app">
		<!-- Header -->
		<header class="header">
			<h1>@smartweb/vue-number-input</h1>
			<nav class="navigation">
				<ul class="navigation-list">
					<li class="navigation-list-item">
						<a
							class="navigation-list__link"
							href="https://www.npmjs.com/package/@smartweb/vue-number-input"
							>NPM</a
						>
					</li>
					<li class="navigation-list-item">
						<a
							class="navigation-list__link"
							href="https://github.com/smwbtech/vue-number-input"
							>GitHub</a
						>
					</li>
					<li class="navigation-list-item">
						<a
							class="navigation-list__link"
							href="https://github.com/smwbtech/vue-number-input/issues"
							>Issues</a
						>
					</li>
				</ul>
			</nav>
		</header>

		<section class="content"></section>

		<!-- footer -->
		<footer class="footer"></footer>

		<VueNumberInput v-model="value" :min="0" :max="10" :step="1" />
	</div>
</template>

<script>
import VueNumberInput from '@/components/VueNumberInput.vue';

export default {
	name: 'app',
	components: {
		VueNumberInput
	},
	data() {
		return {
			value: 1
		};
	}
};
</script>

<style>
body {
	margin: 0;
	padding: 0;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	& .header {
		padding: 20px;
		background-color: #000272;
		color: #fff;

		& .navigation-list {
			display: flex;
			justify-content: center;
			width: 70%;
			margin: 0 auto;

			& .navigation-list-item {
				display: block;
				margin: 0px 20px;

				& .navigation-list__link {
					color: #fff;
					transition: color 0.2s ease-in;
					text-decoration: none;

					&:hover {
						color: #ff6363;
					}
				}
			}
		}
	}
}
</style>
