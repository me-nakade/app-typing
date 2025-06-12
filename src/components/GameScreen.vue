<template>
  <div class="game-screen">
    <h2>第{{ currentIndex + 1 }}問 / 全{{ questions.length }}問</h2>
    <div class="question">{{ currentQuestion }}</div>
    <input
      v-model="userInput"
      @keyup.enter="submit"
      :disabled="gameOver || finished"
      ref="input"
      type="text"
      autocomplete="off"
    />
    <div class="info">
      <span>得点: {{ score }}</span>
      <span>ミス: {{ mistakes }}/3</span>
      <span v-if="!gameOver && !finished">残り時間: {{ timeLeft }}秒</span>
    </div>
    <div v-if="gameOver || finished" class="overlay">
      <button @click="finish">結果を見る</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, computed, onMounted, onUnmounted } from 'vue'

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
const timeLeft = ref(15)
let timerId = null

const currentQuestion = computed(() => props.questions[currentIndex.value])

function startTimer() {
  clearTimer()
  timeLeft.value = 15
  timerId = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      timeout()
    }
  }, 1000)
}

function clearTimer() {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

function timeout() {
  // 時間切れはミスとしてカウントし、次の問題へ
  clearTimer()
  mistakes.value += 1
  if (mistakes.value >= 3) {
    gameOver.value = true
    userInput.value = ''
    return
  }
  next()
  userInput.value = ''
}

function submit() {
  if (gameOver.value || finished.value) return
  if (userInput.value === currentQuestion.value) {
    score.value += 10
    next()
  } else {
    mistakes.value += 1
    if (mistakes.value >= 3) {
      gameOver.value = true
    } else {
      next()
    }
  }
  userInput.value = ''
}

function next() {
  clearTimer()
  if (currentIndex.value < props.questions.length - 1) {
    currentIndex.value += 1
    nextTick(() => {
      //DOMの更新後に1度だけ実行
      startTimer()
      input.value && input.value.focus() //input.valueが存在する場合のみ、focus()メソッドを呼び出す
    })
  } else {
    finished.value = true
  }
}

function finish() {
  clearTimer()
  emit('finish', {
    score: score.value,
    mistakes: mistakes.value,
  })
}

watch([gameOver, finished], ([g, f]) => {
  if (g || f) {
    clearTimer()
  } else {
    nextTick(() => {
      input.value && input.value.focus()
    })
  }
})

//マウントされた直後に実行
onMounted(() => {
  startTimer()
  nextTick(() => input.value && input.value.focus())
})

//アンマウントされた直後に実行
onUnmounted(() => {
  clearTimer()
})
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
