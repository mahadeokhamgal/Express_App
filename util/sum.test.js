const { sum, sumArray } = require("./sum.js");

test("add two numbers", () => {
    expect(sum(1, 2)).toBe(3)
})

test("add an array", () => {
    expect(sumArray([1,3,4,5,6])).toEqual(19)
})