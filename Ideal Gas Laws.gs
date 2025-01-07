function idealGasLaw(Pressure, Volume, Moles, Temp, PressureUnit, VolumeUnit, TempUnit, FinalUnit, PressureUnits, VolumeUnits, TempUnits, PressureUnitsConv, VolumeUnitsConv, TempUnitsConv, Mode) {
  var SF = []
  if (Pressure != "") SF.push(getSignificantDigitCount(Pressure))
  if (Volume != "") SF.push(getSignificantDigitCount(Volume))
  if (Moles != "") SF.push(getSignificantDigitCount(Moles))
  if (Temp != "") SF.push(getSignificantDigitCount(Temp))
  var n = Math.min(...SF)
  if (PressureUnit === "mmHg" && Pressure != "") Pressure /= PressureUnitsConv
  if (PressureUnit === "kPa" && Pressure != "") Pressure /= 101.325
  if (VolumeUnit != "L" && Pressure != "") Volume /= VolumeUnitsConv
  if (TempUnit != "K" && Temp != "") Temp = parseFloat(Temp) + TempUnitsConv
  if (Pressure === "" && Volume != "" && Moles != "" && Temp != "") {
    if (Mode === "calc") {
      var result = (Moles*0.0821*Temp)/Volume
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
    if (Mode === "name") return "Pressure:"
    if (Mode === "list") {
      var PressureUnitsList = []
      PressureUnitsList.push("atm")
      PressureUnitsList.push(PressureUnits)
      PressureUnitsList.push("kPa")
      return PressureUnitsList
    }
  }
  if (Volume === "" && Pressure != "" && Moles != "" && Temp != "") {
    if (Mode === "calc") {
      var result = (Moles*0.0821*Temp)/Pressure
      if (FinalUnit == "mL") {
        result *= 1000
        return String(ReturnSF(result, Math.min(...SF)))
      }
      else if (FinalUnit != "L") return "Please select the correct unit."
      else return String(ReturnSF(result, Math.min(...SF)))
    }
    if (Mode === "name") return "Volume:"
    if (Mode === "list") {
      var VolumeUnitsList = []
      VolumeUnitsList.push("L")
      VolumeUnitsList.push(VolumeUnits)
      return VolumeUnitsList
    }
  }
  if (Moles === "" && Pressure != "" && Volume != "" && Temp != "") {
    if (Mode === "calc") {
      var result = (Pressure*Volume)/(0.0821*Temp)
      if (FinalUnit != "mol") return "Please select the correct unit."
      else return String(ReturnSF(result, Math.min(...SF)))
    }
    if (Mode === "name") return "Moles:"
    if (Mode === "list") return "mol"
  }
  if (Temp === "" && Pressure != "" && Volume != "" && Moles != "") {
    if (Mode === "calc") {
      var result = (Pressure*Volume)/(Moles*0.0821)
      if (FinalUnit === "C") {
        result = parseFloat(result) - 273.15
        return String(ReturnSF(result, Math.min(...SF)))
      }
      else if (FinalUnit != "K") return "Please select the correct unit."
      else return String(ReturnSF(result, Math.min(...SF)))
    }
    if (Mode === "name") return "Temperature:"
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
