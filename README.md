# @smartweb/vue-number-input

Vue component for numbers input.

-   Accessible: uses ARIA agreements
-   Use your keyboard to navigate and control
-   Use your mousewheel or touchpad to increase or descrease value

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
import VueNumberInput from '@smartweb/vue-number-input.vue';

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
import VueNumberInput from '@smartweb/vue-number-input.vue';
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

## LICENSE

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
