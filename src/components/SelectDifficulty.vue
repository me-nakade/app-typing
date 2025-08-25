<template>
  <div class="select-difficulty">
    <h1>難易度を選択してください</h1>
    <button @click="select('easy')">かんたん</button>
    <button @click="select('normal')">ふつう</button>
    <button @click="select('hard')">むずかしい</button>
  </div>
</template>

<script setup>
const emit = defineEmits(['select'])
function select(level) {
  emit('select', level)
}
</script>

<style scoped>
.select-difficulty {
  text-align: center;
  margin-top: 100px;
}
button {
  font-size: 2em;
  padding: 0.5em 2em;
  margin: 1em;
}
</style>
