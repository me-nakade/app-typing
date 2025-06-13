// src/components/test_SelectDifficulty.vue
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectDifficulty from '../components/SelectDifficulty.vue'

describe('SelectDifficulty.vue', () => {
  it('タイトルが表示される', () => {
    const wrapper = mount(SelectDifficulty)
    expect(wrapper.find('h1').text()).toBe('難易度を選択してください')
  })

  it('3つの難易度ボタンが表示される', () => {
    const wrapper = mount(SelectDifficulty)
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(3)
    expect(buttons[0].text()).toBe('かんたん')
    expect(buttons[1].text()).toBe('ふつう')
    expect(buttons[2].text()).toBe('むずかしい')
  })

  it('かんたんボタンをクリックするとselectイベントがeasyでemitされる', async () => {
    const wrapper = mount(SelectDifficulty)
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')[0]).toEqual(['easy'])
  })

  it('ふつうボタンをクリックするとselectイベントがnormalでemitされる', async () => {
    const wrapper = mount(SelectDifficulty)
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')[0]).toEqual(['normal'])
  })

  it('むずかしいボタンをクリックするとselectイベントがhardでemitされる', async () => {
    const wrapper = mount(SelectDifficulty)
    await wrapper.findAll('button')[2].trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')[0]).toEqual(['hard'])
  })
})
