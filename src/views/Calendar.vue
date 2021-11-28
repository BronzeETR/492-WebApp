<template>
    <div>
        <flat-pickr v-model="date"></flat-pickr>
    </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
	name: 'calendar',
	setup() {
		return {
			date: null,
		}
	},
	components: {
		flatPickr
	}
}
</script>