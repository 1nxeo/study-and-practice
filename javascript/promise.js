const PROMISE_STATE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

class SimplePromise {
    constructor(executor){
        this._state = PROMISE_STATE.PENDING;
        this._value = undefined;
        this._onFulfilled = [];
        this._onRejected = [];

        const resolve = (value) => {
            if(this._state !== PROMISE_STATE.PENDING) return;
            this._state = PROMISE_STATE.FULFILLED;
            this._value = value;
            this._onFulfilled.forEach(callback => callback(value))
        }

        const reject = (reason) => {
            if(this._state !== PROMISE_STATE.PENDING) return;
            this._state = PROMISE_STATE.REJECTED;
            this._value = reason;
            this._onRejected.forEach(callback => callback(reason))
        }

        try{
            executor(resolve, reject);
        }catch(e){
            reject(e)
        }
    }

    static all(promises){
        return new Promise((resolve, reject) => {
            let results = [];
            let remaining = promises.length;

            promises.forEach((promise, index) => {
                promise.then((value) => {
                    results[index] = value;
                    remaining--;
                    if(remaining === 0) resolve(results)
                })
            })
        })
    }
}

SimplePromise.prototype.then = function(onFulFilled, onRejected){
    return new SimplePromise((resolve, reject) => {
        const handleFulfilled = (value) => {
            try{
                const result = onFulFilled ? onFulFilled(value) : value;
                if(result instanceof SimplePromise){
                    return result.then(resolve, reject)
                }

                return resolve(result)
            }catch(e){
                reject(e)
            }
        }

        const handleRejected = (reason) => {
            try{
                const result = onRejected ? onRejected(reason) : reason;

                if(result instanceof SimplePromise){
                    return result.then(resolve, reject)
                }

                return resolve(result)
            }catch(e){
                reject(e)
            }
        }

        if(this._state === PROMISE_STATE.PENDING){
            this._onFulfilled.push(handleFulfilled);
            this._onRejected.push(handleRejected);
        }

        if(this._state === PROMISE_STATE.FULFILLED){
            handleFulfilled(this._value)
        }

        if(this._state === PROMISE_STATE.REJECTED){
            handleRejected(this._value)
        }
    })
}

SimplePromise.prototype.catch = function(onRejected){
    return this.then(null, onRejected)
}

SimplePromise.prototype.finally = function(onFinally){
    return new SimplePromise((resolve, reject) => {
        const handleFinally = () => {
            try{
                onFinally();
                if(this._state === PROMISE_STATE.FULFILLED){
                    return resolve(this._value)
                }

                if(this._state === PROMISE_STATE.REJECTED){
                    return reject(this._value)
                }
            }catch(e){
                reject(e)
            }
        }

        if(this._state === PROMISE_STATE.PENDING){
            this._onFulfilled.push(handleFinally);
            this._onRejected.push(handleFinally);

            return;
        }
        
        return handleFinally();
    })
}


// Example usage #1:
    console.time('total')
    const promise1 = new SimplePromise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello, World!');
            console.time('start')
        }, 1000);
    });
    
    promise1
        .then((value) => {
        console.log(value); // "Hello, World!"
        console.timeEnd('start');
            return new SimplePromise((resolve, reject) => {
                setTimeout(() => {
                    resolve('Next value');
                    console.time('second')
                }, 1000);
            });
        })
        .then((value) => {
            console.log(value); // "Next value"
            console.timeEnd('second');
                return new SimplePromise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('Final value');
                        console.time('third')
                    }, 1000);
            });
        })
        .then((value) => {
            console.timeEnd('third');
            console.log(value); // "Final value"
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            console.log('Done');
            console.timeEnd('total')
        });

    // 결과:
    // "Hello, World!"
    // "Next value"
    // "Final value"
    // "Done"

    // Example usage #2: counting time just for fun
    const timestamps = [];
    const start = performance.now();
    timestamps.push(start);

    const promise2 = new SimplePromise((resolve) => {
    setTimeout(() => {
        resolve('Hello, World!');
        const firstStep = performance.now();
        timestamps.push(firstStep);
    }, 1000);
    });

    promise2
    .then((value) => {
        console.log(value); // "Hello, World!"
        
        return new SimplePromise((resolve) => {
        setTimeout(() => {
            resolve('Next value');
            const secondStep = performance.now();
            timestamps.push(secondStep);
        }, 1000);
        });
    })
    .then((value) => {
        console.log(value); // "Next value"
        
        return new SimplePromise((resolve) => {
        setTimeout(() => {
            resolve('Final value');
            const thirdStep = performance.now();
            timestamps.push(thirdStep);
        }, 1000);
        });
    })
    .then((value) => {
        console.log(value); // "Final value"
    })
    .finally(() => {
        const end = performance.now();
        timestamps.push(end);

        console.log('Done');

        console.log(`First Step Duration: ${(timestamps[1] - timestamps[0]).toFixed(2)} ms`);
        console.log(`Second Step Duration: ${(timestamps[2] - timestamps[1]).toFixed(2)} ms`);
        console.log(`Third Step Duration: ${(timestamps[3] - timestamps[2]).toFixed(2)} ms`);
        console.log(`Total Duration: ${(timestamps[3] - timestamps[0]).toFixed(2)} ms`);
    });

    // 결과:
    // "Hello, World!"
    // "Next value"
    // "Final value"
    // "Done"
    // First Step Duration: 1002.20 ms
    // Second Step Duration: 1002.00 ms
    // Third Step Duration: 1002.00 ms
    // Total Duration: 3006.20 ms