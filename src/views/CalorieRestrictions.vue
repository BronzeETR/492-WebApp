<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- App Msg -->
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 rounded-md shadow-md bg-at-sky-blue"
    >
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>
    <div
      class="flex flex-col p-4 rounded-md shadow-sm 
      bg-at-sky-blue relative"
    >
      <h1 class="text-3xl text-white mb-2">Calorie Restrictions</h1>
    </div>
    <div
      class="flex flex-col items-center p-4 rounded-md shadow-md 
      bg-light-grey relative"
    >
      <p class="text-lg text-at-dark-blue mb-2">To achive your weight goal within __ __
        you'll need to lose __ lbs a week
        you're going to want to maintaing a roughly ___ calorie __
        based on you're current activity level
        You'll need to consume less than ____ calories/day
      </p>
      <b class= "text-lg text-at-dark-blue mb-2">
        Healthly weight loss or gain takes time.
        Be sure to prioritize your nutrition over calorie restrictions
      </b>

      <button
        type="submit"
        class="mt-6 py-2 px-6 text-lg text-white text-white bg-at-sky-blue duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green"
      >
        Get Started
      </button>
    </div>

  </div>
</template>

<script>
export default {
  name: "restrictions",
  setup() {
    
    return {};
  },
};
</script>