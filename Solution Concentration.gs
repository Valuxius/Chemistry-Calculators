function SolutionConcentration(Solute, SoluteUnit, Solution, SolutionUnit, FinalUnit, Mode) {
  var SF = []
  var Options = []
  var Options1 = []
  SF.push(getSignificantDigitCount(Solute))
  SF.push(getSignificantDigitCount(Solution))
  if (SoluteUnit === "kilograms of _____") Solute *= 1000
  if (SoluteUnit === "milligrams of _____") Solute /= 1000
  if (SolutionUnit === "kilograms of solution") Solution *= 1000
  if (FinalUnit === "%" && Mode === "number") return ReturnSF(Solute/Solution * 100, Math.min(...SF))
  if (FinalUnit === "ppm" && Mode === "number") return ReturnSF(Solute/Solution * 1000000, Math.min(...SF))
  if (FinalUnit === "ppb" && Mode === "number") return ReturnSF(Solute/Solution * 1000000000, Math.min(...SF))
  if (FinalUnit === "none specified") {
    Options.push(ReturnSF(Solute/Solution * 100, Math.min(...SF)))
    Options.push(ReturnSF(Solute/Solution * 1000000, Math.min(...SF)))
    Options.push(ReturnSF(Solute/Solution * 1000000000, Math.min(...SF)))
    Options1.push(String1(Options[0]))
    Options1.push(String1(Options[1]))
    Options1.push(String1(Options[2]))
    if (Mode === "number") return Options[Options1.indexOf(Math.min(...Options1))]
    if (Mode === "unit") {
      if (Options1.indexOf(Math.min(...Options1)) === 0) return "<--- percent"
      if (Options1.indexOf(Math.min(...Options1)) === 1) return "<--- ppm"
      if (Options1.indexOf(Math.min(...Options1)) === 2) return "<--- ppb"
    }
  }
}
