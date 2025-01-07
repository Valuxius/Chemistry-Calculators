function EnthalpyChange(Equation, Mode, EnthalpyElementsDatabase, EnthalpyValuesDatabase, CustomEnthalpies, CustomEnthalpies1) {
  if (Equation != "") {
    var Split = Equation.split("=")
    var EqReactants = Split[0].split("+")
    var EqProducts = Split[1].split("+")
    var Products = []
    var Reactants = []
    var ReactantCoefficients = []
    var ProductCoefficients = []
    var TestString = ""
    var ReactantsSum = "0.00000000000000000000000"
    var ProductsSum = "0.00000000000000000000000"
    var Vari = true
    var SF = []
    var ReturnString = "Please enter an enthalpy value for "
    var NoValueElements = []
    var DC = []
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
    DC.push(getDecimalPlaces(ReactantsSum))
    for (var i = 0; i < Reactants.length; i++) {
      if (String(CustomEnthalpies[i]) != "") {
        ReactantsSum = parseFloat(ReactantsSum) + (parseFloat(CustomEnthalpies[i]).toFixed(Math.min(getDecimalPlaces(String(ReactantsSum)), getDecimalPlaces(String(CustomEnthalpies[i])))) * ReactantCoefficients[i])
        DC.push(getDecimalPlaces(CustomEnthalpies[i]))
        SF.push(getSignificantDigitCount(String(CustomEnthalpies[i])))
      }
      else {
        for (var a = 0; a < EnthalpyElementsDatabase.length; a++) {
          if (String(EnthalpyElementsDatabase[a]) === String(Reactants[i])) {
            ReactantsSum = parseFloat(ReactantsSum) + (parseFloat(EnthalpyValuesDatabase[a]) * ReactantCoefficients[i])
            DC.push(getDecimalPlaces(String(EnthalpyValuesDatabase[a])))
            SF.push(getSignificantDigitCount(String(EnthalpyValuesDatabase[a])))
            break
          }
          else if (a >= EnthalpyElementsDatabase.length-1) {
            Vari = false
            NoValueElements.push(Reactants[i])
          }
        }
      }
    }
    DC.push(getDecimalPlaces(ProductsSum))
    for (var i = 0; i < Products.length; i++) {
      if (String(CustomEnthalpies1[i]) != "") {
        ProductsSum = parseFloat(ProductsSum) + (parseFloat(CustomEnthalpies1[i]).toFixed(Math.min(getDecimalPlaces(String(ProductsSum)), getDecimalPlaces(String(CustomEnthalpies1[i])))) * ProductCoefficients[i])
        DC.push(getDecimalPlaces(CustomEnthalpies1[i]))
        SF.push(getSignificantDigitCount(CustomEnthalpies1[i]))
      }
      else {
        for (var a = 0; a < EnthalpyElementsDatabase.length; a++) {
          if (String(EnthalpyElementsDatabase[a]) === String(Products[i])) {
            ProductsSum = parseFloat(ProductsSum) + (parseFloat(EnthalpyValuesDatabase[a]) * ProductCoefficients[i])
            DC.push(getDecimalPlaces(EnthalpyValuesDatabase[a]))
            SF.push(getSignificantDigitCount(EnthalpyValuesDatabase[a]))
            break
          }
          else if (a >= EnthalpyElementsDatabase.length-1) {
            Vari = false
            NoValueElements.push(Products[i])
          }
        }
      }
    }
    if (Mode === 1) return Reactants
    if (Mode === 2 && Vari === true) return String(ReturnSF((ProductsSum - ReactantsSum).toFixed(Math.min(...DC)), Math.min(...SF))) + " kJ/mol"
    if (Mode === 2 && Vari === false) {
      for (var i = 0; i < NoValueElements.length; i++) {
        if (i === NoValueElements.length-1 && i != 0) ReturnString += "and "
        ReturnString += NoValueElements[i]
        if (i === NoValueElements.length-1) ReturnString += "."
        else if (NoValueElements.length > 2) ReturnString += ", "
        else ReturnString += " "
      }
      return ReturnString
    }
    if (Mode === 3) return Products
  }
}
