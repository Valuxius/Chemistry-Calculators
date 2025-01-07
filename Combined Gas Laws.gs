function combinedGasLaw(InitialPressure, InitialVolume, InitialTemp, FinalPressure, FinalVolume, FinalTemp, Mode, FinalUnit, InitialPressureUnit, InitialVolumeUnit, InitialTempUnit, FinalPressureUnit, FinalVolumeUnit, FinalTempUnit, PressureUnits, PressureUnitsConv, VolumeUnits, VolumeUnitsConv, TempUnits, TempUnitsConv) {
  var SF = []
  if (String(InitialPressure) === "Constant" || String(FinalPressure) === "Constant") {
    InitialPressure = "1.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    FinalPressure = "1.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  }
  if (String(InitialVolume) === "Constant" || String(FinalVolume) === "Constant") {
    InitialVolume = "1.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    FinalVolume = "1.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  }
  if (String(InitialTemp) === "Constant" || String(FinalTemp) === "Constant") {
    InitialTemp = "1.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    FinalTemp = "1.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  }
  if (String(InitialPressure) != "") SF.push(getSignificantDigitCount(InitialPressure))
  if (String(InitialVolume) != "") SF.push(getSignificantDigitCount(InitialVolume))
  if (String(InitialTemp) != "") SF.push(getSignificantDigitCount(InitialTemp))
  if (String(FinalPressure) != "") SF.push(getSignificantDigitCount(FinalPressure))
  if (String(FinalVolume) != "") SF.push(getSignificantDigitCount(FinalVolume))
  if (String(FinalTemp) != "") SF.push(getSignificantDigitCount(FinalTemp))
  if (InitialPressureUnit === "mmHg" && InitialPressure != "") InitialPressure /= 760
  if (InitialPressureUnit === "kPa" && InitialPressure != "") InitialPressure /= 101.325
  if (InitialVolumeUnit != "L" && InitialVolume != "") InitialVolume /= 1000
  if (InitialTempUnit === "C" && InitialTemp != "") InitialTemp = parseFloat(InitialTemp) + 273.15
  if (FinalPressureUnit === "mmHg" && FinalPressure != "") FinalPressure /= 760
  if (FinalPressureUnit === "kPa" && FinalPressure != "") FinalPressure /= 101.325
  if (FinalVolumeUnit != "L" && FinalVolume != "") FinalVolume /= 1000
  if (FinalTempUnit === "C" && FinalTemp != "") FinalTemp = parseFloat(FinalTemp) + 273.15
  if (String(FinalPressure) === "" && String(InitialPressure) != "" && String(InitialVolume) != "" && String(InitialTemp) != "" && String(FinalVolume) != "" && String(FinalTemp) != "") {
    if (Mode === "calc") {
      var result = (InitialPressure*InitialVolume*FinalTemp)/(InitialTemp*FinalVolume)
      if (FinalUnit == "mmHg") {
        result *= 760
        return String(ReturnSF(result, Math.min(...SF)))
      }
      if (FinalUnit == "kPa") {
        result *= 101.325
        return String(ReturnSF(result, Math.min(...SF)))
      }
      else if (FinalUnit != "atm") return "Please select the correct unit."
      else return String(ReturnSF(result, Math.min(...SF)))
    }
    if (Mode === "name") return "Final Pressure:"
    if (Mode === "list") {
      var PressureUnitsList = []
      PressureUnitsList.push("atm")
      PressureUnitsList.push(PressureUnits)
      PressureUnitsList.push("kPa")
      return PressureUnitsList
    }
  }
  if (String(FinalVolume) === "" && String(InitialPressure) != "" && String(InitialVolume) != "" && String(InitialTemp) != "" && String(FinalPressure) != "" && String(FinalTemp) != "") {
    if (Mode === "calc") {
      var result = (FinalTemp*InitialPressure*InitialVolume)/(FinalPressure*InitialTemp)
      if (FinalUnit === "mL") {
        result *= 1000
        return String(ReturnSF(result, Math.min(...SF)))
      }
      else if (FinalUnit != "L") return "Please select the correct unit."
      else return String(ReturnSF(result, Math.min(...SF)))
    }
    if (Mode === "name") return "Final Volume:"
    if (Mode === "list") {
      var VolumeUnitsList = []
      VolumeUnitsList.push("L")
      VolumeUnitsList.push(VolumeUnits)
      return VolumeUnitsList
    }
  }
  if (String(FinalTemp) === "" && String(InitialPressure) != "" && String(InitialVolume) != "" && String(InitialTemp) != "" && String(FinalVolume) != "" && String(FinalPressure) != "") {
    if (Mode === "calc") {
      var result = (InitialTemp*FinalPressure*FinalVolume)/(InitialPressure*InitialVolume)
      if (FinalUnit === "C") {
        result = parseFloat(result) - 273.15
        return String(ReturnSF(result, Math.min(...SF)))
      }
      else if (FinalUnit != "K") return "Please select the correct unit."
      else return String(ReturnSF(result, Math.min(...SF)))
    }
    if (Mode === "name") return "Final Temperature:"
    if (Mode === "list") {
      var TempUnitsList = []
      TempUnitsList.push("K")
      TempUnitsList.push(TempUnits)
      return TempUnitsList
    }
  }
  else {
    if (Mode === "name") return "Unknown:"
  }
}
