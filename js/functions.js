//Функция для проверки длины строки.
//Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true,
// если строка меньше или равна указанной длине, и false, если строка длиннее.

function checkLength(string, maxLength) {
  return string.length <= maxLength;
}

// Строка короче 20 символов
console.log('ожидаю true', checkLength("проверяемая строка", 20));
// Длина строки ровно 18 символов
console.log('ожидаю true', checkLength("проверяемая строка", 18));
// Строка длиннее 10 символов
console.log('ожидаю false', checkLength("проверяемая строка", 10));



//Функция для проверки, является ли строка палиндромом.
//Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
//Если хотите усложнить задание, предусмотрите случай, когда в строке встречаются пробелы.
//Они не должны учитываться при проверке!

function isPalindrome(row) {
  const normalizedRow = row.replaceAll(" ", "").toLowerCase();

  let mirrorRow = '';
  for (let i = normalizedRow.length - 1; i >= 0 ; i--) {
    mirrorRow += normalizedRow[i];
  }

  return normalizedRow === mirrorRow;
}

// Строка является палиндромом
console.log('ожидаю true', isPalindrome("топот")); // true
// Несмотря на разный регистр, тоже палиндром
console.log('ожидаю true', isPalindrome("ДовОд")); // true
// Это не палиндром
console.log('ожидаю false', isPalindrome("Кекс")); // false
// Это палиндром
console.log('ожидаю true', isPalindrome("Лёша на полке клопа нашёл ")); // true



//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
//и возвращает их в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN
//Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число.
//Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа

function getNumber(row) {
  const normalizedRow = row.toString();
  let result = '';
  for (let i = 0; i < normalizedRow.length; i++) {
    if (!Number.isNaN(parseInt(normalizedRow[i], 10))) {
      result += normalizedRow[i];
    }
  }

  return result ? +result : NaN;
}


console.log('ожидаю 2023', getNumber('2023 год'));            // 2023
console.log('ожидаю 2022', getNumber('ECMAScript 2022'));     // 2022
console.log('ожидаю 105', getNumber('1 кефир, 0.5 батона')); // 105
console.log('ожидаю 7', getNumber('агент 007'));           // 7
console.log('ожидаю Nan', getNumber('а я томат'));           // NaN
console.log('ожидаю 2023', getNumber(2023)); // 2023
console.log('ожидаю 1', getNumber(-1));   // 1
console.log('ожидаю 15', getNumber(1.5));  // 15

