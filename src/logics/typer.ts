import { ref } from 'vue'
import { sleep } from './showUp'

export const useTyper = (words) => {
  return {
    typer: ref(''),
    typeWords: async function () {
      await sleep(600)
      let i = 0
      const typeWord = async () => {
        for (let j = 0; j <= words[i].length; j++) {
          this.typer.value = words[i].slice(0, j)
          await sleep(75)
        }
        await sleep(1500)
        for (let j = words[i].length; j >= 0; j--) {
          this.typer.value = words[i].slice(0, j)
          await sleep(15)
        }
        await sleep(750)
      }
      while (true) {
        await typeWord()
        i++
        if (i === words.length) i = 0
      }
    }
  }
}
