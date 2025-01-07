function MassConcentration(Names, Weights) {
  var DC = []
  var Results = []
  var Results1 = []
  for (var i = 0; i < Weights.length; i++) {
    if (Weights[i] != "") DC.push(getDecimalPlaces(Weights[i]))
  } 
  var Weights1 = Weights.map(function (x) {
    return Number(x)
  })
  var Total = Weights1.reduce(add).toFixed(Math.min(...DC))
  for (var i = 0; i < DC.length; i++) {
    Results1.push(ReturnSF((Weights[i]/Total), Math.min(getSignificantDigitCount(Weights[i]), getSignificantDigitCount(Total)))* 100)
    if (Names[i] != "") Results.push(String(ReturnSF(Number(Results1[i]), Math.min(getSignificantDigitCount(Weights[i]), getSignificantDigitCount(Total)))) + "% of " + String(Names[i]))
    else Results.push(String(ReturnSF(Number(Results1[i]), Math.min(getSignificantDigitCount(Weights[i]), getSignificantDigitCount(Total)))) + "%")
  } 
  return Results
}
