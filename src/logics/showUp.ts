import { ref } from 'vue'

export function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export const useShowUp = (length: number, delay: number) => {
  return {
    opacities: ref(new Array(length).fill(0)),
    translations: ref(new Array(length).fill(30)),
    translate: async function () {
      await sleep(500)
      for (let i = 0; i < length; i++) {
        this.opacities.value[i] = 1
        this.translations.value[i] = 0
        await sleep(delay)
      }
    }
  }
}
