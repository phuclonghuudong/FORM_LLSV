const unitTexts = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
const scaleTexts = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ", "tỷ tỷ"];

function readThreeDigits(number, hasScale = false) {
  const absNumber = Math.abs(number);
  const hundreds = Math.floor(absNumber / 100);
  const remainder = absNumber % 100;
  const tens = Math.floor(remainder / 10);
  const units = remainder % 10;

  let result = "";

  if (hundreds > 0) {
    result += unitTexts[hundreds] + " trăm ";
  } else if (hasScale && (tens > 0 || units > 0)) {
    result += "không trăm ";
  }

  if (tens > 1) {
    result += unitTexts[tens] + " mươi ";
  } else if (tens === 1) {
    result += "mười ";
  } else if (hasScale && units > 0) {
    result += " lẻ ";
  }

  if (tens > 1 && units === 1) {
    result += " mốt ";
  } else if (tens > 0 && units === 5) {
    result += "lăm";
  } else if (units > 0) {
    result += unitTexts[units];
  }

  return result;
}

function readNumbers(number) {
  let result = "";
  let index = 0;
  let absNumber = Math.abs(number);

  if (!absNumber) return "Không đồng";

  const lastIndex = Math.floor(String(number).length / 3);
  do {
    const haScale = index !== lastIndex;

    const threeDigits = readThreeDigits(absNumber % 1000, haScale);

    if (threeDigits) {
      result = `${threeDigits} ${scaleTexts[index]} ${result}`;
    }

    absNumber = Math.floor(absNumber / 1000);
    index++;
  } while (absNumber > 0);

  result = (number < 0 ? "âm " : "") + (result.trim() + " đồng");
  return result[0].toUpperCase() + result.slice(1);
}

console.log(readNumbers(1234567));
console.log(readNumbers(101));
console.log(readNumbers(2001));
console.log(readNumbers(0));
console.log(readNumbers(-2051));
console.log(readNumbers(1000000000000));
