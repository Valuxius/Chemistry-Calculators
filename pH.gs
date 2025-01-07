function pHCalc(Concentration, Element, BasesDatabase, DecimalPlace, Mode) {
  var Bases = BasesDatabase.map(function (x) {
    return String(x)
  })
  var returnvalue = -1 * Math.log10(Concentration)
  if (Mode === 1) {
    if (Bases.indexOf(Element) != -1) {
        return (14 - returnvalue).toFixed(DecimalPlace)
    }
    else {
      return returnvalue.toFixed(DecimalPlace)
    }
  }
  if (Mode === 2) {
    if (Bases.indexOf(Element) != -1) {
        return returnvalue.toFixed(DecimalPlace)
    }
    else {
      return (14 - returnvalue).toFixed(DecimalPlace)
    }
  }
}
