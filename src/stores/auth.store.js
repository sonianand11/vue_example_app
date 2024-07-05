import { defineStore } from "pinia";

import { httpRequest } from "@/helpers";
import { router } from "@/router";
import { useAlertStore } from "@/stores";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(email, password) {
      try {
        var userData = {
          email: email,
          password: password,
        };
        const responseData = await httpRequest.post(
          `${baseUrl}/auth/login`,
          userData
        );
        console.log("Success", responseData.data);
        // update pinia state
        this.user = responseData.data;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(this.user));
        console.log("Success", responseData.data);
        // redirect to previous url or default to home page
        router.push(this.returnUrl || "/");
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    logout() {
			console.log("Logging out...")
      this.user = null;
      localStorage.removeItem("user");
      router.push("/account/login");
    },
  },
});
