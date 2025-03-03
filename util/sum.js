function sum(a, b) {
    return a + b;
}

function sumArray(arr){
    let ans = 0;
    for(let i of arr){
        ans += i
    }
    return ans;
}

module.exports = { sum, sumArray};