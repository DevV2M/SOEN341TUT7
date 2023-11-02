// bring in other files via require
const {sum, deleteUserById, findUserById} = require("../utils/helper")

let userdata = [];
console.log(userdata, 'before all functions')

// Runs before all tests
beforeAll(()=>{
    userdata = ['Vithu','Sarah'];
    console.log("running before all test", userdata)
})

// Runs before every single test (i.e. connecting/subscribing to APIs/services)
beforeEach(()=>{
    console.log("running before each test")
})

// Runs after every single test (i.e. disconnecting/unsubscribing to APIs/services)
afterEach(()=>{
    console.log("running after each test")
})

// Runs after all tests
afterAll(()=>{
    userdata = []; // delete data from database after all tests
    console.log("running after all test",userdata)
})

describe("Number Operations", ()=>{
    test("1 plus 1 should be equal to 2", ()=>{
        let a = 1;
        let b = 1;
        expect(a + b).toBe(2)
    })
    
    test("5 plus 6 is not equal to 10",()=>{
        a = 5;
        b = 6;
    
        expect(a+b).not.toBe(10);
        // you can have multiple expectations per test
    })
})

describe("Testing other matcher methods",()=>{

    test("Testing that a variable is undefined", ()=>{

        let number = undefined;

        expect(number).not.toBeDefined();
        expect(number).toBeUndefined();
        expect(number).not.toBeNull();
        expect(number).toBeFalsy();
        expect(number).not.toBeTruthy();
    })

    it("Should expect zero to act like zero", ()=>{
        let number = 0;
        expect(number).toBeDefined();
        expect(number).not.toBeUndefined();
        expect(number).not.toBeNull();
        expect(number).toBeFalsy();
        expect(number).not.toBeTruthy();
    })

    test("Number Comparison", ()=>{
        const a = 1;
        const b = 2;

        expect(a + b).toBeGreaterThan(2);
        expect(a + b).toBeGreaterThanOrEqual(3);
        expect(a + b).toBeLessThan(10);
        expect(a + b).toBeLessThanOrEqual(3);
    })

    test("there should be no I in team", ()=>{
        let string = 'team';
        expect(string).not.toMatch(/I/); //takes either a string or a regex
    })

    test("there is 'stop' in Christopher",()=>{
        let string = 'Christopher';
        expect(string).toMatch(/stop/); // add i at the end to make case insensitive
    })

    const shoppingList = ["Milk", "Apples", "Cookies", "Oranges"];

    test("the shopping list doesn't have Bread", ()=>{
        // this matcher is case insensitive
        expect(shoppingList).not.toContain('Bread')
        expect(shoppingList).toContain('Milk')
    })
})

// reference types are arrays and objects
describe("Testing Reference Type Equality", ()=>{
    const user = {
        name: "Vithu"
    }
    user['age'] = 94;

    test("Should return a user object with age as 94", ()=>{
        
        // this will fail, as it used for primitive types only.
        // expect(user).toBe({name: "Vithu", age: 94})

        // we need to use toEqual
        expect(user).toEqual({name: "Vithu", age: 94})

    })

    // we don't care what value the object contains but returns a String and a Number indeed
    test("Should return a user with a name and age key", ()=>{
        
        expect(user).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                age: expect.any(Number),
            })
        )
    })

    // TESTING ARRAY EQUALITY

    test("Array equality", ()=>{

        const users = [
            "Vithu",
            "Tom",
            "Sara"
        ]

        users.push("John");

        expect(users).toEqual(["Vithu","Tom","Sara","John"])
        expect(users).toEqual(expect.arrayContaining(["John"]));
        expect(users).toEqual(expect.arrayContaining([expect.any(String)]));

        const userObjectInArray = [
            {
                user: "Vithu",
                age: "40",
            },
            {
                user: "Tom",
                age: "15",
            },
            {
                user: "Sara",
                age: "27",
            },
        ]

        userObjectInArray.push({
            name: "Sandra",
            age: 29
        })

        expect(userObjectInArray).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    age: expect.any(Number)
                })
            ])
        )
    })
})

describe("Testing imported functions", () => {
    test("Sum function should add 2 numbers", () => {
        expect(sum(5,4)).toBe(9)
    })

    let users = [
        {
            user: "Vithu",
            age: "40",
            id: 1,
        },
        {
            user: "Tom",
            age: "15",
            id: 2,
        },
        {
            user: "Sara",
            age: "27",
            id: 3,
        },
    ]

    test("delete by id function should delete a user by id", ()=>{
        

        expect(deleteUserById(users, 3)).toEqual([
            {
                user: "Vithu",
                age: "40",
                id: 1,
            },
            {
                user: "Tom",
                age: "15",
                id: 2,
            },
        ])

    })

    // done by TDD
    test("Find a user by ID from a list of users", ()=>{
        expect(findUserById(users, 2)).toEqual(
            {
                user: "Tom",
                age: "15",
                id: 2,
            }
        )
        expect(findUserById(users, 10)).toBeUndefined();

        expect(deleteUserById(users, 3).length).toBe(2);
    })
})