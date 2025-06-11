<template>
  <div class="result-screen">
    <h1>結果発表</h1>
    <p>
      スコア: <strong>{{ score }}</strong> / {{ maxScore }}
    </p>
    <p>ミス: {{ mistakes }} 回</p>
    <button @click="$emit('retry')">もう一度遊ぶ</button>
  </div>
</template>

<script setup>
const props = defineProps({
  score: Number,
  maxScore: Number,
  mistakes: Number,
})
</script>

<style scoped>
.result-screen {
  text-align: center;
  margin-top: 100px;
}
button {
  font-size: 2em;
  padding: 0.5em 2em;
  margin-top: 32px;
}
</style>
