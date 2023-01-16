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
          
        return checkSingle(str(total))
      
      return checkSingle(str_num)
          
          
        
        