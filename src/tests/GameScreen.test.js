import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import GameScreen from '../components/GameScreen.vue'

const questions = ['apple', 'banana', 'cherry']

describe('GameScreen.vue', () => {
  let wrapper

  beforeEach(() => {
    vi.useFakeTimers()
    wrapper = mount(GameScreen, {
      props: { questions },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    wrapper.unmount()
  })

  it('初期状態で1問目・得点0・ミス0・残り時間15秒', () => {
    expect(wrapper.find('h2').text()).toContain('第1問')
    expect(wrapper.find('.question').text()).toBe('apple')
    expect(wrapper.find('.info').text()).toContain('得点: 0')
    expect(wrapper.find('.info').text()).toContain('ミス: 0/3')
    expect(wrapper.find('.info').text()).toContain('残り時間: 15秒')
    expect(wrapper.find('input[type="text"]').attributes('disabled')).toBeUndefined()
  })

  it('正解を入力してEnterで得点が加算され次の問題へ', async () => {
    await wrapper.find('input').setValue('apple')
    await wrapper.find('input').trigger('keyup.enter')
    expect(wrapper.vm.score).toBe(10)
    expect(wrapper.vm.currentIndex).toBe(1)
    expect(wrapper.find('.question').text()).toBe('banana')
  })

  it('不正解を入力してEnterでミスが加算される', async () => {
    await wrapper.find('input').setValue('wrong')
    await wrapper.find('input').trigger('keyup.enter')
    expect(wrapper.vm.mistakes).toBe(1)
    expect(wrapper.vm.currentIndex).toBe(1)
  })

  it('3回ミスするとgameOverになり入力欄が無効化される', async () => {
    for (let i = 0; i < 3; i++) {
      await wrapper.find('input').setValue('wrong')
      await wrapper.find('input').trigger('keyup.enter')
    }
    expect(wrapper.vm.gameOver).toBe(true)
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.overlay').exists()).toBe(true)
  })

  it('残り時間が0になると自動でミスが加算される', async () => {
    expect(wrapper.vm.timeLeft).toBe(15)
    vi.advanceTimersByTime(15000)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.mistakes).toBe(1)
    expect(wrapper.vm.currentIndex).toBe(1)
  })

  it('全問終了でfinishedになる', async () => {
    // 1問目正解
    await wrapper.find('input').setValue('apple')
    await wrapper.find('input').trigger('keyup.enter')
    // 2問目正解
    await wrapper.find('input').setValue('banana')
    await wrapper.find('input').trigger('keyup.enter')
    // 3問目正解
    await wrapper.find('input').setValue('cherry')
    await wrapper.find('input').trigger('keyup.enter')
    expect(wrapper.vm.finished).toBe(true)
    expect(wrapper.find('.overlay').exists()).toBe(true)
  })

  it('「結果を見る」ボタンでfinishイベントがemitされる', async () => {
    // 全問終了状態にする
    wrapper.vm.finished = true
    await wrapper.vm.$nextTick()
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('finish')).toBeTruthy()
    const event = wrapper.emitted('finish')[0][0]
    expect(event).toHaveProperty('score')
    expect(event).toHaveProperty('mistakes')
  })
})
