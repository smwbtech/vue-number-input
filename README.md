# @smartweb/vue-number-input

[![vue](https://img.shields.io/badge/Vue-2.x-green.svg)](https://vuejs.org/index.html)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/smwbtech/vue-flash-message/blob/master/LICENSE.md)
[![Build Status](https://travis-ci.org/smwbtech/vue-number-input.svg?branch=master)](https://travis-ci.org/smwbtech/vue-number-input)
[![Coverage Status](https://coveralls.io/repos/github/smwbtech/vue-number-input/badge.svg?branch=master)](https://coveralls.io/github/smwbtech/vue-number-input?branch=master)

Vue component for numbers input.

-   Accessible: uses ARIA agreements (100% accessibility in lighthouse)
-   Use your keyboard to navigate and control
-   Use your mousewheel or touchpad to increase or descrease value
-   Flexible styling
-   Support custom controls through slots

#### [Live Demo](https://smwbtech.github.io/vue-number-input/)

## Download

Use npm

```
npm i @smartweb/vue-number-input
```

Or via cdn

```html
<script src="https://unpkg.com/@smartweb/vue-number-input/build/vue-number-input.umd.min.js"></script>
```

## Configuration

Import and register in your component.vue file

```javascript
import VueNumberInput from '@smartweb/vue-number-input';

export default {
	components: {
		VueNumberInput
	}
};
```

Use it in your template

```html
<template>
	<div id="app">
		<VueNumberInput :min="0" :max="100"></VueNumberInput>
	</div>
</template>
```

Or register it globally in your application entry point (main.js or as you called it)

```javascript
import Vue from 'vue';
import VueNumberInput from '@smartweb/vue-number-input';
// Global registration of the component
Vue.component('vue-number-input', VueNumberInput);

new Vue({
	render: h => h(App)
}).$mount('#app');
```

## Usage

You can bind following props for vue-input-number element

| Prop                 |    Type     |      Default value      |                                                   Description                                                    |
| -------------------- | :---------: | :---------------------: | :--------------------------------------------------------------------------------------------------------------: |
| **value**            | **Number**  |            0            |                 Defines a value for 'value' and 'aria-valuenow' attributes of <input/> element.                  |
| **min**              | **Number**  | Number.MIN_SAFE_INTEGER |     Minimum value of the number range. Provides a value for 'aria-valuemin' attributes of <input/> element.      |
| **max**              | **Number**  | Number.MAX_SAFE_INTEGER |     Maximum value of the number range. Provides a value for 'aria-valuemax' attributes of <input/> element.      |
| **step**             | **Number**  |            1            |                                                 Incremental step                                                 |
| **disabled**         | **Boolean** |          false          | Defines a value for 'aria-disabled' and 'disabled' attributes of <input/> element. Also disable controls buttons |
| **readonly**         | **Boolean** |          false          |                          Defines a value for 'readonly' attribute of <input/> element.                           |
| **autofocus**        | **Boolean** |          false          |                          Defines a value for 'autofocus' attribute of <input/> element.                          |
| **controlsPosition** | **String**  |        'on edge'        |               Acceptable values: 'on edges', 'left', right'. Defines position of control buttons.                |
| **inputClass**       | **String**  |            -            |                                      Defines user's class for input element                                      |
| **buttonIncClass**   | **String**  |            -            |                                     Defines user's class for increase button                                     |
| **buttonDecClass**   | **String**  |            -            |                                     Defines user's class for decrease button                                     |

#### Example

```html
<vue-number-input :value="50" :min="0" :max="100" :controlsPosition="'left'" />
```

For more examples visit **[demo page](https://smwbtech.github.io/vue-number-input/)**

#### Your own controls through slot

You can create your own controls and pass them to slots
Read more about slots in [official docs](https://vuejs.org/v2/guide/components-slots.html)

```html
<vue-number-input
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
</vue-number-input>
```

## LICENSE

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
