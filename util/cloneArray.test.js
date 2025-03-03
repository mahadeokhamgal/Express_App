const cloneArray = require("./cloneArray")

test("Check array is cloned deep", () => {
    let arr = [1,3,45,6];
    expect(cloneArray(arr)).toEqual(arr)
    expect(cloneArray(arr)).not.toBe(arr)
})