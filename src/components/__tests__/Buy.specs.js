import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardItem from '@/components/Item/index.vue'
import { vi } from 'vitest';

describe('CardItem', () => {
  it('calls buyItem with correct arguments when Buy Now button is clicked', async () => {
    const buyItemMock = vi.fn()

    const wrapper = mount(CardItem, {
      props: {
        id: '1',
        label: 'Test Item',
        desc: 'Delicious test item',
        img: 'test.jpg',
        buyItem: buyItemMock
      }
    })

    await wrapper.find('button').trigger('click')

    expect(buyItemMock).toHaveBeenCalledWith('1', 'Test Item', 'Delicious test item', 'test.jpg')
  })
})
