## 用 async/await 来处理异步
    
**先说一下async的用法，它作为一个关键字放到函数前面，用于表示函数是一个异步函数，因为async就是异步的意思， 异步函数也就意味着该函数的执行不会阻塞后面代码的执行。 写一个async 函数**

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
    
**这时，你可能注意到控制台中的Promise 有一个resolved，这是async 函数内部的实现原理。如果async 函数中有返回一个值 ,当调用该函数时，内部会调用Promise.solve() 方法把它转化成一个promise 对象作为返回，但如果timeout 函数内部抛出错误呢？ 那么就会调用Promise.reject() 返回一个promise 对象， 这时修改一下timeout 函数**

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

**async 关键字差不多了，我们再来考虑await 关键字，await是等待的意思，那么它等待什么呢，它后面跟着什么呢？其实它后面可以放任何表达式，不过我们更多的是放一个返回promise 对象的表达式。注意await 关键字只能放到async 函数里面**

        // 2s 之后返回双倍的值
    function doubleAfter2seconds(num) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(2 * num)
            }, 2000);
        } )
    }
    
 **现在再写一个async 函数，从而可以使用await 关键字， await 后面放置的就是返回promise对象的一个表达式，所以它后面可以写上 doubleAfter2seconds 函数的调用**
 
    async function testResult() {
    let result = await doubleAfter2seconds(30);
        console.log(result);
    }
    现在调用testResult 函数
    testResult();
    打开控制台，2s 之后，输出了60.
    
**现在我们看看代码的执行过程，调用testResult 函数，它里面遇到了await, await 表示等一下，代码就暂停到这里，不再向下执行了，它等什么呢？等后面的promise对象执行完毕，然后拿到promise resolve 的值并进行返回，返回值拿到之后，它继续向下执行。具体到 我们的代码, 遇到await 之后，代码就暂停执行了， 等待doubleAfter2seconds(30) 执行完毕，doubleAfter2seconds(30) 返回的promise 开始执行，2秒 之后，promise resolve 了， 并返回了值为60， 这时await 才拿到返回值60， 然后赋值给result， 暂停结束，代码才开始继续执行，执行 console.log语句。**

          async function testResult() {
                let first = await doubleAfter2seconds(30);
                let second = await doubleAfter2seconds(50);
                let third = await doubleAfter2seconds(30);
                console.log(first + second + third);
            }
            
 **6秒后，控制台输出220, 我们可以看到，写异步代码就像写同步代码一样了，再也没有回调地域了。**
