<template>

<div class="sidebar ">
    
    
  <div class="flex items-center gap-x-4 gap-y-4">
    <h1 class="text-3xl gap-y-8">Fitness Planner</h1>
  </div>
    <br>
    <router-link v-if="user" class="link" :to="{name: 'Calendar' }">Calendar</router-link>
    <router-link class="link" :to="{name: 'Home' }">Home</router-link>
    <router-link v-if="user" class="link" :to="{name: 'Create' }">Plan Workouts</router-link>
    <router-link v-if="user" class="link" :to="{name: 'UserMetrics' }">Your Metrics</router-link>
    <router-link v-if="user" class="link" :to="{name: 'restrictions' }">Calorie Restrictions</router-link>
    <router-link v-if="!user" class="link" :to="{name: 'Login' }">Login</router-link>
    <li v-if='user' @click="logout" class="link">Logout</li>
</div>  


</template>

<script>
//<img class="w-14" src="../assets/images/dumbbell-light.png" alt=""> 
import store from '../store/index';
import { computed } from 'vue';
import {supabase} from '../supabase/init';
import { useRouter } from 'vue-router';
export default {
  setup() {
    // Get user from store
    const user = computed (() => store.state.user)
    // Setup ref to router
    const router = useRouter();
    // Logout function
    const logout = async() => {
      await supabase.auth.signOut();
      router.push({name: "Home"})
      //window.location.href = window.location.href;
    }
    return {logout, user};
  },
};
</script>
<style>
:root {
  --sidebar-bg-color: #49D8E3;
  --sidebar-item-hover: #188a94;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  width: 200px;
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;

  margin: 0.05em 0;
  padding: 2em;
  border-radius: 0.25em;
  height: 1.5em;

  color: white;
  text-decoration: none;
}
.link:hover {
  background-color: var(--sidebar-item-hover);
 
}

.link.active {
  background-color: var(--sidebar-item-active);
}
</style>