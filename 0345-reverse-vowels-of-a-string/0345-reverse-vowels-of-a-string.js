/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let sArr = s.split('');
    let left = 0,
        right = sArr.length - 1;
  
    while (left < right) {
        if (vowels.includes(sArr[left].toLowerCase()) && vowels.includes(sArr[right].toLowerCase())) {
            let temp = sArr[left];
            sArr[left] = sArr[right];
            sArr[right] = temp;
            left++;
            right--;
            continue;
        }
        if (vowels.includes(sArr[left].toLowerCase())) {
            right--;
            continue;
        }
        if (vowels.includes(sArr[right].toLowerCase())) {
            left++;
            continue;
        }
        left++;
        right--;
    }
    return sArr.join('');
};