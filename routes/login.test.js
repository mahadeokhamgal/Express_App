const request = require('supertest');
const app = require("../server.js");

describe("User should be able to login", () => {
    it("/LOGIN POST Check", async () => {
        console.log("post api test");
    
        const response = await request(app).post("/login")
        .send({ username:"mahadeo", email:"email@email.com", password:"root" });

        expect(response.status).toBe(200)

        expect(response.body.message).toBe("Login successfull!");
    })
})