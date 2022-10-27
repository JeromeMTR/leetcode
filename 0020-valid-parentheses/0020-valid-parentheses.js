/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  // i = paran string
  // o = true or false depending on if it closing 
  // c = find solution and then optmize
  // e = assume that string consist of only parantheses
  
  let stack=[];

  for(let i=0; i<s.length; i++) {
    let top = stack[stack.length-1];
    
    if(s[i]=="(" || s[i]=="[" || s[i]=="{"){
        stack.push(s[i]);
    }
    
    else if(s[i]==")" && top=="(" ){
        stack.pop()
    }
    else if(s[i]=="]" && top=="[" ){
        stack.pop()
    }
    else if(s[i]=="}" && top=="{" ){
        stack.pop()
    }
    else{
         return false
    }
 
  }
   return stack.length==0
};