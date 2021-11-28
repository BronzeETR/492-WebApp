<template>
    <section>
        <div class="max-w-screen-md mx-auto px-4 py-10">
            <label>Select a date</label>
            <div class="max-w-screen-md mx-auto px-4 py-10">
                <flat-pickr
                    v-model="date"
                    :config="config"
                    class="form-control"
                    placeholder="Select date"
                    name="date"/>
                <div class="input-group-append">
                    <button class="btn btn-default" type="button" title="Toggle" data-toggle>
                        <i class="fa fa-calendar">
                            <span aria-hidden="true" class="sr-only">Toggle</span>
                        </i>
                    </button>
                    <button class="btn btn-default" type="button" title="Clear" data-clear>
                        <i class="fa fa-times">
                            <span aria-hidden="true" class="sr-only">Clear</span>
                        </i>
                    </button>
                </div>
            </div>
        </div>
		<div class="max-w-screen-md mx-auto px-4 py-10">
        <pre>Selected date is - {{date}}</pre>
		</div>
    </section>
</template>

<script>
    // bootstrap is just for this example
    import 'bootstrap/dist/css/bootstrap.css';
    // import this component
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    // theme is optional
    // try more themes at - https://flatpickr.js.org/themes/
    import 'flatpickr/dist/themes/material_blue.css';
    // localization is optional
    //import {English} from 'flatpickr/dist/l10n/hi.js';

    export default {
        name: 'calendar',
        data() {
            return {
                // Initial value can be a date object as well
                date: '2020-10-16',
                // Get more form https://flatpickr.js.org/options/
                config: {
                    wrap: true, // set wrap to true only when using 'input-group'
                    altFormat: 'M j, Y',
                    altInput: true,
                    dateFormat: 'Y-m-d'
                    //          
                },
            }
        },
        components: {
            flatPickr
        },
    }
</script>