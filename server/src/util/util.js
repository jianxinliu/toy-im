module.exports = {
    promisify(fn) {
        return function (...args) { // 返回一个包装函数（wrapper-function） (*)
            return new Promise((resolve, reject) => {
                function callback(err, result) { // 我们对 f 的自定义的回调 (**)
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }

                args.push(callback); // 将我们的自定义的回调附加到 f 参数（arguments）的末尾
                fn.call(this, ...args); // 调用原始的函数
            });
        };
    },

    requireNonNull(p, msg = '参数缺失！') {
        if (!p) throw new Error(msg)
    },

    requireNonNulls(ps = [], msg = '参数缺失') {
        for (let p of ps) {
            this.requireNonNull(p, msg);
        }
    }
}
