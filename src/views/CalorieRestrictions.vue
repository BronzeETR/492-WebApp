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
      <p id="display" class="text-lg text-at-dark-blue mb-2">To achive your weight goal within <span id="time" class="font-bold"></span> <span id="type" class="font-bold"></span>
        you'll need to lose <span id='poundsPW' class="font-bold"></span> lbs a week.
        You're going to want to be maintaing a roughly <span id="defic" class="font-bold"></span> calorie deficit
        based on you're current activity level.
        You'll need to no more than <span id="restriction" class="font-bold"></span> calories/day
      </p>
      <b id='bold' class= "text-lg text-at-dark-blue mb-2">
        Healthly weight loss or gain takes time.
        Be sure to prioritize your nutrition over calorie restrictions
      </b>

      <button
        v-if="notEmpty"
        @click="toHome"
        class="mt-6 py-2 px-6 text-lg text-white text-white bg-at-dark-blue duration-200 border-solid
      border-2 border-transparent hover:border-at-dark-blue hover:bg-white
      hover:text-at-dark-blue"
      >
        Get Started
      </button>

      <button
        v-if="isEmpty"
        @click="toMetrics"
        class="mt-6 py-2 px-6 text-lg text-white text-white bg-at-dark-blue duration-200 border-solid
      border-2 border-transparent hover:border-at-dark-blue hover:bg-white
      hover:text-at-dark-blue"
      >
        Enter Metrics!
      </button>
    </div>
   

      
    
   

  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
export default {
  name: "restrictions",
  setup() {
    // Outputs
    const router = useRouter()
    let poundsPW = 0
    let dailyDef = 0
    let restriction = 0
    let poundsToLose = 0
    let weeks = 0
    let heightInCentimeters = 0
    let weightInKilo = 0
   
    


    // Data needed for calculations
    const data = ref(null);
    const notEmpty = ref(null)
    const errorMsg = ref(null);
    const isEmpty = ref(null)
    // get imformation from supabase
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
          document.getElementById('display').innerHTML ="It Looks like you haven't entered the metrics we need to calculate your restrictions."
          document.getElementById('bold').innerHTML=""
        }else{
          notEmpty.value = true
          calculateRestrictions()
          displayResults()}
        
      } catch (error) {
        
        errorMsg.value = error.message;
        console.log(errorMsg.value)
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };
    getData()
    
    const calculateRestrictions = async () =>{
      heightInCentimeters = (30.48*(parseInt(data.value.feet)) + 2.54*(parseInt(data.value.inches)))
      weightInKilo = parseInt(data.value.currentWeight)/2.205
    
      let activityAug = 1
      let sexAug = 1
      let maintain = 0


      if (data.value.activityLevel === "Little or no Exercise"){
        activityAug = 1.200
      }
      else if (data.value.activityLevel === "30 Minutes moderate of training, 1 to 3 days"){
        activityAug = 1.375
      }
      else if (data.value.activityLevel === "Moderate 45 minutes of training, 3 to 5 days"){
        activityAug = 1.550
      }
      else{
        activityAug = 1.725
      }

      if (data.value.sex === "male"){
        sexAug = 5
      }
      else{
        sexAug = -161
      }
      maintain = (10*weightInKilo + 6.25 * heightInCentimeters - 5*data.value.age + sexAug) * activityAug
      
      if (data.value.timeframeType === "Months"){
        weeks = parseInt(data.value.timeframeLength) * 4
      }else{
        weeks = parseInt(data.value.timeframeLength)
      }

      poundsToLose = parseInt(data.value.currentWeight) - parseInt(data.value.targetWeight)
      poundsPW = poundsToLose / weeks
      dailyDef = maintain - (500 * poundsPW)
      restriction = maintain - (maintain - (500 * poundsPW))
      
    }
    
    const displayResults = async () =>{
      document.getElementById('poundsPW').innerHTML = poundsPW.toFixed(2)
      document.getElementById('time').innerHTML = data.value.timeframeLength
      document.getElementById('type').innerHTML = data.value.timeframeType
      document.getElementById('defic').innerHTML = restriction.toFixed(1)
      document.getElementById('restriction').innerHTML = dailyDef.toFixed(1)
    }
    const toHome = async () => {
      router.push({ name: "Home" });
    }
    const toMetrics = async () => {
      router.push({ name: "UserMetrics" });
    }  
    return {toHome,notEmpty,toMetrics,isEmpty};
  },
};
</script>