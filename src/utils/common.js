function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function getArrayObjectValue(array) {
  const list = [];
  array.map((item) => {
    let value = Object.values(item);
    list.push(value[1]);
  });

  return list;
}

function dateToString(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatMoney(money) {
  return new Intl.NumberFormat('fr-FR').format(money)
}

const formatDate = (date) => {
  var datefo = new Date(date);
  var dd = datefo.getDate();

  var mm = datefo.getMonth() + 1;
  var yyyy = datefo.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  datefo = dd + "-" + mm + "-" + yyyy;
  return datefo;
};


function numberWithCommas(x) {
  console.log(x);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { getArrayObjectValue, union, not, intersection,dateToString,formatDate, formatMoney,  numberWithCommas};
