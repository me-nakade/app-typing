<template>
  <div>
    <TitleScreen v-if="screen === 'title'" @start="startGame" />
    <GameScreen v-else-if="screen === 'game'" @finish="finishGame" :questions="questions" />
    <ResultScreen
      v-else-if="screen === 'result'"
      :score="score"
      :maxScore="questions.length * 10"
      :mistakes="mistakes"
      @retry="retry"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TitleScreen from './components/TitleScreen.vue'
import GameScreen from './components/GameScreen.vue'
import ResultScreen from './components/ResultScreen.vue'

const screen = ref('title')
const score = ref(0)
const mistakes = ref(0)
// 出題リスト（編集可）
const questions = [
  'hello',
  'vuejs',
  'タイピング',
  'keyboard',
  'javascript',
  'component',
  'ゲーム',
  'challenge',
  'プログラミング',
  'finish',
]

function startGame() {
  score.value = 0
  mistakes.value = 0
  screen.value = 'game'
}

function finishGame(result) {
  score.value = result.score
  mistakes.value = result.mistakes
  screen.value = 'result'
}

function retry() {
  screen.value = 'title'
}
</script>
