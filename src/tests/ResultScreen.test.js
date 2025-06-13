// src/components/test_ResultScreen.vue
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResultScreen from '../components/ResultScreen.vue'

describe('ResultScreen.vue', () => {
  it('タイトルが表示される', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 50, maxScore: 100, mistakes: 2 },
    })
    expect(wrapper.find('h1').text()).toBe('結果発表')
  })

  it('スコアとミス回数が正しく表示される', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 70, maxScore: 100, mistakes: 1 },
    })
    expect(wrapper.find('.result').text()).toContain('スコア: 70 / 100')
    expect(wrapper.find('.result').text()).toContain('ミス: 1 回')
  })

  it('スコア80以上で「よくできました」メッセージ', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 85, maxScore: 100, mistakes: 0 },
    })
    expect(wrapper.find('.result').text()).toContain('よくできました')
  })

  it('スコア60以上80未満で「いい感じ」メッセージ', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 65, maxScore: 100, mistakes: 1 },
    })
    expect(wrapper.find('.result').text()).toContain('いい感じ')
  })

  it('スコア40以上60未満で「まあまあ」メッセージ', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 45, maxScore: 100, mistakes: 2 },
    })
    expect(wrapper.find('.result').text()).toContain('まあまあまあまあ')
  })

  it('スコア40未満で「次は頑張ろう」メッセージ', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 30, maxScore: 100, mistakes: 3 },
    })
    expect(wrapper.find('.result').text()).toContain('次は頑張ろう')
  })

  it('「もう一度遊ぶ」ボタンが表示される', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 50, maxScore: 100, mistakes: 2 },
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('もう一度遊ぶ')
  })

  it('「もう一度遊ぶ」ボタンをクリックするとretryイベントがemitされる', async () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 50, maxScore: 100, mistakes: 2 },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('retry')).toBeTruthy()
    expect(wrapper.emitted('retry').length).toBe(1)
  })
})
