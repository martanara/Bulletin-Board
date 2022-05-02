const utils = {};

utils.dateToStr = function(dateObj){
  return dateObj.toISOString().slice(0, 10);
};

export default utils;
