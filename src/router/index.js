// ################################################################
import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/init";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Create from "../views/Create.vue";
import ViewWorkout from "../views/ViewWorkout.vue";
import Metrics from "../views/UserMetrics.vue";
import CalorieRestrictions from "../views/CalorieRestrictions.vue"
import Calendar from "../views/Calendar.vue"
// import CheckMetrics from "../views/CheckMetrics.vue"

const routes = [

    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: "Home",
            auth: false,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: "Login",
            auth: false,
        },
    },
    {
        path: "/usermetrics",
        name: "UserMetrics",
        component: Metrics,
        meta: {
            title: "Metrics",
            auth: true
        },
    },
 
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            title: "Register",
            auth: false,
        },
    },
    {
        path: "/create",
        name: "Create",
        component: Create,
        meta: {
            title: "Create",
            auth: true,
        },
    },
    {
        path: "/view-workout/:workoutId",
        name: "View-Workout",
        component: ViewWorkout,
        meta: {
            title: "View Workout",
            auth: true,
        },
    },
    {
        path: "/calorie-restrictions",
        name: "restrictions",
        component: CalorieRestrictions,
        meta: {
            title: "Calorie Restrictions",
            auth: true,
        },
    },
    {
        path: "/calendar",
        name: "Calendar",
        component: Calendar,
        meta: {
            title: "Calendar",
            auth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Active Tracker`;
    next();
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
    const user = supabase.auth.user();
    if (to.matched.some((res) => res.meta.auth)) {
        if (user) {
            next();
            return;
        }
        next({ name: "Login" });
        return;
    }
    next();
});

export default router;