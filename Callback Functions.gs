function getSignificantDigitCount(n) {
  var vari = false
  for (var i = 0; i < String(n).length; i++) {
    if (String(n[i]) === ".") vari = true 
  }
  while (n != 0 && n % 10 == 0 && vari == false) n /= 10; 
  n = Math.abs(String(n).replace(".", "")); 
  if (n == 0) return 99;
  return Math.floor(Math.log(n) / Math.log(10)) + 1; 
}
function getDecimalPlaces(n) {
  if (String(n).includes(".") === true) {
    var split = String(n).split(".")
    return split[1].length
  }
  else if (String(n).includes(".") === false && String(n) != "") return 0
}
function add(total, num) {
  return total + num
}
function ReturnSF(number, SF) {
  if (String(number).length > 15 && String(number).includes("999999") === true && String(number).includes("e") === false) number = test(number)
  var returnvalue = parseFloat(number).toPrecision(SF)
  if (returnvalue.includes("e") === true) return parseFloat(number.toPrecision(SF))
  else return parseFloat(number).toPrecision(SF)
}
function String1(n) {
  if (String(n).includes(".")) return String(n).length - 1
  else return String(n).length
}
function test(n) {
  var thing = String(n).indexOf("999999")
  return Number(n) + Math.pow(10, -1*thing)
}
