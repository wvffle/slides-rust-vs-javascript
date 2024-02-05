<script setup lang="ts">
import { fib } from "../pkg/fib.js"
import { inject, type Ref, ref } from 'vue'

const n = inject('n') as Ref<number>
const result = ref('???')
const time = ref('???')

const calculate = () => {
  const then = performance.now()
  result.value = fib(n.value)
  time.value = (performance.now() - then).toFixed(2)
}
</script>

<template>
  <pre class="py-4">fib({{n}}) = {{ result }} // time: {{ time }}ms</pre>
  <input v-model.number="n" type="text" class="border border-black rounded-l-md px-4" />
  <button @click="calculate" class="border border-black border-l-none rounded-r-md px-4 hover:bg-orange-100">Calculate</button>
</template>