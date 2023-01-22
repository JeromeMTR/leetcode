class Solution:
    def missingNumber(self, nums: List[int]) -> int:
      total = len(nums)
      
      start = 0
      
      while start <= total:
        if start not in nums:
          return start
        
        start += 1
        