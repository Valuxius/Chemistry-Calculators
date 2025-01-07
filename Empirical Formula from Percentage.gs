function findEmpiricalFormula(ElementsList, PercentageList, DatabaseElements, DatabaseMM, DatabaseSymbols, Mode) {
  var MolesList = []
  var SymList = []
  var RatiosList = []
  var List = []
  var SubList = []
  var Result = ""
  var Vari = "on"
  var Vari2 = "off"
  var Num = 1
  for (var i = 0; i < ElementsList.length; i++) {
    for (var a = 0; a < DatabaseElements.length; a++) {
      if (String(ElementsList[i]) === String(DatabaseElements[a])) {
        var index = a
        MolesList.push(PercentageList[i]*100/DatabaseMM[a])
        SymList.push(String(DatabaseSymbols[a]))
        break
      }
    }
  }
  var a = 0
  for (var i = 0; i < MolesList.length; i++) {
    RatiosList.push(MolesList[i]/Math.min(...MolesList))
  }
  while (Vari === "on" && Num <= 100) {
    for (var i = 0; i < RatiosList.length; i++) {
      List.push(RatiosList[i]*Num)
    }
    for (var i = 0; i < List.length; i++) {
      Vari2 = "on"
      if(!(List[i] % 1 > 0.985 || List[i] % 1 < 0.015 || List % 1 === 0)) {
        Vari2 = 'off'
        break
      }
    }
    if (Vari2 === 'off') {
      Num++
      List = []
    }
    if (Vari2 === 'on') {
      break
    }
  }
  for (var i = 0; i < List.length; i++) {
    SubList.push(String(Math.round(List[i])))
  }
  for (var i = 0; i < SubList.length; i++) {
    Result += SymList[i]
    if (SubList[i] != 1) Result += SubList[i]
  }
  if (Mode === "result") return Result
  if (Mode === "list") return SubList
}
