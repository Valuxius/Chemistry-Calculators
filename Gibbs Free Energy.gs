function GibbsFreeEnergy(DeltaH, Temperature, DeltaS, DeltaG, DHUnit, TempUnit, DSUnit, DGUnit, FinalUnit, Mode, DecimalPlace) {
  if (String(DHUnit) === "kJ" && String(DeltaH) != "") DeltaH *= 1000
  if (String(TempUnit) === "C" && String(Temperature) != "") Temperature += 273.15
  if (String(DSUnit) === "kJ" && String(DeltaS) != "") DeltaS *= 1000
  if (String(DGUnit) === "kJ" && String(DeltaG) != "") DeltaG *= 1000
  if (String(Temperature) === "" && String(DeltaH) != "" && String(DeltaS) != "" && String(DeltaG) != "") {
    if (Mode === 1) {
      if (FinalUnit === "C") return ((-1 * (DeltaG - DeltaH)/DeltaS) - 273.15).toFixed(DecimalPlace)
      else if (FinalUnit === "K") return (-1 * (DeltaG - DeltaH)/DeltaS).toFixed(DecimalPlace)
      else return "Invalid Unit"
    }
    if (Mode === 2) return "Temperature:"
  }
  if (String(DeltaG) === "" && String(DeltaH) != "" && String(Temperature) != "" && String(DeltaS) != "") {
    if (Mode === 1) {
      if (FinalUnit === "kJ") return ((DeltaH - (Temperature * DeltaS))/1000).toFixed(DecimalPlace)
      else if (FinalUnit === "J") return (DeltaH - (Temperature * DeltaS)).toFixed(DecimalPlace)
      else return "Invalid Unit"
    }
    if (Mode === 2) return "ΔG:"
  }
}
