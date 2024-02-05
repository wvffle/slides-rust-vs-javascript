<script setup lang="ts">
import { fib as rust } from "../pkg/fib.js"
import { inject, type Ref, ref, nextTick } from 'vue'
import { Bench } from 'tinybench'
import table from 'as-table'

const js = (n) => {
  if (n < 2) return 1
  return js(n - 1) + js(n - 2)
}

const n = inject('n') as Ref<number>
const result = ref('')
const time = ref('???')

const calculate = async () => {
  result.value = "Running benchmark..."
  await nextTick()
  
  requestAnimationFrame(async () => {
    const bench = new Bench()
      .add('JavaScript', () => {
        js(n.value)
      })
      .add('Rust (WASM)', () => {
        rust(n.value)
      })


    await bench.run()

    result.value = table(bench.table())
  })
}
</script>

<template>
  <input v-model.number="n" type="text" class="border border-black rounded-l-md px-4 mt-4" />
  <button @click="calculate" class="border border-black border-l-none rounded-r-md px-4 hover:bg-orange-100">Benchmark</button>
  <pre class="pt-4">{{ result }}</pre>
</template>