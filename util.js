if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
  };
}

if (!Math.arrayMax) {
  Math.arrayMax = function(array) {
    return Math.max.apply(Math, array);
  };
}

if (!Math.arrayMix) {
  Math.arrayMin = function(array) {
    return Math.min.apply(Math, array);
  };
}

function round(value, decimalPlaces) {
  var factor = Math.pow(10, decimalPlaces);
  return parseFloat(Math.round(value * factor) / factor).toFixed(decimalPlaces);
}

function join(array1, array2) {
  return array1.map(function(x, i) {return [x, array2[i]]})
}

function parseTestData(testdata) {
  return Object
    .values(
      _.groupBy(testdata, function(data) {return data.id + data.type + data.eye + data.condition + data.VA}))
      .map(function(item) { return item.reduce(function(acc, item) {
        acc.id = item.id;
        acc.type = item.type;
        acc.title = ['BCVA', '+1 D', '+2 D', '+3 D'][item.condition];
        acc.eye = item.eye;
        acc.subjective_va = item.VA;
        acc.spatial_frequencies.push(item.sf);
        acc.amplitudes.push(item.amplitude);
        return acc;
      }, {id: 0, type:"", title:"", eye:"", subjective_va:0, spatial_frequencies: [], amplitudes: []})})
  ;
}