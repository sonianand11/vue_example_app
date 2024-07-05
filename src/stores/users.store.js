import { defineStore } from 'pinia'

import { httpRequest } from '@/helpers'
import { useAuthStore, useAlertStore } from '@/stores'
import { router } from '@/router'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: [],
    user: {}
  }),
  actions: {
    async register(user) {
      var alertStore = useAlertStore();
      var message = ''
      await httpRequest.post(`${baseUrl}`, user).then((res) => {
        this.users = res.data
        router.push('/users')
        message = res.data.message
        alertStore.success(message)
      }).catch(function (error) {
        message = error.response.data.errors.join(", ")
        alertStore.error(message)
      })
    },
    async getAll() {
      var alertStore = useAlertStore();

      this.users = { loading: true }
      var message = ''

      await httpRequest.get(baseUrl).then((res) => {
        this.users = res.data
      }).catch(function (error) {
        message = error.response.data.errors.join(", ")
        alertStore.error(message)
      })
    },
    async getById(id) {
      var alertStore = useAlertStore();
      var message = ''

      this.user = {loading: true}
      await httpRequest.get(`${baseUrl}/${id}`).then((res) => {
        this.user = res.data
      }).catch(function (error) {
        message = error.response.data.errors.join(", ")
        alertStore.error(message)
      })
      
    },
    async update(id, params) {
      var authStore = useAuthStore()
      var alertStore = useAlertStore();

      var message = ''

      await httpRequest.put(`${baseUrl}/${id}`, params).then((res) => {
        this.user = res.data.user
        if (id === authStore.user.id) {
          authStore.user = { ...authStore.user, ...params }
        }
        router.push('/users')
        message = res.data.message
        alertStore.success(message)
      }).catch(function (error) {
        message = error.response.data.errors.join(", ")
        alertStore.error(message)
      })

    },
    async delete(id) {
      var alertStore = useAlertStore();
      var authStore = useAuthStore()
      var message = ''
      // add isDeleting prop to user being deleted
      this.users.find((x) => x.id === id).isDeleting = true

      await httpRequest.delete(`${baseUrl}/${id}`).then((res) => {

        // remove user from list after deleted
        this.users = this.users.filter((x) => x.id !== id)
        // auto logout if the logged in user deleted their own record
        if (id === authStore.user.id) {
          authStore.logout()
        }

        router.push('/users')
        message = res.data.message
        alertStore.success(message)
      }).catch(function (error) {
        message = error.response.data.errors.join(", ")
        alertStore.error(message)
      })

    }
  }
})
