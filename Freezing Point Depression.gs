function FPD(SolventFP, SolventKf, Molal, SolutionFP, VHFactor, Mode) {
  var SF = []
  var DC = []
  if (VHFactor === "") VHFactor = 1
  SF.push(getSignificantDigitCount(SolventFP))
  SF.push(getSignificantDigitCount(SolventKf))
  SF.push(getSignificantDigitCount(Molal))
  SF.push(getSignificantDigitCount(SolutionFP))
  DC.push(getDecimalPlaces(SolventFP))
  DC.push(getDecimalPlaces(SolventKf))
  DC.push(getDecimalPlaces(Molal))
  DC.push(getDecimalPlaces(SolutionFP))
  if (SolutionFP === "" && SolventFP != "" && SolventKf != "" && Molal != "" && Mode === 2) {
    var DeltaTf = ReturnSF((Number(VHFactor) * Number(Molal) * Number(SolventKf)), Math.min(SF[1], SF[2]))
    return (Number(SolventFP) - Number(DeltaTf)).toFixed(Math.min(getDecimalPlaces(DeltaTf), DC[0]))
  }
  if (SolutionFP === "" && SolventFP != "" && SolventKf != "" && Molal != "" && Mode === 1) {
    return "Solution's Freezing Point:"
  }
  if (SolventFP === "" && SolventKf != "" && Molal != "" && SolutionFP != "" && Mode === 2) {
    var DeltaTf = ReturnSF((Number(VHFactor) * Number(Molal) * Number(SolventKf)), Math.min(SF[1], SF[2]))
    return (Number(DeltaTf) + Number(SolutionFP)).toFixed(Math.min(getDecimalPlaces(DeltaTf), DC[3]))
  }
  if (SolventFP === "" && SolventKf != "" && Molal != "" && SolutionFP != "" && Mode === 1) {
    return "Solvent's Freezing Point:"
  }
  if (Molal === "" && SolventFP != "" && SolventKf != "" && SolutionFP != "" && Mode === 2) {
    var DeltaTf =  (Number(SolventFP) - Number(SolutionFP)).toFixed(Math.min(DC[0], DC[3]))
    return ReturnSF((Number(DeltaTf)/(Number(VHFactor)*Number(SolventKf))), Math.min(getSignificantDigitCount(DeltaTf), SF[1]))
  }
  if (Molal === "" && SolventFP != "" && SolventKf != "" && SolutionFP != "" && Mode === 1) {
    return "Molality:"
  }
  if (SolventKf === "" && SolventFP != "" && Molal != "" && SolutionFP != "" && Mode === 2) {
    var DeltaTf = (Number(SolventFP) - Number(SolutionFP)).toFixed(Math.min(DC[0], DC[3]))
    return ReturnSF((Number(DeltaTf)/Number(VHFactor)*Number(Molal)), Math.min(SF[2], getSignificantDigitCount(DeltaTf)))
  }
  if (SolventKf === "" && SolventFP != "" && Molal != "" && SolutionFP != "" && Mode === 1) {
    return "Solvent's Kf"
  }
}

