function separateEquation(equation, mode) {
  var testArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
  var splitEquation = equation.split("=") 
  var reactants = splitEquation[0].split("+")
  var products = splitEquation[1].split("+")
  var reactantsCoefficients = []
  var returnReactants = []
  var productsCoefficients = []
  var returnProducts = []
  for (var i = 0; i < reactants.length; i++) {
    var tempSplitReactant = reactants[i].split("")
    var tempSplitReactant1 = []
    var tempSplitReactant2 = ""
    var tempReactantCoefficient = []
    var tempReactantCoefficient1 = ""
    var numbersDone = false
    for (var y = 0; y < tempSplitReactant.length; y++) {
      var detected1 = false
      for (var v = 0; v < testArray.length; v++) {
        if (testArray[v] === String(tempSplitReactant[y]) && numbersDone === false) {
          tempReactantCoefficient.push(String(tempSplitReactant[y]))
          detected1 = true
        }
      }
      if (detected1 === false) {
          tempSplitReactant1.push(String(tempSplitReactant[y]))
          numbersDone = true
      }
    }
    for (var a = 0; a < tempSplitReactant1.length; a++) {
      tempSplitReactant2 += String(tempSplitReactant1[a])
    }
    for (var b = 0; b < tempReactantCoefficient.length; b++) {
      tempReactantCoefficient1 += String(tempReactantCoefficient[b])
    }
    if (tempReactantCoefficient1 === "") {
      tempReactantCoefficient1 = "1"
    }
    reactantsCoefficients.push(String(tempReactantCoefficient1))
    returnReactants.push(String(tempSplitReactant2))
  }
  for (var c = 0; c < products.length; c++) {
    var tempSplitProduct = products[c].split("")
    var tempSplitProduct1 = []
    var tempSplitProduct2 = ""
    var tempProductCoefficient = []
    var tempProductCoefficient1 = ""
    var numbersDone1 = false
    for (var d = 0; d < tempSplitProduct.length; d++) {
      var detected2 = false
      for (var e = 0; e < testArray.length; e++) {
        if (testArray[e] === String(tempSplitProduct[d]) && numbersDone1 === false) {
          tempProductCoefficient.push(String(tempSplitProduct[d]))
          detected2 = true
        }
      }
      if (detected2 === false) {
        tempSplitProduct1.push(String(tempSplitProduct[d]))
        numbersDone1 = true
      }
    }
    for (var f = 0; f < tempSplitProduct1.length; f++) {
      tempSplitProduct2 += String(tempSplitProduct1[f])
    }
    for (var g = 0; g < tempProductCoefficient.length; g++) {
      tempProductCoefficient1 += String(tempProductCoefficient[g])
    }
    if (tempProductCoefficient1 === "") {
      tempProductCoefficient1 = "1"
    }
    productsCoefficients.push(String(tempProductCoefficient1))
    returnProducts.push(String(tempSplitProduct2))
  }
  if (mode === "Coefficients (Reactants)") {
    return reactantsCoefficients
  }
  if (mode === "Coefficients (Products)") {
    return productsCoefficients
  }
  if (mode === "Reactants") {
    return returnReactants
  }
  if (mode === "Products") {
    return returnProducts
  }
}
function calculate(given, givencompound, required, reactants, products, coeffReactants, coeffProducts){
  var coefficient = 0
  var coefficient2 = 0
  for (var a = 0; a < reactants.length; a++) {
    if (String(givencompound) === String(reactants[a])) {
      coefficient = coeffReactants[a]
    }
  }
  for (var a = 0; a < products.length; a++) {
    if (String(givencompound) === String(products[a])) {
      coefficient = coeffProducts[a]
    }
  }
  for (var a = 0; a < reactants.length; a++) {
    if (String(required) === String(reactants[a])) {
      coefficient2 = coeffReactants[a]
    }
  }
  for (var a = 0; a < products.length; a++) {
    if (String(required) === String(products[a])) {
      coefficient2 = coeffProducts[a]
    }
  }
  var cof = coefficient2/coefficient
  return given*cof
}
