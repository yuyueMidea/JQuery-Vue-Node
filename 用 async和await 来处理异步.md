## 用 async/await 来处理异步
    
    先说一下async的用法，它作为一个关键字放到函数前面，用于表示函数是一个异步函数，因为async就是异步的意思， 异步函数也就意味着该函数的执行不会阻塞后面代码的执行。 写一个async 函数
    async function timeout() {
      return 'hello world'
    }
    console.log(timeout());
    console.log('虽然在后面，但是我先执行')
    //Promise {<resolved>: "hello world"}
    原来async 函数返回的是一个promise 对象，如果要获取到promise 返回值，我们应该用then 方法， 继续修改代码
    
    timeout().then(result => {
        console.log(result);
    })
    //hello world
    这时，你可能注意到控制台中的Promise 有一个resolved，这是async 函数内部的实现原理。如果async 函数中有返回一个值 ,当调用该函数时，内部会调用Promise.solve() 方法把它转化成一个promise 对象作为返回，但如果timeout 函数内部抛出错误呢？ 那么就会调用Promise.reject() 返回一个promise 对象， 这时修改一下timeout 函数
    async function timeout(flag) {
    if (flag) {
        return 'hello world'
    } else {
        throw 'my god, failure'
        }
    }
    console.log(timeout(true))  // 调用Promise.resolve() 返回promise 对象。
    console.log(timeout(false)); // 调用Promise.reject() 返回promise 对象。
    //Promise {<resolved>: "hello world"}
    //Promise {<rejected>: "my god, failure"}
