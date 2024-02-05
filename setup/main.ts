import { defineAppSetup } from '@slidev/types'
import { ref } from 'vue'

export default defineAppSetup(({ app, router }) => {
  app.provide('n', ref(32))
})
