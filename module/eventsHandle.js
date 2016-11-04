const EventEmitter = require('events');
/**
 * 事件类型
 * task-start
 * task-finish
 * task-progress
 * task-error
 * task-halt
 * task-warn
 * task-info
 * file-info
 * file-save
 * file-import
 * file-error
 * 
 */

/**
 * 事件控制器
 * 
 * @class EventsHandle
 * @extends {EventEmitter}
 */

class EventsHandle extends EventEmitter {
  constructor(option){
    super();
    this.setOption(option);
  };
  setOption(option){
    for(let key in option){
      if(this[key]){
        this[key] = option[key];
      }
    }
  };
  addListener(){
    this.on('task-start', (msg, data) => {
      if(this.taskStartCallback){
        this.taskStartCallback(msg, data);
      }
    });
    this.on('task-finish', (msg, data) => {
      if(this.taskFinishCallback){
        this.taskFinishCallback(msg, data);
      }
    });
    this.on('task-progress', (msg, data) => {
      if(this.taskProgressCallback){
        this.taskProgressCallback(msg, data);
      }
    });
    this.on('task-error', (msg, data) => {
      if(this.taskErrorCallback){
        this.taskErrorCallback(msg, data);
      }
    });
    this.on('task-halt', (msg, data) => {
      if(this.taskHaltCallback){
        this.taskHaltCallback(msg, data);
      }
    });
    this.on('task-warn', (msg, data) => {
      if(this.taskWarnCallback){
        this.taskWarnCallback(msg, data);
      }
    });
    this.on('task-info', (msg, data) => {
      if(this.taskInfoCallback){
        this.taskInfoCallback(msg, data);
      }
    });
    this.on('file-info', (msg, data) => {
      if(this.fileInfoCallback){
        this.fileInfoCallback(msg, data);
      }
    });
    this.on('file-save', (msg, data) => {
      if(this.fileSaveCallback){
        this.fileSaveCallback(msg, data);
      }
    });
    this.on('file-import', (msg, data) => {
      if(this.fileImportCallback){
        this.fileImportCallback(msg, data);
      }
    });
    this.on('file-error', (msg, data) => {
      if(this.fileErrorCallback){
        this.fileErrorCallback(msg, data);
      }
    });
  };
};


module.exports = EventsHandle;