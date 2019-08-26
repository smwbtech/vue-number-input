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

		<section class="content">
			<!-- features -->
			<h2 class="sub-title">Features</h2>
			<ul class="list">
				<li class="list__item">
					Accessibility: using ARIA agreements
				</li>
				<li class="list__item">
					Use your keyboard to navigate and control
				</li>
				<li class="list__item">
					Use your mousewheel or touchpad to increase or descrease
					value
				</li>
				<li class="list__item">
					Flexible styling
				</li>
				<li class="list__item">
					Support custom controls through slots
				</li>
			</ul>

			<VueNumberInput
				class="number-input number-input_default"
				v-model="first.value"
				:autofocus="true"
			/>
			<pre v-highlightjs="examples.default"><code class="html" v-pre>
			</code></pre>

			<!-- Min and Max values -->

			<h2 class="sub-title">Min and Max values</h2>
			<p>You can set minimum and maximum values</p>
			<VueNumberInput
				class="number-input number-input_default"
				v-model="second.value"
				:min="0"
				:max="100"
			/>
			<pre v-highlightjs="examples.one"><code class="html" v-pre>
			</code></pre>

			<!-- Custom step -->

			<h2 class="sub-title">Step value</h2>
			<p>You can set custom step value</p>
			<VueNumberInput
				class="number-input number-input_default"
				v-model="third.value"
				:min="0"
				:max="10"
				:step="0.1"
			/>
			<pre v-highlightjs="examples.two"><code class="html" v-pre>
			</code></pre>

			<!-- Custom control positions -->

			<h2 class="sub-title">Different control positions</h2>
			<p>
				By default it is 'on edges', but you can also set 'left' or
				'right'
			</p>
			<VueNumberInput
				class="number-input number-input_default"
				v-model="fourth.value"
				:controlsPosition="'left'"
			/>
			<pre v-highlightjs="examples.three"><code class="html" v-pre>
			</code></pre>
			<VueNumberInput
				class="number-input number-input_default"
				v-model="fives.value"
				:controlsPosition="'right'"
			/>
			<pre v-highlightjs="examples.four"><code class="html" v-pre>
			</code></pre>

			<!-- Disabled and Readonly -->

			<h2 class="sub-title">Disabled and Readonly</h2>
			<p>
				You can make element disabled or readonly by set up same
				attributes
			</p>
			<VueNumberInput
				class="number-input number-input_default"
				v-model="sixth.value"
				readonly
			/>
			<pre v-highlightjs="examples.five"><code class="html" v-pre>
			</code></pre>
			<VueNumberInput
				class="number-input number-input_default"
				v-model="seventh.value"
				disabled
			/>
			<pre v-highlightjs="examples.six"><code class="html" v-pre>
			</code></pre>

			<!-- Custom styles -->

			<h2 class="sub-title">Custom styles</h2>
			<p>
				Provide your own css classes and you can style the component as
				you wish
			</p>
			<VueNumberInput
				class="number-input number-input_default custom-container"
				v-model="eighth.value"
				:inputClass="'custom-input'"
				:buttonIncClass="'custom-btn-inc'"
				:buttonDecClass="'custom-btn-dec'"
			/>
			<pre v-highlightjs="examples.seven"><code class="html" v-pre>
			</code></pre>

			<!-- Using slots -->

			<h2 class="sub-title">Your own controls through slot</h2>
			<p>
				You can create your own controls and pass them to slots<br />
				<a href="https://vuejs.org/v2/guide/components-slots.html"
					>Read more about slots</a
				>
			</p>
			<VueNumberInput
				class="number-input number-input_default custom-container-slot"
				v-model="ninth.value"
				:inputClass="'custom-input-slot'"
				:buttonIncClass="'custom-btn-inc-slot'"
				:buttonDecClass="'custom-btn-dec-slot'"
			>
				<template #button-decrease>
					<p class="slot-btn-dec">
						<svg
							version="1.1"
							id="Capa_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							viewBox="0 0 52 52"
							style="enable-background:new 0 0 52 52;"
							xml:space="preserve"
						>
							<g>
								<path
									class="svg-btn"
									d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
								S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"
								/>
								<path
									class="svg-btn"
									d="M39,25H13c-0.552,0-1,0.447-1,1s0.448,1,1,1h26c0.552,0,1-0.447,1-1S39.552,25,39,25z"
								/>
							</g>
						</svg>
					</p>
				</template>
				<template #button-increase>
					<p class="slot-btn-inc">
						<svg
							version="1.1"
							id="Capa_2"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							viewBox="0 0 52 52"
							style="enable-background:new 0 0 52 52;"
							xml:space="preserve"
						>
							<g>
								<path
									class="svg-btn"
									d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
								S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"
								/>
								<path
									class="svg-btn"
									d="M38.5,25H27V14c0-0.553-0.448-1-1-1s-1,0.447-1,1v11H13.5c-0.552,0-1,0.447-1,1s0.448,1,1,1H25v12c0,0.553,0.448,1,1,1
								s1-0.447,1-1V27h11.5c0.552,0,1-0.447,1-1S39.052,25,38.5,25z"
								/>
							</g>
						</svg>
					</p>
				</template>
			</VueNumberInput>
			<pre v-highlightjs="examples.eight"><code class="html" v-pre>
			</code></pre>
		</section>

		<!-- footer -->
		<footer class="footer">
			<p class="footer-text">
				<span class="footer-text__item"
					>If you like this component, please give me a star!
					<span class="gh-icon">
						<a
							class="github-button"
							href="https://github.com/smwbtech/vue-number-input"
							data-icon="octicon-star"
							data-size="large"
							aria-label="Star smwbtech/vue-number-input on GitHub"
							>Star</a
						>
					</span>
				</span>

				<span class="footer-text__item"
					>If you have some suggestions, questions, fixes use GitHub
					Issues
					<span class="gh-icon"
						><a
							class="github-button"
							href="https://github.com/smwbtech/vue-number-input/issues"
							data-icon="octicon-issue-opened"
							data-size="large"
							aria-label="Issue smwbtech/vue-number-input on GitHub"
							>Issue</a
						></span
					>
				</span>
			</p>
		</footer>
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
			first: { value: 1 },
			second: { value: 50 },
			third: { value: 4.8 },
			fourth: { value: 0 },
			fives: { value: 0 },
			sixth: { value: 0 },
			seventh: { value: 0 },
			eighth: { value: 0 },
			ninth: { value: 0 },
			examples: {
				default: '<vue-number-input :autofocus="true" />',
				one: '<vue-number-input :value="50" :min="0" :max="100" />',
				two:
					'<vue-number-input :value="4.8" :min="0" :max="10" :step="0.1" />',
				three: '<vue-number-input :controlsPosition="left" />',
				four: '<vue-number-input :controlsPosition="right" />',
				five: '<vue-number-input readonly/>',
				six: '<vue-number-input disabled />',
				seven: `<vue-number-input
	class="custom-container"
	:inputClass="custom-input"
	:buttonIncClass="custom-btn-inc"
	:buttonDecClass="custom-btn-dec"
/>`,
				eight: `<vue-number-input
	class="custom-container"
	:inputClass="custom-input"
	:buttonIncClass="custom-btn-inc"
	:buttonDecClass="custom-btn-dec"
>
	<!-- slot for decrease button -->
	<template #button-decrease>
		<custom-decrease-button></custom-decrease-button>
	</template>

	<!-- slot for increase button -->
	<template #button-increase>
		<custom-increase-button></custom-increase-button>
	</template>

</vue-number-input>`
			}
		};
	}
};
</script>

<style>
/* common */
body {
	margin: 0;
	padding: 0;
}

ul {
	padding: 0;
}

a {
	color: #a32f80;
}

p {
	font-size: 1.3em;
}

code {
	font-size: 1.3em;
}

.hljs-comment {
	color: #3d3d3d;
}
/* common end*/

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	/* header */
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
					font-weight: bold;
					color: #fff;
					transition: color 0.2s ease-in;
					text-decoration: none;

					&:hover {
						color: #ff6363;
					}
				}
			}
		}
	} /* header end */

	/* content */
	& .content {
		text-align: left;
		margin: 0 20%;

		& .sub-title {
			position: relative;
			color: #341677;
			margin-top: 40px;
			margin-bottom: 30px;

			&:after {
				position: absolute;
				left: 0;
				bottom: -10px;
				display: block;
				content: '';
				width: 40px;
				height: 3px;
				background-color: #ff6363;
			}
		} /* .sub-title end */

		& .list {
			padding-left: 20px;
			list-style: none;

			& .list__item {
				position: relative;

				&:before {
					position: absolute;
					left: -20px;
					content: '\2022';
					font-weight: bold;
					color: #ff6363;
				}
			}
		} /* list end */
	} /* content end */

	& .number-input {
		&.number-input_default {
			width: 30%;
			max-width: 400px;
		}
	}

	& .footer {
		margin-top: 40px;
		background-color: #341677;

		& .footer-text {
			padding: 20px;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			align-items: center;
			color: #fff;
			display: flex;
			margin: 0 20%;

			& .footer-text__item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10px 0px;

				& .gh-icon {
					display: inline-block;
					margin-left: 20px;
				}
			}
		}
	}
}

/* Custom classes */

.custom-container {
	border: 2px solid #a32f80;
	background-color: #341677;
}

.custom-input {
	text-align: center;
	color: #fff;
	font-weight: bold;
	font-size: 1.4em;
	background-color: #341677;
}

.custom-btn-inc,
.custom-btn-dec {
	background-color: #ff6363;

	& .vue-number-input-btn__default {
		background-color: #ff6363;
		transition: background-color 0.2s ease-in;

		&:hover {
			background-color: #a32f80;
		}

		& .vue-number-input-btn__symbol {
			color: #fff;
		}
	}
}

/* Slot classes */

.slot-btn-dec,
.slot-btn-inc {
	margin: 0;
	margin-top: 5px;
	& .svg-btn {
		fill: #ff6363;
		transition: fill 0.2s ease-in;
	}

	&:hover {
		& .svg-btn {
			fill: #341677;
		}
	}
}

.custom-container-slot {
	background-color: rgba(0, 0, 0, 0);
	border: 3px solid #ff6363;
	border-radius: 50px;
	overflow: hidden;

	&.vue-number-input_on-edge {
		& .custom-input-slot {
			width: 60%;
			text-align: center;
			font-size: 1.3em;
			color: #341677;
		}

		& .custom-btn-inc-slot,
		& .custom-btn-dec-slot {
			width: 20%;
			background-color: rgba(0, 0, 0, 0);
		}

		& .custom-btn-dec-slot {
			padding-left: 10px;
		}

		& .custom-btn-inc-slot {
			padding-right: 10px;
		}
	}
}
</style>
