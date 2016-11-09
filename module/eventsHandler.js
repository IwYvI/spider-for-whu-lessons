const EventEmitter = require('events');
/**
 * 事件类型
 * 
 * info
 * warn
 * error
 * 
 * start
 * finish
 * 
 */

/**
 * 事件控制器
 * 
 * @class EventsHandle
 * @extends {EventEmitter}
 */

class EventsHandler extends EventEmitter {
  constructor() {
    super();
    this.events = {};
    this.option = {};
  };
  setOption(option) {
    for (let key in option) {
      if (this.option[key]) {
        this.option[key] = option[key];
      }
    }
  };
  _addListener(eventName) {
    if (!eventName) {
      return;
    }
    this.on(eventName, (target, msg, data) => {
      if (this.events[eventName]) {
        this.events[eventName].forEach((fun) => {
          fun(target, msg, data);
        });
      }
    });
  };
  addEventHandle(handles) {
    for (let eventName in handles) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
        this._addListener(eventName);
      }
      this.events[eventName].push(handles[eventName])
    }
  }
};
var eh = new EventsHandler();


module.exports = eh;