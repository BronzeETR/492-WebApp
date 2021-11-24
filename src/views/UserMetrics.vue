<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Login -->
    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-dark-blue mb-4">Your Metrics</h1>

      <div class="flex flex-col mb-2">
        <label for="weight" class="mb-1 text-md text-at-dark-blue">Current Weight</label>
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="weight"
          v-model="weight"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="target" class="mb-1 text-md text-at-dark-blue">Target Weight</label>
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="target"
          v-model="target"
        />
      </div>

      <div class="flex space-x-2">
          <div class="inline-block flex flex-col mb-1">
          <label for="timeframe" class="mb-1 text-md text-at-dark-blue">Target Timeframe</label>
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="timeframe"
            v-model="timeframe"
          />
        </div>
        <div class="flex-1 space-y-1">
          <label for="timeframe" class="mb-1 text-md text-at-dark-blue">Weeks or Months?</label>
          <input list="time-options" id="time" name="time" class="p-2 text-gray-500 focus:outline-none" />

          <datalist id="time-options">
            <option value="Weeks"/>
            <option value="Months"/>
          </datalist>

        </div>
      </div>
      <label for="height" class="mb-1 text-md text-at-dark-blue">Height</label>
      <div class="flex space-x-2">
          <div class="inline-block flex flex-col mb-1">

            <input
              type="text"
              required
              class="p-1 text-gray-500 focus:outline-none"
              id="feet"
              v-model="feet"
            />
          </div>
          <label for="feet" class="mb-1 text-sm text-at-dark-blue">Ft.</label>        
        <div class="inline-block flex flex-col mb-1">
          <input
            type="text"
            required
            class="p-1 text-gray-500 focus:outline-none"
            id="feet"
            v-model="feet"
          />
        </div>
        <label for="feet" class="mb-1 text-sm text-at-dark-blue">In.</label>     
      </div>

      <div class="flex flex-col mb-4">
        <label for="activity-level" class="mb- text-md text-at-dark-blue">Exercise Frequency</label>
          <select id="activity-lvl" name="activity-lvl">
            <option value="lvl"></option>
            <option value="lvlzero"> Exercise Less Than 1 Time a Week</option>
            <option value="lvlone">Exercise 1-3 Times a Week</option>
            <option value="lvltwo">Exercise 3-5 Times a Week</option>
            <option value="lvlthree">Exercise 6-7 Times a Week</option>
          </select>
      </div>
      
      <div class="flex space-x-10">
          <div class="inline-block flex flex-col mb-1">
          <label for="age" class="mb-1 text-md text-at-dark-blue">Age</label>
          <input
            type="text"
            required
            class="p-1 text-gray-500 focus:outline-none"
            id="age"
            v-model="age"
          />
        </div>
        <div class="flex-1">
          <label for="sex" class="mb-1 text-md text-at-dark-blue">Sex:</label>
          <div class="flex-1 space-x-1">
            <input type="radio" id="female" name="sex" value="female" class="">
            <label for="female" class="mb-1 text-sm text-at-dark-blue">Female</label>
            <input type="radio" id="male" name="sex" value="male" class="">
            <label for="male" class="mb-1 text-sm text-at-dark-blue">Male</label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-sky-blue duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green"
      >
        Next
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
export default {
  name: "usermetrics",
  setup() {
    // Create data / vars
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const errorMsg = ref(null);
    // Login function
    const login = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push({ name: "Home" });
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };
    return { email, password, errorMsg, login };
  },
};
</script>