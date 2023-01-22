class Solution:
    def missingNumber(self, nums: List[int]) -> int:
      total = len(nums)
      
      start = 0
      
      while start <= total:
        if start not in nums:
          return start
        elif total not in nums:
          return total
        
        total -= 1
        start += 1
        
      