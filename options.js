let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// 通过标记所选按钮并保存对按钮单击做出反应
function handleButtonClick(event) {
  // 从先前选择的颜色中删除样式
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // 将按钮标记为选中
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
  chrome.storage.sync.get('initiator', function(result) {
    console.log(result.initiator);
  });
  chrome.storage.sync.remove('initiator',function(){
    console.log("okkkkkkkk");
  });
}

// 为每种提供的颜色向页面添加一个按钮
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    //storage中储存的颜色
    let currentColor = data.color;
    console.log("当前的颜色是："+ currentColor);
    // 对于我们提供的每种颜色...
    for (let buttonColor of buttonColors) {
      // ...创建一个具有该颜色的按钮...
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // ...标记当前选择的颜色...
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
        console.log("标记的按钮："+ button);
      }

      // ...并为单击该按钮时注册一个侦听器
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}

// 通过构造颜色选项初始化页面
constructOptions(presetButtonColors);
