const CONFIG_URL = "https://raw.githubusercontent.com/pchuri/scriptable-words-test/main/config.json"
main()

async function getConfig() {
  let req = new Request(CONFIG_URL)
  return await req.loadJSON()
}

async function getWords() {
  let config = await getConfig()
  let req = new Request(config.wordsUrl)
  return await req.loadString()
}

async function main() {
  let raws = await getWords()
  let words = prepareWords(raws)
  presentTable(words)
}

function prepareWords(raws) {
  wordsArray = raws.split("\n")
  let words=[]
  for (let i in wordsArray) {
    let w=wordsArray[i].trim()
    if (w) {
      words.push(w.replaceAll('"',''))
    }
  }
  return words
}

function presentTable(words) {
  uiTable = new UITable()
  uiTable.showSeparators = true

  for (let i in words) {
    let w = words[i].split("|")
    let index = 1+parseInt(i);

    uiTableRow = new UITableRow()
    uiTableRow.height = 65;
    uiTableRow.onSelect = () => {
      Speech.speak(w[0])
    }
    uiTableRow.dismissOnSelect = false

	 let row = index + ". " + w[0]
    uiText = uiTableRow.addText(row, w[1])

    uiTable.addRow(uiTableRow)
  }

  uiTable.present()
}
