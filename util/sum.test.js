const { sum, sumArray } = require("./sum.js");

describe("Sum.js", () => {
    it("Add two numbers", () => {
        expect(sum(-1, 2)).toBe(1)
    })

    it("Sum and array", () => {
        expect(sumArray([1,3,4,5,8])).toEqual(21)
    })
})

test("add two numbers", () => {
    expect(sum(1, 2)).toBe(3)
})

test("add an array", () => {
    expect(sumArray([1,3,4,5,6])).toEqual(19)
})