$(document).ready(function() {
  var expression = "";
  var screen = $('.screen');

  $('.digit').click(function () {
    var $digit = $(this).html();
    var lastChar = expression[expression.length-1];
    if (!canAddZero(screen.text()) && $digit == '0') {
      return;
    }

    expression += $digit;
    screen.text(expression.substring(0, 17));
  });

  $('.operator').click(function () {
    var lastChar = expression[expression.length-1];
    var $operator = $(this).html();
    if ((lastChar == '.' || lastChar == '+'|| lastChar == '-'|| lastChar == '*'|| lastChar == '/'))
    {
      return;
    }

    var val = screen.text();
    if (!digitValidation(val) && ($operator == '.')) {
      return;
    }
    if (val == '' && ($operator == '*' || $operator == '/' || $operator == '.' || $operator =='+')) {
      return;
    }else {
      expression += $operator;
      screen.text(expression.substring(0, 17));
    };
  });

  $('.eval').click(function () {
    var val = screen.text();
    var lastChar = val[val.length-1];
    if (val == '' || lastChar == '+'|| lastChar == '-'|| lastChar == '*'|| lastChar == '/') {
      return;
    };
    var result = eval(screen.text());
    if (Number(result) === result && result % 1 !== 0) {
      result = result.toFixed(3);
      result = eval(result);
    }

    if (result == 'Infinity' || result == '-Infinity') {
      result = "Can't divide by zero";
    }else {
        result = String(result).substring(0, 17);
    }

    screen.text(result);
    expression = result;
  });

  $('.clear').click(function () {
    var val = screen.text();
    var str = val.substring(0, val.length - 1);
    var str = str.substring(0, 17)
    screen.text(str);
    expression = str;
  });

  $('.clear-all').click(function () {
    screen.text('');
    expression = '';
  });

  $(document).keypress(function (keyInfo) {
    if (keyInfo.keyCode == 13 && screen.text() != '') {
      $('.eval').click();
    };
  });
});

function digitValidation(expression) {
  var currentDigit = '';
    for (var i = expression.length - 1; i >= 0; i--) {
      var char = expression[i];
      if (char == '+'|| char == '-'|| char == '*'|| char == '/')
      {
        break;
      }

      currentDigit = char + currentDigit;
    }

    if (currentDigit.includes('.')) {
      return false;
    }

    return true;
}

function canAddZero(expression) {
  var currentDigit = '';
    for (var i = expression.length - 1; i >= 0; i--) {
      var char = expression[i];
      if (char == '+'|| char == '-'|| char == '*'|| char == '/')
      {
        break;
      }

      currentDigit = char + currentDigit;
    }

    if (currentDigit == '0') {
      return false;
    }

    return true;
}
