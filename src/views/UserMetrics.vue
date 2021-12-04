<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>


    <div
      v-if="notEmpty"
      class="flex flex-col p-4 rounded-md shadow-md 
      bg-light-grey relative"
    >
    <h1 class="text-3xl text-at-dark-blue mb-4">Your Metrics</h1>
    <div class="text-at-dark-blue text-xl"> Your current weight: 
            <b class="text-at-dark-blue text-xl"> {{ data.currentWeight }} </b>
    </div>

    <div class="text-at-dark-blue text-xl"> Your target weight: 
            <b class="text-at-dark-blue text-xl"> {{ data.targetWeight }} </b>
    </div>

    <div class="text-at-dark-blue text-xl"> Target timeframe: 
            <b class="text-at-dark-blue text-xl"> {{ data.timeframeLength }} {{data.timeframeType}} </b>
    </div>
    <div class="text-at-dark-blue text-xl"> Your Height: 
            <b class="text-at-dark-blue text-xl"> {{ data.feet }} ft. {{data.inches}} in. </b>
    </div>
    <div class="text-at-dark-blue text-xl"> Your age: 
            <b class="text-at-dark-blue text-xl"> {{ data.age }} </b>
    </div>
    <div class="text-at-dark-blue text-xl"> Your sex: 
            <b class="text-at-dark-blue text-xl"> {{ data.sex }} </b>
    </div>
    <div class="text-at-dark-blue text-xl"> Your activity level: <b>{{data.activityLevel}} a week</b>
            <div class="text-at-dark-blue text-xl">
              <br>
    </div>
    <div class="text-at-dark-blue text-xl">
      <b class="text-at-dark-blue text-xl">If you would like to update your information click
        the button below and we will delete your previous information and allow you to re-enter it.
      </b>
    </div>
    <button
      @click="update"
        class="mt-6 py-2 px-6 rounded-sm self-start text-lg
      text-white bg-at-dark-blue duration-200 border-solid
      border-2 border-transparent hover:border-at-dark-blue hover:bg-white
      hover:text-at-dark-blue"
      >
        Update
      </button>
    </div>
    </div>
    <!-- Data Entry -->
    <form
      v-if="isEmpty"
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
    <div v-if="statusMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-text-at-dark-blue text-lg">{{ statusMsg }}</p>
    </div>
      <h1 class="text-3xl text-at-dark-blue mb-4">Enter Your Metrics</h1>
      <p class="mb-1 text-sm text-at-dark-blue">Calculations are done using the Harris-Benedict equation as a way to get your Basal Metobolic Rate to get a rough estimate of your maintance caloric requirements.</p>
      <div class="flex flex-col mb-2">
        <label for="weight" class="mb-1 text-md text-at-dark-blue">Current Weight</label>
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="currentWeight"
          v-model="currentWeight"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="targetWeight" class="mb-1 text-md text-at-dark-blue">Target Weight</label>
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="targetWeight"
          v-model="targetWeight"
        />
      </div>

      <div class="flex space-x-2">
          <div class="inline-block flex flex-col mb-1">
          <label for="timeframeLength" class="mb-1 text-md text-at-dark-blue">Target Timeframe</label>
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="timeframeLenght"
            v-model="timeframeLength"
          />
        </div>
        <div class="flex-1 space-y-1">
          <label for="timeframeType" class="mb-1 text-md text-at-dark-blue">Weeks or Months?</label>
          <br>
          <select
            id="timeframeType"
            class="p-2 text-gray-500 focus:outline-none"
            required
            v-model="timeframeType"
          >
            
            <option value="Weeks">Weeks</option>
            <option value="Months">Months</option>
          </select>

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
            id="inches"
            v-model="inches"
          />
        </div>
        <label for="inches" class="mb-1 text-sm text-at-dark-blue">In.</label>     
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
            <input type="radio" id="sex" @change="changeSex($event)" v-model="sex" name="sex" value="female" class="">
            <label for="female" class="mb-1 text-sm text-at-dark-blue">Female</label>
            <input type="radio" id="sex" @change="changeSex($event)" v-model="sex" name="sex" value="male" class="">
            <label for="male" class="mb-1 text-sm text-at-dark-blue">Male</label>
          </div>
        </div>
      </div>
      <div class="flex-1 space-y-1">
          <label for="activityLevel" class="mb-1 text-md text-at-dark-blue">Weekly Level of Activity?</label>
          <br>
          <select
            id="activityLevel"
            class="p-2 text-gray-500 focus:outline-none"
            required
            v-model="activityLevel"
          >
            
            <option value="Little or no Exercise">Little or no Exercise</option>
            <option value="30 Minutes moderate of training, 1 to 3 days">30 Minutes of moderate training, 1 to 3 days</option>
            <option value="Moderate 45 minutes of training, 3 to 5 days">45 minutes of moderate training, 3 to 5 days</option>
            <option value="1 hour of training, 6 to 7 days">1 hour of moderate training, 6 to 7 days</option>
          </select>

        </div>
      <button
      @click="createMetrics"
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-dark-blue duration-200 border-solid
      border-2 border-transparent hover:border-at-dark-blue hover:bg-white
      hover:text-at-dark-blue"
      >
        Submit
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
    // Create data
    const currentWeight = ref(null);
    const targetWeight = ref(null);
    const timeframeLength = ref("");
    const timeframeType = ref('weeks')
    const feet = ref(null);
    const inches = ref(null);
    const activityLevel = ref('months');
    const age = ref(null);
    let userSex = ref(null);
    const sex = ref(null);
    const statusMsg = ref(null);
    const errorMsg = ref(null);
    const isEmpty = ref(null)
    const notEmpty = ref(null)
    const data = ref(null)
    const router = useRouter();
    let activityAug = ""

    // Get Bio Metrics

    const getData = async () => {
      try {
        const { data: Metrics, error } = await supabase
          .from("Metrics")
          .select("*")
        if (error) throw error
        data.value = Metrics[0];
        console.log(data.value);
        if (data.value == null){
          isEmpty.value=true
          
        }else{
        notEmpty.value = true
        
      }
      } catch (error) {
        
        errorMsg.value = error.message;
        console.log(errorMsg.value)
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };
    getData()

    const update = async () => {
      isEmpty.value= true
      notEmpty.value=false
      try {
        const { error } = await supabase
          .from("Metrics")
          .delete('*');
        if (error) throw error;
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    }


    const changeSex = async (event) => {
      userSex = event.target.value;
      
    }
    // Create metrics
    const createMetrics = async () => {
      try {
        const userEmail = supabase.auth.user().email
        const { error } = await supabase.from("Metrics").insert([
          {
            email: userEmail,
            currentWeight: currentWeight.value,
            targetWeight: targetWeight.value,
            timeframeLength: timeframeLength.value,
            timeframeType: timeframeType.value,
            activityLevel: activityLevel.value,
            age: age.value,
            feet: feet.value,
            inches: inches.value,
            sex: userSex

          },
        ]);
        if (error) throw error;

        router.push({ name: "restrictions" });
        //window.location.reload()
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };

    return {
      currentWeight,
      targetWeight,
      age,
      feet,
      inches,
      sex,
      timeframeLength,
      activityLevel,
      statusMsg,
      errorMsg,
      timeframeType,
      createMetrics,
      changeSex,
      isEmpty,
      notEmpty,
      data,
      activityAug,
      update
    };
  },
};

</script>