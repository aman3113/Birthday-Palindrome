const birthDate = document.getElementById("enter-date");
const checkBtn = document.getElementById("check-btn");
const output = document.querySelector(".output");

function reverseString(string) {
  return string.split("").reverse().join("");
}

function isPalindrome(string) {
  var reversedString = reverseString(string);

  return string === reversedString;
}

function dateToString(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getDateInAllFormats(date) {
  date = dateToString(date);

  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkAllPalindrome(date) {
  var listOfFormats = getDateInAllFormats(date);
  var isItPalindrome = false;

  for (let i = 0; i < listOfFormats.length; i++) {
    if (isPalindrome(listOfFormats[i])) {
      isItPalindrome = true;
      break;
    }
  }

  return isItPalindrome;
}

function leapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (leapYear(year)) {
      if (day === 29) {
        day = 1;
        month++;
      }
    } else {
      if (day === 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (leapYear(year)) {
      if (day === 0) {
        day = 29;
        month--;
      }
    } else {
      if (day === 0) {
        day = 28;
        month--;
      }
    }
  } else if (month === 1) {
    if (day === 0) {
      month = 12;
      day = 31;
      year--;
    }
  } else {
    if (day === 0) {
      day = daysInMonth[month - 2];
      month--;
    }
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var dayCount = 0;
  var nextDate = getNextDate(date);

  while (1) {
    dayCount++;
    var palindrome = checkAllPalindrome(nextDate);
    if (palindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [dayCount, nextDate];
}

function getPreviousPalindromeDate(date) {
  var dayCount = 0;
  var previousDate = getPreviousDate(date);

  while (1) {
    dayCount++;
    var palindrome = checkAllPalindrome(previousDate);
    if (palindrome) {
      break;
    }
    previousDate = getNextDate(previousDate);
  }

  return [dayCount, previousDate];
}

function clickHandler() {
  var birthDayDate = birthDate.value;

  if (birthDayDate !== "") {
    var listBdayStr = birthDayDate.split("-");
    console.log(listBdayStr);
    var date = {
      day: Number(listBdayStr[2]),
      month: Number(listBdayStr[1]),
      year: Number(listBdayStr[0]),
    };

    var isItPalindrome = checkAllPalindrome(date);
    if (isItPalindrome) {
      console.log("yes");
      output.innerText = `
        Yeah!🥳 your Birth Date is a Palindrome
        `;
    } else {
      var [dayCount1, nextDate] = getNextPalindromeDate(date);
      var [dayCount2, previousDate] = getPreviousPalindromeDate(date);

      if (dayCount1 < dayCount2) {
        output.innerHTML = `
            You missed a palindrome date by <span> ${dayCount1} days </span>.
            <br>
            <br>
            The closest Palindrome date is <span> ${nextDate.day}-${nextDate.month}-${nextDate.year} </span>.
            `;
      } else {
        output.innerHTML = `
            You missed a palindrome date by <span> ${dayCount2} days </span>.
            <br>
            <br>
            The closest Palindrome date is <span> ${previousDate.day}-${previousDate.month}-${previousDate.year} </span>.
            `;
      }
    }
  }
}

checkBtn.addEventListener("click", clickHandler);
