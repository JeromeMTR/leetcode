/**
 * @param {string} s
 * @return {string}
 */
var longestNiceSubstring = function(s) {
  // i = string input
  // o = longest happy substring
  // c = find solution and then optimize
  // e = assume that s will be equal to or greater than 1, s consists of uppercase and lowercase letters, if string is less than 2 return empyt string
//   if (s.length === 1) return '';
  
//   const tracker = new Map();
//   let string = '';
//   let front = 0;
  
//   for (let i = 0; i < s.length; i++) {
//     if (!tracker.has(s[i])) tracker.set(s[i], 1);
//     else tracker.set(s[i], tracker.get(s[i]) + 1);
//     console.log(tracker);
//     if (tracker.size < 2) continue;
//     if (!tracker.has(s[i].toUpperCase()) || !tracker.has(s[i].toLowerCase())) {
//       while (front < i) {
//         let num = tracker.has(s[i]);
//         if (num == 0) tracker.delete(s[front]);
//         else tracker.set(s[front], num - 1);
//         console.log('hi', tracker);
//         front++;
//       }
//     }
//     if (tracker.has(s[i].toUpperCase()) && 
//         tracker.has(s[i].toLowerCase()) &&
//         i + 1 - front > string.length
//        ) string = s.slice(front, i + 1);
//   }
//   return string;
  if (s.length < 2) return "";

		const obj = {};

		for (const i of s) obj[i] = i;

		for (let i = 0; i < s.length; i++) {
			const element = s[i];

			if (obj[element.toUpperCase()] && obj[element.toLowerCase()]) continue;

			const prev = longestNiceSubstring(s.substring(0, i));
			const next = longestNiceSubstring(s.substring(i + 1));

			return prev.length >= next.length ? prev : next;
		}

		return s;
};