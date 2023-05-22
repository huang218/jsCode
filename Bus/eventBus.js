class eventBus {
  #events = new Map();
  constructor() {
  }

  // 发布事件
  $on (eventName, callback) {
    if (!this.#events.has(eventName)) {
      this.#events.set(eventName, []);
    }
    this.#events.get(eventName).push(callback);
  }

  // 发布一次事件
  $once (eventName, callback) {
    const once = (...agrs) => {
      callback(...agrs);
      this.$off(eventName);
    }
    this.$on(eventName, once);
  }

  // 订阅事件
  $emit (eventName, ...agrs) {
    if (!this.#events.has(eventName)) return
    this.#events.get(eventName).forEach(callback => callback(...agrs));
  }

  // 取消订阅
  $off (eventName) {
    if (this.#events.get(eventName)) {
      this.#events.delete(eventName);
    }
  }
}
let events = new eventBus();




// even.$on('hjh', (...agrs) => {
//   console.log('hjh', agrs);
// })

// setTimeout(() => {
//   even.$emit('hjh', 1, 2, 3);
// }, 3000)
