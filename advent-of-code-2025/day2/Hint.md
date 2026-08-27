
```
11-22 has two invalid IDs, 
11 and 22. 95-115 has one invalid ID, 
99. 998-1012 has one invalid ID, 
1010. 1188511880-1188511890 has one invalid ID, 
1188511885. 222220-222224 has one invalid ID, 
222222. 1698522-1698528 contains no invalid IDs. 446443-446449 has one invalid ID, 
446446. 38593856-38593862 has one invalid ID, 
38593859. The rest of the ranges contain no invalid IDs. Adding up all the invalid IDs in this example produces 1227775554.
```

From the above example, I found that every invalid ID is divisible by 11.
- So we need check if it's divisible by 11 or not
- increment using 11
- only even digit range