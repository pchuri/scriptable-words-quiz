const CONFIG_URL = "https://raw.githubusercontent.com/pchuri/scriptable-words-quiz/main/config.json"
const getConfig = () => new Request(CONFIG_URL).loadJSON()
const getWords = (url) => new Request(url).loadString()
const prepareWords = (data) => {
  const words = data.split("\n")
  let retWords=[]
  for (let i = 0; i < words.length; i++) {
    const w = words[i].trim()
    if (w) {
      retWords.push(w.replaceAll('"',''))
    }
  }
  return retWords
}

const createTitleRow = (title) => {
  let uiTitleRow = new UITableRow()
  uiTitleRow.height = 70;

  let uiTitle = uiTitleRow.addText(title)
  uiTitle.titleFont = Font.largeTitle()
  return uiTitleRow
}

const createWordRow = (i, data) => {
  const w = data.split("|")
  const word = w[0]
  const mean = w[1]
  const index = 1 + i;

  let uiTableRow = new UITableRow()
  uiTableRow.height = 65;
  uiTableRow.onSelect = () => Speech.speak(word)
  uiTableRow.dismissOnSelect = false

  const text = index + ". " + word
  uiTableRow.addText(text, mean)
  return uiTableRow
}

const presentTable = (title, words) => {
  let uiTable = new UITable()
  uiTable.showSeparators = true
  uiTable.addRow(createTitleRow(title))

  for (let i=0; i<words.length; i++) {
    uiTable.addRow(createWordRow(i, words[i]))
  }
  uiTable.present(true)
}

const main = async () => {
    let config = await getConfig()
    let words = prepareWords(await getWords(config.wordsUrl))
    presentTable(config.title, words)
}
await main()
