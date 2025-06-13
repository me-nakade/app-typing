<template>
  <div class="result-screen">
    <h1>結果発表</h1>
    <div class="result">
      <p>
        スコア: <strong>{{ score }}</strong> / {{ maxScore }}
      </p>
      <p>ミス: {{ mistakes }} 回</p>
      <p v-if="score >= 80">☺️破顔一笑、よくできました！☺️</p>
      <p v-else-if="score >= 60 && score < 80">🙂いい感じ！🙂</p>
      <p v-else-if="score >= 40 && score < 60">😑まあまあまあまあ…😑</p>
      <p v-else-if="score < 40">😥次は頑張ろう😥</p>
    </div>
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

.result {
  font-size: 20px;
}
</style>
