import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TitleScreen from '../components/TitleScreen.vue'

describe('TitleScreen.vue', () => {
  it('タイトルが表示される', () => {
    const wrapper = mount(TitleScreen)
    expect(wrapper.find('h1').text()).toBe('タイピングゲーム')
  })

  it('説明リストが3つ表示される', () => {
    const wrapper = mount(TitleScreen)
    const items = wrapper.findAll('.instructions li')
    expect(items.length).toBe(3)
    expect(items[0].text()).toContain('表示される文字列と同じように入力しましょう')
    expect(items[1].text()).toContain('「。」や「.」は不要です')
    expect(items[2].text()).toContain('入力し終えたら、力強くエンターキーを押しましょう')
  })

  it('スタートボタンが表示される', () => {
    const wrapper = mount(TitleScreen)
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('スタート')
  })

  it('スタートボタンをクリックするとstartイベントがemitされる', async () => {
    const wrapper = mount(TitleScreen)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('start')).toBeTruthy()
    expect(wrapper.emitted('start').length).toBe(1)
  })

  it('スナップショットが一致する', () => {
    const wrapper = mount(TitleScreen)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
