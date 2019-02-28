// Algorithm Question #2
// Given two arrays of characters, return an array that contains all of 
// the unique characters from the second array (characters that are in the 
// second array but NOT the first array) as well as which characters 
// in the second array show up most frequently (there could be multiple). Please 
// return the data in the format of the example result;
//
// EX: 
a1 = ['a', 'b', 'c', 'e', 'j', 'f']
a2 = ['a', 'a', 'f', 'b', 'g', 'r', 'e', 'f', 't']
//
// RESULT:
// let result = {
//   unique: ['g', 'r', 't'],
//   frequent: ['a', 'f']
// };

function uniqueAndFrequent(arr1, arr2) {
  let result = {
    unique: [],
    frequent: []
  }

  let letterCount = {}
  let highestCount = 0

  for (i = 0; i < arr2.length -1; i++) {
      
      !letterCount[arr2[i]] ? letterCount[arr2[i]] = 1 : letterCount[arr2[i]] += 1;
      console.log(letterCount);
      if(highestCount <= letterCount[arr2[i]]) {
        highestCount = letterCount[arr2[i]];
      }
      if(!arr1.includes(arr2[i])) {
          result.unique.push(arr2[i])
      }
  }

  result.frequent.push(Object.values(letterCount).filter(val => val == highestCount));
  return result;
}
