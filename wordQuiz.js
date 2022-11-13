const CONFIG_URL = "https://raw.githubusercontent.com/pchuri/scriptable-words-quiz/main/config.json"
await main()

async function getConfig() {
  let req = new Request(CONFIG_URL)
  return await req.loadJSON()
}

async function getWords(url) {
  let req = new Request(url)
  return await req.loadString()
}

async function main() {
  let config = await getConfig()
  let raws = await getWords(config.wordsUrl)
  let words = prepareWords(raws)
  presentTable(config.title, words)
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

function presentTable(title, words) {
  uiTable = new UITable()
  uiTable.showSeparators = true

  uiTitleRow = new UITableRow()
  uiTitleRow.height = 70;

  let uiTitle = uiTitleRow.addText(title)
  uiTitle.titleFont = Font.largeTitle()
  uiTable.addRow(uiTitleRow)

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
