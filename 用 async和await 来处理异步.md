## 用 async/await 来处理异步

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
