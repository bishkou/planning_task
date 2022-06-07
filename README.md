<h1 align="center">Welcome to Back-End Take Home Test 👋</h1>
<p>
  <a href="/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>



### 🏠 [Homepage]()

## Run

```sh
npm install

npm start
```
**Install the dependencies first using npm install**<br>
**After that run npm start to start the server**

## Project Setup
**You will need to add a .env file in the root of the project and provide your Mongodb Uri to connect to the database**<br>
```txt
Example:
    MONGO_URI=mongodb+srv://example:example@example.0m1iycb.mongodb.net/?retryWrites=true&w=majority

```
***The server is running on Port 3000, once it's up, it will connect to a MongoDB cluster with the Database URI is provided 
in .env file***

## Important

-**A worker has multiple shifts, each shift has only one worker, shifts can have the same 'work_date'
but can't have the same 'work_date' and 'worker'**<br>
-**To represent the 24 hour timetable I used an array, element 0 of the array day_shifts (shift model)
represents the time 0-8 , element 1 represents 8-16 and element 16-24**<br>
-**if an element of the array day_shift is true, that means the worker has a shift on that time, 
day_shifts array can never have 2 true element in it**<br>
-**The packages I used for the tests are Jest and Supertest along with mongodb-memory-server to store data in memory**

## Project Endpoints

***addOneWorker***

```js
/**
 * @body? {string} name
 * @method POST
 * @example
 * request url: http://localhost:3000/api/worker
 * @returns {
    "name": "examplename",
    "shifts": [],
    "id": "629f0f650ec517959546487f"
}
 */

```
***EditOneWorker*** :

```js
/**
 * @body? {string} name
 * @params? {string} id
 * @method PATCH
 * @example
 * request url: http://localhost:4000/api/worker/629f0f650ec517959546487f
 */


```

***addOneShift*** :

```js
/**
 * @body? {string} worker_id
 * @body? {date} work_date
 * @body? {array} day_shifts
 * @body? {boolean} is_weekend
 * @body? {boolean} is_holiday
 * @method POST
 * @example
 * request url: http://localhost:3000/api/shift
 * @returns {
    "work_date": "2022-06-01T00:00:00.000Z",
    "day_shifts": [
        false,
        false,
        false
    ],
    "worker": "629f0f650ec517959546487f",
    "is_holiday": false,
    "is_weekend": true,
    "id": "629f10a00ec5179595464883"
}
 */

```

***editOneShift*** :

```js
/**
 * @body? {string} worker_id
 * @body? {array} day_shifts
 * @body? {boolean} is_weekend
 * @body? {boolean} is_holiday
 * @method PATCH
 * @example
 * request url: http://localhost:3000/api/shift/629f10a00ec5179595464883
 * @returns 'Shift updated Successfully' ´
 */

```


## Author

👤 **Chedy**

* Github: [@bishkou](https://github.com/bishkou)
* LinkedIn: [@chedyhm](https://linkedin.com/in/chedyhm)

