var weekHelper = function(weeks) {
  if (weeks == 1) {
    return 'WEEK'
  } else {
    return 'WEEKS'
  }
};

var dollarHelper = function(dollars) {
  dollars = dollars.toString()
  if (dollars.slice(-2)[0] == '.') {
    return '$' + dollars + '0'
    console.log(dollars)
  } else {
    return '$' + dollars
  }
};
