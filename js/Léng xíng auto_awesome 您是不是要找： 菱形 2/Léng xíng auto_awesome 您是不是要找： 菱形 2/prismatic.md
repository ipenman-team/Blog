## 两层循环打印空心/实心棱形
效果如下，通过代码中的**isSolid**控制棱形是空心还是实心：
```
     *    
    ***   
   *****  
  ******* 
 *********
  ******* 
   *****  
    ***   
     *    
 
     *    
    * *   
   *   *  
  *     * 
 *       *
  *     * 
   *   *  
    * *   
     *   
```    
代码：
```javascript
        let result = "";
         // 长度为n的空心菱形
         let n = 5;
         // 是否实心
         let isSolid = true;
         // 控制行： 2n - 1
         for (let i = 0; i < n * 2 - 1; i++) {
             let tmp = i;
             // 如果行号超过n，变换星号位置
             if (i >= n) {
                 tmp = n * 2 - i - 2;
             }
             // 左边星号
             let left = n - tmp;
             // 右边星号
             let right = n + tmp;

             // 打印星号或者空格
             for (let j = 0; j < n * 2; j++) {
                 if ((j == left || j == right) || (isSolid && j > left && j < right)) {
                     result += "*";
                 } else {
                     result += "&ensp;";
                 }
             }
             result += "<br>";
         }
         document.write(result);
```
