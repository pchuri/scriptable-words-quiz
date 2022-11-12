function getRawWords() {
  let rawWords=`
    cooperate|협력하다, 협동하다
"overlap|겹치다, 포개지다; 중복되다"
reveal|드러내다, 누설하다
"concern|걱정(하다[시키다]); 관심사;관심을 갖다"
distance|거리, 간격; 먼 거리, 먼 곳
gather|모으다, 모이다; 이해하다
obvious|명백한, 분명한
"inclined|~하는 경향이 있는; ~할 마음이 있는"
throughout|~도처에; ~동안 내내
"deny|부정하다, 인정하지 않다;거절하다"
"arrange|정하다; 정리[배열]하다; 편곡하다"
"violate|위반하다, 어기다; 침해하다"
"proceed|계속하다[되다], 진행하다[되다]"
latter|후반의; 후자의; 후자
hence|따라서, 그러므로; 향후
crisis|위기, 결정적인 시기
accurate|정확한, 정밀한
interrupt|방해하다, 중단시키다
"retire|은퇴하다, 퇴직하다, 그만두다"
defense|방어(물); 변호
disappear|사라지다
decorate|장식하다
"recognize|알아보다, 인지하다; 인정하다"
clarify|명백하게 하다, 분명해지다
permanent|영속하는, 영구적인
concentrate|집중하다; (한 곳에) 모으다
delicate|(연)약한; 섬세한; 미묘한
"damage|손상, 손해[피해](를 입히다)"
"involve|포함하다, 수반하다; 관련시키다"
debate|논쟁(하다), 토론(하다)
addicted|중독된, 푹 빠진
function|역할; 작용하다, 기능(하다)
"feature|특징; 특집 (기사/방송); 특징으로 삼다"
"estimate|(가치 등을) 추정(하다), 평가하다; 견적서"
"instant|즉각적인; 즉석요리의; 즉시, 찰나"
temporary|일시적인, 임시의
circumstance|상황; (경제적) 형편, 처지
"dedicate|(시간·노력을) 바치다, 헌신하다"
steep|가파른; 급격한
"confirm|(~이 사실임을) 보여주다;확인하다"
classify|분류하다, 구분하다
objective|객관적인; 목표, 목적
supply|공급하다; 공급(량); 보급품
"disgust|역겹게 하다; 혐오감, 역겨움"
enhance|높이다, 강화하다
eventual|최종적인, 궁극적인
"dense|밀집한, 빽빽한; (앞이 안보이게) 짙은"
"yield|생산하다; 굴복하다; (농작물 등의) 산출량"
inferior|하위의, 열등한, 보다 못한
"state|상태, 상황; 국가, 주; 진술하다"
"indicate|나타내다, 암시하다; 가리키다"
ignore|무시하다; 못 본 척하다
corporate|기업의; 법인의; 공동의
"demand|요구(하다); 수요; 필요로 하다"
"declare|선언하다, 발표하다; (세관등에) 신고하다"
crucial|결정적인, 중대한
"occasion|(특정한) 때, 경우; 특별한일[행사]"
adopt|입양하다; 채택[채용]하다
object|물체; 목적, 목표; 반대하다
"artificial|인조의; (행동이) 거짓인, 꾸민"
"apply|신청하다, 지원하다; 적용되다; 바르다"
"restrain|제지하다; (감정·행동 등을)억누르다"
combine|결합하다[되다]; 겸비하다
decade|10년
"commit|(죄를) 범하다; 약속하다; 전념하다"
"distribute|나누어 주다, 분배하다; 유통시키다"
superior|뛰어난, 보다 나은
"regard|여기다, 간주하다; 존경; 관심"
conceal|숨기다, 감추다
donation|기부(금), 기증(품)
respect|존중(하다); 준수하다; 측면
"perceive|인지하다, 알아차리다; 여기다"
"reduce|감소시키다, 줄이다, 낮추다"
deteriorate|악화되다
disrupt|방해하다, 지장을 주다
"charge|청구하다; 고발하다; 책임(을 지우다); 요금"
exterior|바깥쪽(의), 외부(의)
subjective|주관적인, 주관의
"adapt|적응하다[시키다]; 개조하다"
disturb|방해하다; 어지럽히다
former|이전의, 예전의; 전자
"acknowledge|인정하다, 승인하다; 감사를 표하다"
achieve|이루다, 성취하다
"compose|구성하다; 작곡하다, 작문하다"
offense|위반, 범죄; 공격
vivid|생생한, 선명한
"encourage|용기를 복돋우다; 장려하다; 조장하다"
adequate|적절한, 충분한
"devote|(노력·시간을) 바치다, 기울이다"
induce|권유하다; 유발하다
   `
  return rawWords
}

main()

function main() {
  let raws = getRawWords()
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
