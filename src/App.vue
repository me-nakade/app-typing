<template>
  <div>
    <TitleScreen v-if="screen === 'title'" @start="goToSelectDifficulty" />
    <SelectDifficulty v-else-if="screen === 'select'" @select="startGame" />
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
import SelectDifficulty from './components/SelectDifficulty.vue'
import GameScreen from './components/GameScreen.vue'
import ResultScreen from './components/ResultScreen.vue'

const screen = ref('title')
const score = ref(0)
const mistakes = ref(0)
const questions = ref([])

/*
// 出題リスト（編集可）
const questions = [
  'hello',
  'keyboard',
  '泰然自若',
  'javascript',
  '国内総生産',
  'No sweet without sweat',
  '光より速いのは、人の噂だけ',
  '関係者を装う者ほど、大して関係ないものだ',
  '笑顔は笑顔である、引きつっていても',
  'The early bird catches the worm',
]
  */

const easyQuestions = [
  'cat',
  'dog',
  'apple',
  'book',
  'hello',
  'sun',
  'star',
  'milk',
  'blue',
  'cake',
  'tree',
  'fish',
  'bird',
  'pen',
  'desk',
  'chair',
  'car',
  'bus',
  'train',
  'phone',
  'cup',
  'hat',
  'shoe',
  'door',
  'window',
  'river',
  'mountain',
  'flower',
  'grass',
  'cloud',
]
const normalQuestions = [
  'javascript',
  'component',
  'プログラミング',
  'challenge',
  'キーボード',
  'difficulty',
  'synchronize',
  'functionality',
  'タイピングゲーム',
  'encyclopedia',
  'algorithm',
  'asynchronous',
  'optimization',
  'architecture',
  'internationalization',
  'localization',
  '泰然自若',
  'アクセシビリティ',
  '定例会議',
  'ハンドレタリング',
  '社員行動規範',
  'identify',
  '内閣総理大臣官邸',
  'インタフェース',
  'コンピュータグラフィックス',
  '国内総生産',
  'デフォルトゲートウェイ',
  'elephant',
  'fundamental',
  'international',
]

const hardQuestions = [
  '義務とは、したくないことをすること',
  '有名人に友達はいません、代わりにマネージャーがいます',
  '気を付けろ、あれは野生のお猿だ',
  'No sweet without sweat',
  '光より速いのは、人の噂だけ',
  '関係者を装う者ほど、大して関係ないものだ',
  '笑顔は笑顔である、引きつっていても',
  'The early bird catches the worm',
  '良いものは見た目でなく、理解によって知るもの',
  'Too many cooks spoil the broth',
  'Misfortunes never come singly',
  'There is no limit to excellence',
  '一度に百の死を嘆くのは難しい',
  'Strike the iron while it is hot',
  'An eye for an eye, a tooth for a tooth',
  'The eyes are the windows of the soul',
  '高いものを食べても腹は減る',
  '実力テストで分かるのは、一夜漬けの底力',
  'As different as chalk and cheese',
  'すぐに良くなる、こんなに素敵なレントゲン写真を撮ったから',
  '本当のことを信じられない人もいる',
  'Politeness is not just for strangers',
  'Sleep and wait for good luck',
  'やっぱり無理だね、正しい生活',
  'カレー風はカレーにあらず、手作り風は手作りにあらず',
  'Liars should have good memories',
  '仕事の量とカフェイン摂取量は比例する',
  'Fortune comes in at the merry gate',
  '最近、喜劇の面をどこかに落としてしまったようだ',
  'パスを要求する人ほど、ボールを回さない',
]

function goToSelectDifficulty() {
  screen.value = 'select'
}

function getRandomQuestions(array) {
  array.sort(() => Math.random() - 0.5) // 配列をシャッフル
  //console.log(array)
  return array.slice(0, 10) // 最初の10個を返す
}

function startGame(level) {
  score.value = 0
  mistakes.value = 0
  if (level === 'easy') {
    questions.value = getRandomQuestions(easyQuestions)
  } else if (level === 'normal') {
    questions.value = getRandomQuestions(normalQuestions)
  } else {
    questions.value = getRandomQuestions(hardQuestions)
  }
  //questions.value = level === 'easy' ? easyQuestions : hardQuestions
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
