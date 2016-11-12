var Spider = require("./app/spider.js");
var eventsHandler = require("./module/eventsHandler.js");

var fs = require("fs");

var codeImg = document.getElementById("codeImg");
var loginBtn = document.getElementById("login-btn");
var ipSelect = document.getElementById("ip-select");
var enterBtn = document.getElementById("enter-btn");
var resultBtns = document.getElementsByClassName("result-btn");
var progressBarInner = document.getElementById("progress-bar-inner");

var loginStatus = false;
var taskStatus = false;

/**
 * 输出提示信息
 */
var outputPush = function () {
  var list = [];
  var list1 = document.getElementById("output-list-1");
  var list2 = document.getElementById("output-list-2");
  var list3 = document.getElementById("output-list-3");
  var setContent = function (container, level, msg) {
    container.innerHTML = msg;
    container.className = "output-list";
    container.classList.add(level);
  }
  return function (level, msg) {
    list.push({
      level: level,
      msg: msg
    });
    setContent(list1, level, msg);
    if (list[list.length - 2]) {
      setContent(list2, list[list.length - 2].level, list[list.length - 2].msg);
      if (list[list.length - 3]) {
        setContent(list3, list[list.length - 3].level, list[list.length - 3].msg);
      }
    }
  }
}();

var spider = new Spider();

getCodeImg();

eventsHandler.addEventHandle({
  info: function (target, msg, data) {
    outputPush("info", target + ":" + msg);
    console.log(target + ":" + msg);
  },
  error: function (target, msg, data) {
    outputPush("error", target + ":" + msg + (data ? ". Error:" + data.toString() : ""));
    console.log(target + ":" + msg);
    if(target == "spider" && taskStatus){
      taskFinish();
    }
  },
  warn: function (target, msg, data) {
    outputPush("warn", target + ":" + msg);
    console.log(target + ":" + msg);
  },
  progress: function (target, msg, data) {
    progressBarInner.style.width = data + "%";
  },
  finish: function (target, msg, data) {
    outputPush("info", target + ":" + msg);
    console.log(target + ":" + msg);
    taskFinish();
  }
});

codeImg.addEventListener("click", function (e) {
  e.preventDefault();
  getCodeImg();
});
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  login();
});
ipSelect.addEventListener("change", function (e) {
  spider.setIp(ipSelect.value);
  getCodeImg();
});
enterBtn.addEventListener("click", function (e) {
  e.preventDefault();
  enter();
});
[].forEach.call(resultBtns, function (ele) {
  ele.addEventListener("click", function (element, type) {
    return function (e) {
      e.preventDefault();
      if (element.classList.contains("disabled") || element.classList.contains("active")) {
        return;
      }
      taskStart(type);
    }
  }(ele, ele.dataset.type))
});

/**
 * 
 * 获取验证码
 */
function getCodeImg() {
  codeImg.src = "";
  window.URL.revokeObjectURL(codeImg.src);
  spider.requestImg(function (status, data) {
    if (status) {
      fs.writeFileSync("img.jpg", data);
      var img = fs.readFileSync("img.jpg");
      var blob = new Blob([img.buffer], {
        type: "image/jpeg"
      });
      codeImg.src = window.URL.createObjectURL(blob);
    } else {
      outputPush("warn", "验证码获取失败");
    }
  });
}

/**
 * 登陆
 * 
 * @returns
 */
function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var codetext = document.getElementById("codetext").value;
  if (!codetext) {
    outputPush("warn", "请输入验证码");
    return;
  }
  spider.login(username, password, codetext, function (status) {
    if (status) {
      changeLoginStatus(true);
    } else {
      getCodeImg();
    }
  })
}

/**
 * 直接输入cookie和csrftoken进入
 * 
 * @returns
 */
function enter() {
  var cookie = document.getElementById("cookie").value;
  var csrftoken = document.getElementById("csrftoken").value;
  if (!cookie || !csrftoken) {
    outputPush("warn", "请输入cookie和csrftoken");
    return;
  }
  spider.setCookie(cookie);
  spider.setCsrftoken(csrftoken);
  changeLoginStatus(true);
}

function logout(){
  changeLoginStatus(false);
  getCodeImg();
}

function taskStart(type) {
  if(!loginStatus){
    outputPush("info", "请重新登陆");
    logout();
    return;
  }
  if (type) {
    var filePath = "output/";
    switch (type) {
      case '0':
        filePath += "publsn.json";
        break;
      case '1':
        filePath += "pubrequiredlsn.json";
        break;
      case '2':
        filePath += "planlsn.json";
        break;
      case '-1':
        return;
      default:
        outputPush("info", "请输入正确的类型");
        return;
    }
    spider.start(type, filePath);
  }
  [].forEach.call(resultBtns, function (ele) {
    if (ele.dataset.type != type) {
      ele.classList.add("disabled");
    } else {
      ele.classList.add("active");
    }
  });
  taskStatus = true;
}

function taskFinish() {
  [].forEach.call(resultBtns, function (ele) {
      ele.classList.remove("disabled");
      ele.classList.remove("active");
  });
  progressBarInner.style.width = "0";
  taskStatus = false;
}

function changeLoginStatus(status) {
  if (status) {
    loginStatus = status;
    var main = document.getElementById("main");
    main.classList.add("login-success");
  } else {
    loginStatus = false;
    var main = document.getElementById("main");
    main.classList.remove("login-success");
  }
}