function LimitingReactants(Equation, Mode, SymbolsDatabase, MMDatabase, DCDatabase, SFDatabase, ElementsDatabase, Given, GivenUnit, FinalUnit) {
  if (Equation != "") {
    var Split = Equation.split("=")
    var EqReactants = Split[0].split("+")
    var EqProducts = Split[1].split("+")
    var Products = []
    var Reactants = []
    var ReactantCoefficients = []
    var ProductCoefficients = []
    var TestString = ""
    var ProductsMM = []
    var ReactantsMM = []
    var SF = []
    var index = -1
    var Moles = []
    var Results = []
    var LimitingReactant = ""
    for (var i = 0; i < EqReactants.length; i++) {
      TestString = ""
      for (var a = 0; a < String(EqReactants[i]).length; a++) {
        if (parseInt(String(EqReactants[i])[0].charCodeAt()) >= 65 && parseInt(String(EqReactants[i])[0].charCodeAt()) <= 90) {
          TestString += "1"
          break
        }
        else if ((parseInt(String(EqReactants[i])[a].charCodeAt()) >= 48 && parseInt(String(EqReactants[i])[a].charCodeAt()) <= 57) || parseInt(String(EqReactants[i])[a].charCodeAt()) === 46) TestString += String(EqReactants[i])[a]
        else break
      }
      ReactantCoefficients.push(TestString)
      if (TestString != "1") Reactants.push(EqReactants[i].replace(TestString, ""))
      else Reactants.push(EqReactants[i])
    }
    for (var i = 0; i < EqProducts.length; i++) {
      TestString = ""
      for (var a = 0; a < String(EqProducts[i]).length; a++) {
        if (parseInt(String(EqProducts[i])[0].charCodeAt()) >= 65 && parseInt(String(EqProducts[i])[0].charCodeAt()) <= 90) {
          TestString += "1"
          break
        }
        else if ((parseInt(String(EqProducts[i])[a].charCodeAt()) >= 48 && parseInt(String(EqProducts[i])[a].charCodeAt()) <= 57) || parseInt(String(EqProducts[i])[a].charCodeAt()) === 46) TestString += String(EqProducts[i])[a]
        else break
      }
      ProductCoefficients.push(TestString)
      if (TestString != "1") Products.push(EqProducts[i].replace(TestString, ""))
      else Products.push(EqProducts[i])
    }
    for (var i = 0; i < Reactants.length; i++) {
      ReactantsMM.push(molarMassCalc(Reactants[i], SymbolsDatabase, MMDatabase, DCDatabase, SFDatabase, ElementsDatabase, "stoi"))
    }
    for (var i = 0; i < Products.length; i++) {
      ProductsMM.push(molarMassCalc(Products[i], SymbolsDatabase, MMDatabase, DCDatabase, SFDatabase, ElementsDatabase, "stoi"))
    }
    for (var i = 0; i < Reactants.length; i++) {
      if (Given[i] != "") {
        if (GivenUnit === "g") {
          Moles.push((parseFloat(Given[i])/parseFloat(ReactantCoefficients[i]))/parseFloat(ReactantsMM[i]))
        }
        if (GivenUnit === "kg") {
          Moles.push(((parseFloat(Given[i])/parseFloat(ReactantCoefficients[i]))/parseFloat(ReactantsMM[i]))*1000)
        }
      }
      SF.push(getSignificantDigitCount(Given[i]))
    }
    if (Moles.length > 0) {
      for (var i = 0; i < Moles.length; i++) {
        if (Math.min(...Moles) === Moles[i]) {
          LimitingReactant = Reactants[i]
          break
        }
      }
      for (var i = 0; i < Products.length; i++) {
        if (FinalUnit === "g") Results.push(String(ReturnSF(parseFloat(ProductsMM[i])*Math.min(...Moles)*ProductCoefficients[i], Math.min(...SF)))+ FinalUnit)
        if (FinalUnit === "kg") Results.push(String(ReturnSF(parseFloat(ProductsMM[i])*Math.min(...Moles)*ProductCoefficients[i], Math.min(...SF))/1000) + FinalUnit)
      }
    }
    if (Mode === 1) return Reactants
    if (Mode === 2) return Products
    if (Mode === 3 && Results.length > 0) return Results
    if (Mode === 4 && Results.length > 0) return LimitingReactant
  }
}
