import { ref } from 'vue'
import { sleep } from './showUp'

const words = ['写点什么。', '漫游。', '北京胡同。', '第五和第七大道。']

export const useTyper = () => {
  return {
    typer: ref(''),
    typeWords: async function () {
      await sleep(600)
      let i = 0
      const typeWord = async () => {
        for (let j = 0; j <= words[i].length; j++) {
          this.typer.value = words[i].slice(0, j)
          await sleep(90)
        }
        await sleep(1500)
        for (let j = words[i].length; j >= 0; j--) {
          this.typer.value = words[i].slice(0, j)
          await sleep(45)
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
