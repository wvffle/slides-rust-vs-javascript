---
theme: seriph
background: ./rust-bg.jpg
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
lineNumbers: true
info: |
  ## JS, Rust, WASM
drawings:
  persist: false
css: unocss
---

# Wykorzystanie niskopoziomowych języków w stronach internetowych

Wprowadzenie do WebAssembly


<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/wvffle/slides-wasm" target="_blank" alt="GitHub"
    class="text-xl icon-btn opacity-50 !border-none !hover:text-white flex items-center">
    <carbon-logo-github class="mr-4 -mb-0.5" />
    Kasper Seweryn
  </a>
</div>
<!--
Jak zapewne niektórzy z was wiedzą, prócz bycia studentem PB, prowadzę także zajęcia z Programowania Aplikacji w Języku JavaScript, więc...
-->

---

# Podstawy JavaScriptu
Czym jest JavaScript?

<div v-click>
  <div class="flex justify-center">
    <img src="https://i.imgur.com/VbRKlnK.png" class="h-18" />
  </div>
</div>
<br>

<!--
Zaczynamy od podstaw JavaScriptu!

Kto wie czym jest JavaScript?
Otóż ChatGPT zapytany o to, odpowiada w taki sposób:

Zaimplementujmy sobie więc prostą, rekurencyjną funkcję fibonacciego

-->

---

# Podstawy JavaScriptu
Czym jest JavaScript?

  <div class="flex justify-center">
    <img src="https://i.imgur.com/VbRKlnK.png" class="h-18" />
  </div>
<br>


```js {all|1,4|2|3|all}
const fib = (n) => {
  if (n < 2) return 1
  return fib(n - 1) + fib(n - 2)
}
```


<div v-click>
  <img src="https://i.imgur.com/UsDW5tC.png" class="absolute h-2/3 top-0 bottom-0 left-0 right-0 m-auto border border-black transform rotate-5deg"/>
</div>

<!--
przedstawienie kodu

I nie, uprzedzając pytanie, ChatGPT wygenerował inny kod...
-->

---

# Czym za tym jest WebAssembly (WASM)?
Wprowadzenie do WebAssembly

> WebAssembly (skrótowo Wasm) to binarny format instrukcji dla stosowej maszyny wirtualnej. Wasm został zaprojektowany jako przenośny cel kompilacji dla języków programowania, umożliwiając ich wykorzystanie w aplikacjach klienckich i serwerowych dostępnych w internecie.

<p class="text-xs">Źródło: https://webassembly.org/</p>

---

# Jak więc będzie wyglądał podobny kod w WASM?
Podpowiedź: dosyć prosto <span v-click>...dla maszyny?</span>

<div v-after>

```wasm
(module
  (func $fib2 (param $n i32) (param $a i32) (param $b i32) (result i32)
    (if (result i32)
        (i32.eqz (local.get $n))
        (then (local.get $a))
        (else (call $fib2 (i32.sub (local.get $n)
                                   (i32.const 1))
                          (local.get $b)
                          (i32.add (local.get $a)
                                   (local.get $b))))))

  (func $fib (param i32) (result i32)
    (call $fib2 (local.get 0)
                (i32.const 0)  
                (i32.const 1)))

  (export "fib" (func $fib)))


```
</div>

<p v-click class="text-xs">Źródło: https://stackoverflow.com/a/53416725</p>

<!--
dosyć prosto ...dla maszyny?

Otóż okazuje się, że WebAssembly ma dwa formaty: tekstowy oraz binarny. To co tu widzimy, to jest format tekstowy, który ma być przyjazny użytkownikowi.

Oczywiście jak każdy dobry inżynier, źródło: StackOverflow
-->

---

# Dobrze, dobrze. Ale co z językami niskopoziomowymi?
I tutaj wkracza Rust!

<img src="https://searx.wvffle.net/image_proxy?url=https%3A%2F%2Fpresentations.bltavares.com%2Fnunca-ouvi-falar-de-rust%2Fferris.png&h=37d361ecbb0ac7b0d42725daf7b5015911cb94db9dc258f0b18858afe381dcd7" class="h-32 absolute right-0 top-0 rotate-14deg" />

Inicjalizacja projektu:

```sh {none|1|2|3|4}
$ cargo install wasm-pack
$ wasm-pack new fib
$ cd fib
$ nvim src/lib.rs
```

---

# Rust, Rust, Rust, ciągle ten Rust...
Tak. Rust.

<p class="text-xs">src/lib.rs</p>

```rs {none|4,10|5|6|7,9|8|5,7,9|6,8|1,3|all}
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fib(n: i32) -> i32 {
    if n < 2 {
        1
    } else {
        fib(n - 1) + fib(n - 2)
    }
}

```

Budujemy pakiet, który będziemy mogli wykorzystać w naszej aplikacji

```sh {none|1}
$ wasm-pack build
```


<!--
I tutaj niektórzy mogą powiedzieć "Rust, Rust, Rust, ciągle ten Rust..."

FN, IF, RET, ELSE, RET, IF EXPR, RET bez ;, MACRO
-->

---

# Sprawdźmy co wygenerował nam _wasm-pack build_

```sh
$ ls pkg/
fib_bg.js  fib_bg.wasm  fib_bg.wasm.d.ts  fib.d.ts  fib.js  package.json  README.md
```
<br>

<div v-click>
Ale co dalej?
</div>

<div v-click>
Importujemy w naszej aplikacji naszą funkcję i możemy z niej korzystać do woli!

```js
import { fib } from 'fib'

console.log(fib(8)) // 34
```
</div>

---

# Ale jakie są tego wszystkiego benefity?

<div class="grid grid-cols-2 gap-4">
<div>

## JavaScript

<Js />
</div>
<div>

## Rust (WASM)

<Rs />
</div>
<div v-click class="col-span-2">

## Benchmark
<Bench />
</div>
</div>

---

# Ograniczenie WebAssembly


<v-clicks>

- Brak bezpośredniego dostępu do API DOM. Istnieje możliwość wykorzystania odpowiednich interfejsów.
- Brak wsparcia w starszych przeglądarkach.
- Pobieranie dużych binarek do klienta.
- <s>Brak GC</s> Nie jest to problemem gdy używamy Rusta!

</v-clicks>

---

# Praktyczne zastosowania WebAssembly

<v-clicks>

- Wykorzystywanie gotowych rozwiązań do skomplikowanych działań, np: rekodowanie audio/video dzięki programowi _ffmpeg_
- Uruchamianie środowisk wykonujących JS, np _V8_ (_Wee8_), _JavaScriptCore_ (_JSC.js_)
- Wydajne, wieloplatformowe środowiska graficzne, np _egui_
- Wydajne (w przeciwieństwie do Reacta i Angulara) frameworki frontendowe. Np: Leptos, Dioxus (https://i.imgur.com/2Vqv8Cy.png)

</v-clicks>

---

# Interaktywne dema
- VIM - https://rhysd.github.io/vim.wasm/
- Audacity - https://wavacity.com/
- Linux - https://webvm.io/
- DOOM (Shareware) - https://silentspacemarine.com/
- Diablo 1 (Shareware) - https://d07riv.github.io/diabloweb/

---
layout: center
class: text-center
---
# Dziękuję za uwagę.