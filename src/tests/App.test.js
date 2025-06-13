import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {
  it('初期状態でTitleScreenが表示される', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent({ name: 'TitleScreen' }).exists()).toBe(true)
    expect(wrapper.vm.screen).toBe('title')
  })

  it('startイベントでSelectDifficultyに遷移する', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent({ name: 'TitleScreen' }).vm.$emit('start')
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'SelectDifficulty' }).exists()).toBe(true)
    expect(wrapper.vm.screen).toBe('select')
  })

  it('selectイベントでGameScreenに遷移し、easyで10問出題', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent({ name: 'TitleScreen' }).vm.$emit('start')
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'SelectDifficulty' }).vm.$emit('select', 'easy')
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'GameScreen' }).exists()).toBe(true)
    expect(wrapper.vm.screen).toBe('game')
    expect(wrapper.vm.questions.length).toBe(10)
    // easyQuestionsから出題されているか
    const easySet = new Set([
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
    ])
    expect(wrapper.vm.questions.every((q) => easySet.has(q))).toBe(true)
  })

  it('selectイベントでGameScreenに遷移し、normalで10問出題', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent({ name: 'TitleScreen' }).vm.$emit('start')
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'SelectDifficulty' }).vm.$emit('select', 'normal')
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'GameScreen' }).exists()).toBe(true)
    expect(wrapper.vm.screen).toBe('game')
    expect(wrapper.vm.questions.length).toBe(10)
    // normalQuestionsから出題されているか
    const normalSet = new Set([
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
    ])
    expect(wrapper.vm.questions.every((q) => normalSet.has(q))).toBe(true)
  })

  it('selectイベントでGameScreenに遷移し、hardで10問出題', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent({ name: 'TitleScreen' }).vm.$emit('start')
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'SelectDifficulty' }).vm.$emit('select', 'hard')
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'GameScreen' }).exists()).toBe(true)
    expect(wrapper.vm.screen).toBe('game')
    expect(wrapper.vm.questions.length).toBe(10)
    // hardQuestionsから出題されているか
    const hardSet = new Set([
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
    ])
    expect(wrapper.vm.questions.every((q) => hardSet.has(q))).toBe(true)
  })

  it('finishイベントでResultScreenに遷移し、スコア・ミス・maxScoreが渡る', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent({ name: 'TitleScreen' }).vm.$emit('start')
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'SelectDifficulty' }).vm.$emit('select', 'easy')
    await wrapper.vm.$nextTick()
    await wrapper
      .findComponent({ name: 'GameScreen' })
      .vm.$emit('finish', { score: 80, mistakes: 1 })
    await wrapper.vm.$nextTick()
    const resultScreen = wrapper.findComponent({ name: 'ResultScreen' })
    expect(resultScreen.exists()).toBe(true)
    expect(resultScreen.props('score')).toBe(80)
    expect(resultScreen.props('mistakes')).toBe(1)
    expect(resultScreen.props('maxScore')).toBe(100)
    expect(wrapper.vm.screen).toBe('result')
  })

  it('retryイベントでTitleScreenに戻る', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent({ name: 'TitleScreen' }).vm.$emit('start')
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'SelectDifficulty' }).vm.$emit('select', 'easy')
    await wrapper.vm.$nextTick()
    await wrapper
      .findComponent({ name: 'GameScreen' })
      .vm.$emit('finish', { score: 50, mistakes: 2 })
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'ResultScreen' }).vm.$emit('retry')
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'TitleScreen' }).exists()).toBe(true)
    expect(wrapper.vm.screen).toBe('title')
  })
})
