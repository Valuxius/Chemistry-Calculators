function BPE(SolventBP, SolventKb, Molal, SolutionBP, VHFactor, Mode) {
  var SF = []
  var DC = []
  if (VHFactor === "") VHFactor = 1
  SF.push(getSignificantDigitCount(SolventBP))
  SF.push(getSignificantDigitCount(SolventKb))
  SF.push(getSignificantDigitCount(Molal))
  SF.push(getSignificantDigitCount(SolutionBP))
  DC.push(getDecimalPlaces(SolventBP))
  DC.push(getDecimalPlaces(SolventKb))
  DC.push(getDecimalPlaces(Molal))
  DC.push(getDecimalPlaces(SolutionBP))
  if (SolutionBP === "" && SolventBP != "" && SolventKb != "" && Molal != "" && Mode === 2) {
    var DeltaTb = ReturnSF((Number(VHFactor) * Number(SolventKb) * Number(Molal)), Math.min(SF[1], SF[2]))
    return (Number(DeltaTb) + Number(SolventBP)).toFixed(Math.min(getDecimalPlaces(DeltaTb), DC[0]))
  }
  if (SolutionBP === "" && SolventBP != "" && SolventKb != "" && Molal != "" && Mode === 1) {
    return "Solution's Boiling Point:"
  }
  if (SolventBP === "" && SolventKb != "" && Molal != "" && SolutionBP != "" && Mode === 2) {
    var DeltaTb = ReturnSF((Number(VHFactor) * Number(SolventKb) * Number(Molal)), Math.min(SF[1], SF[2]))
    return (Number(SolutionBP) - Number(DeltaTb)).toFixed(Math.min(DC[3], getDecimalPlaces(DeltaTb)))
  }
  if (SolventBP === "" && SolventKb != "" && Molal != "" && SolutionBP != "" && Mode === 1) {
    return "Solvent's Boiling Point:"
  }
  if (Molal === "" && SolventBP != "" && SolventKb != "" && SolutionBP != "" && Mode === 2) {
    var DeltaTb = (Number(SolutionBP) - Number(SolventBP)).toFixed(Math.min(DC[0], DC[3]))
    return ReturnSF(Number(DeltaTb)/(Number(VHFactor) * Number(SolventKb)), Math.min(SF[0], getSignificantDigitCount(DeltaTb)))
  }
  if (Molal === "" && SolventBP != "" && SolventKb != "" && SolutionBP != "" && Mode === 1) {
    return "Molality:"
  }
  if (SolventKb === "" && SolventBP != "" && Molal != "" && SolutionBP != "" && Mode === 2) {
    var DeltaTb = (Number(SolutionBP)-Number(SolventBP)).toFixed(Math.min(DC[3], getDecimalPlaces(DeltaTb)))
    return Number(DeltaTb)/(Number(VHFactor) * Number(Molal))
  }
  if (SolventKb === "" && SolventBP != "" && Molal != "" && SolutionBP != "" && Mode === 1) {
    return "Solvent's Kb:"
  }
  if (Mode === 3) return SF
}
