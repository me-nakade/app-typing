<template>
  <div class="game-screen">
    <h2>第{{ currentIndex + 1 }}問 / 全{{ questions.length }}問</h2>
    <div class="question">{{ currentQuestion }}</div>
    <input
      v-model="userInput"
      @keyup.enter="submit"
      :disabled="gameOver"
      ref="input"
      type="text"
      autocomplete="off"
    />
    <div class="info">
      <span>得点: {{ score }}</span>
      <span>ミス: {{ mistakes }}/3</span>
    </div>
    <div v-if="gameOver || finished" class="overlay">
      <button @click="finish">結果を見る</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, computed } from 'vue'
const props = defineProps({
  questions: Array,
})
const emit = defineEmits(['finish'])
const currentIndex = ref(0)
const score = ref(0)
const mistakes = ref(0)
const userInput = ref('')
const finished = ref(false)
const gameOver = ref(false)
const input = ref(null)

const currentQuestion = computed(() => props.questions[currentIndex.value])

function submit() {
  if (gameOver.value || finished.value) return
  if (userInput.value === currentQuestion.value) {
    score.value += 10
    next()
  } else {
    mistakes.value += 1
    if (mistakes.value >= 3) {
      gameOver.value = true
    }
  }
  userInput.value = ''
}

function next() {
  if (currentIndex.value < props.questions.length - 1) {
    currentIndex.value += 1
  } else {
    finished.value = true
  }
}

function finish() {
  emit('finish', {
    score: score.value,
    mistakes: mistakes.value,
  })
}

watch([gameOver, finished], ([g, f]) => {
  if (g || f) {
    // 入力を無効化
  } else {
    nextTick(() => input.value && input.value.focus())
  }
})

nextTick(() => input.value && input.value.focus())
</script>

<style scoped>
.game-screen {
  text-align: center;
  margin-top: 50px;
}
.question {
  font-size: 2em;
  margin: 32px 0 20px;
  letter-spacing: 0.1em;
}
input[type='text'] {
  font-size: 1.5em;
  padding: 0.3em 1em;
  margin-bottom: 20px;
  width: 50%;
}
.info {
  margin: 16px 0;
  font-size: 1.2em;
  display: flex;
  gap: 2em;
  justify-content: center;
}
.overlay {
  margin-top: 32px;
}
button {
  font-size: 1.3em;
  padding: 0.4em 2em;
}
</style>
