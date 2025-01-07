function molarMassCalc(Formula, SymbolsDatabase, MMDatabase, DCDatabase, SFDatabase, ElementsDatabase, Mode) {
  if (Formula != "") {
    var TestString = ""
    var MolarMass = 0
    var Interval = 1
    var Multiplier = ""
    var SF = []
    var DC = []
    var PerList = []
    var PerList2 = []
    var Indexes = []
    for (var i = 0; i < Formula.length; i += Interval) {
      TestString = ""
      Interval = 1
      Multiplier = ""
      TestString += Formula[i]
      if (parseInt(String(Formula[i + Interval]).charCodeAt()) >= 97 && parseInt(String(Formula[i + Interval]).charCodeAt()) <= 122 && String(Formula[i + 1]) != "undefined") {
        TestString += Formula[i + 1]
        Interval++
      }
      while (parseInt(Formula[i + Interval]) >= 0 && parseInt(Formula[i + Interval]) <= 99999999999 && String(Formula[i + Interval]) != "undefined"){
        Multiplier += String(Formula[i + Interval])
        Interval++
      }
      for (var a = 0; a < SymbolsDatabase.length; a++) {
        if (String(TestString) === String(SymbolsDatabase[a])) {
          if (String(Multiplier) === "") {
            Multiplier = "1"
          }
          MolarMass += MMDatabase[a] * parseInt(Multiplier)
          PerList.push(MMDatabase[a] * parseInt(Multiplier))
          DC.push(DCDatabase[a])
          SF.push(SFDatabase[a])
          Indexes.push(a)
          break
        }
      }
    }
    SF.push(getSignificantDigitCount(MolarMass.toFixed(Math.min(...DC))))
    if (Mode === "calc") return String(MolarMass.toFixed(Math.min(...DC))) + "g"
    if (Mode === "stoi") return MolarMass.toFixed(Math.min(...DC))
    if (Mode === "list") {
      for (var i = 0; i < PerList.length; i++) {
        PerList2.push(String(ReturnSF(PerList[i]/MolarMass.toFixed(Math.min(...DC))*100, Math.min(...SF))) + "% of " + ElementsDatabase[Indexes[i]])
      }
      return PerList2
    }
  }
}
