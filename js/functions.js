//Функция для проверки длины строки.
//Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true,
// если строка меньше или равна указанной длине, и false, если строка длиннее.

export const checkLength = (string, maxLength) => string.length <= maxLength;

// Строка короче 20 символов
checkLength('проверяемая строка', 20);
// Длина строки ровно 18 символов
checkLength('проверяемая строка', 18);
// Строка длиннее 10 символов
checkLength('проверяемая строка', 10);


//Функция для проверки, является ли строка палиндромом.
//Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
//Если хотите усложнить задание, предусмотрите случай, когда в строке встречаются пробелы.
//Они не должны учитываться при проверке!

export const isPalindrome = (row) => {
  const normalizedRow = row.replaceAll(' ', '').toLowerCase();

  let mirrorRow = '';
  for (let i = normalizedRow.length - 1; i >= 0 ; i--) {
    mirrorRow += normalizedRow[i];
  }

  return normalizedRow === mirrorRow;
};

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true


//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
//и возвращает их в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN
//Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число.
//Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа

export const getNumber = (row) => {
  const normalizedRow = row.toString();
  let result = '';
  for (let i = 0; i < normalizedRow.length; i++) {
    if (!Number.isNaN(parseInt(normalizedRow[i], 10))) {
      result += normalizedRow[i];
    }
  }

  return +result || NaN;
};


getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN
getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5); // 15

//Функцию принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах
// и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
//Время указывается в виде строки в формате часы:минуты.
//Для указания часов и минут могут использоваться как две цифры, так и одна.
//Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.
//Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.
export const timeStringToMinutes = (timeString) => {
  const timeSplit = timeString.split(':');
  return Number(timeSplit[0]) * 60 + Number(timeSplit[1]);
};

export const isWorkDayMeeting = (startWorkDay, endWorkDay, startMeeting, timeMeeting) => {
  const startWorkDayMinutes = timeStringToMinutes(startWorkDay);
  const endWorkDayMinutes = timeStringToMinutes(endWorkDay);
  const startMeetingMinutes = timeStringToMinutes(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + timeMeeting;

  return startMeetingMinutes >= startWorkDayMinutes && endMeetingMinutes <= endWorkDayMinutes;
};

isWorkDayMeeting('08:00', '17:30', '14:00', 90); // true
isWorkDayMeeting('8:0', '10:0', '8:0', 120); // true
isWorkDayMeeting('08:00', '14:30', '14:00', 90); // false
isWorkDayMeeting('14:00', '17:30', '08:0', 90); // false
isWorkDayMeeting('8:00', '17:30', '08:00', 900); // false
