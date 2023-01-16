class Solution:
    def addDigits(self, num: int) -> int:
      
      str_num = str(num)
      
      # create recursive function 
      
      def checkSingle(string: str) -> str:
        if len(string) == 1:
          return int(string)
      
        total = 0
        
        for letter in string:
          total += int(letter)
          
        cur_string = str(total)
        
        return checkSingle(cur_string)
      
      return checkSingle(str_num)
          
          
        
        