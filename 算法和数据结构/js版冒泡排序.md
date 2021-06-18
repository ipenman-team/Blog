```js

function bubbleSort(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length; j++){
            if(arr[j]>arr[j+1]){
                [arr[j],arr[j+1]]= [arr[j+1],arr[j]]
            }
        }
    }
    return arr
}
const arr = [1,23,4,5,2,3,3,13,53,13,5,24,5,6,62,34,2,42,2]
const result = bubbleSort(arr)
console.log(result)

```
