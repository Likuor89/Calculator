class Logger {
  constructor() {
    this.render()
    this.bindHandlers()
    this.log("Hello!")
  }

  render() {
    this.el = document.createElement("div")
    Object.assign(this.el.style, {
      backgroundColor: "black",
      color: "white",
      padding: "5px",
      position: "fixed",
      right: "0",
      bottom: "0",
      width: "600px",
      height: "50px"
    })
    document.body.appendChild(this.el)
  }

  bindHandlers() {
    this.el.addEventListener("click", this.onLoggerClick.bind(this), false)
    document.addEventListener("click", this.onDocumentClick.bind(this), false)
  }

  log(msgText) {
    let msg = document.createElement("div")
    msg.innerText = msgText;
    if (this.lastMsg) {
      this.el.insertBefore(msg, this.lastMsg);
    }
    else {
      this.el.appendChild(msg);
    }
    this.lastMsg = msg;
  }

  onLoggerClick(evt) {
    evt.stopPropagation();
    let style
    if (this.el.style.height == "50px") {
      style = {
        height: "400px",
        overflow: "auto"
      }
    }
    else {
      style = {
        height: "50px",
        overflow: "hidden"
      }
    }
    Object.assign(this.el.style, style);
  }

  onDocumentClick(evt) {
    this.log("Click on " + evt.target.tagName + " with id = " + evt.target.id + " and class = " + evt.target.className);
  }
};
let logger = new Logger();

var creatCalcs = document.getElementById('crateCalc');
creatCalcs.addEventListener('click', past);

var tests = document.getElementById('test');
var saveCalc;

function past() {

  var Lis = document.createElement('li');
      Lis.setAttribute('class', 'calc-item');
      Lis.innerHTML='<div id="calc" class="calc" ><div id="closeBtn"">X</div><div class="calc__display"><input disabled id="display" type="text" value="0" name="" class="calc_display-input" placeholder="000000000"></div><div class="calc__buttons" id="calcButtons"><table class="calc__table"><tr class="calc__buttons-row"><td><button name="ce" type="button" id="ce" class="btn claer_btn">ce</button></td><td><button name="c" type="button" id="c" class="btn claer_btn">c</button></td><td><button name="*" value="умножить" type="button" class="btn operation">*</button></td><td><button name="/" value="разделить" type="button" class="btn operation">/</button></td></tr><tr class="calc__buttons-row"><td><button name="7" type="button" class="number btn">7</button></td><td><button name="8" type="button" class="number btn">8</button></td><td><button name="9" type="button" class="number btn">9</button></td><td><button name="-" value="вычесть" type="button" class="btn operation">-</button></td></tr><tr class="calc__buttons-row"><td><button name="4" type="button" class="number btn">4</button></td><td><button name="5" type="button" class="number btn">5</button></td><td><button name="6" type="button" class="number btn">6</button></td><td><button name="+" value="сложить" type="button" class="btn operation">+</button></td></tr><tr class="calc__buttons-row"><td><button name="1" type="button" class="number btn">1</button></td><td><button name="2" type="button" class="number btn">2</button></td><td><button name="3" type="button" class="number btn">3</button></td><td rowspan="2" class="td-btn_tall"><button name="=" value="равно" type="button" id="result" class="btn btn_tall operation">=</button></td></tr><tr class="calc__buttons-row"><td colspan="2"><button name="0" type="button" class="btn btn_long number">0</button></td><td><button name="." type="button" class="btn" id="decimal">.</button></td></tr></table></div><div class="info"><h1 class="title">Calc</h1><div class="about"><a href="#" id="howWorkBtn" class="about__btn-link">Info Calc</a></div><div><ul id="operationList"></ul></div></div></div>';
      tests.appendChild(Lis);

      var closeBtns = Lis.querySelector('#closeBtn');
      closeBtns.addEventListener('click', function (e) {
        tests.removeChild(Lis);
      });

      var clickBtn = Lis.querySelector('#calc'),
          display = Lis.querySelector('#display'),
          memoryCurrentNumber = 0,
          memoryNewNumber = false,
          memoryPendingOperation = '',
          operationList = Lis.querySelector('#operationList');



      clickBtn.addEventListener('click', function(e){
        if (e.target.classList.contains('number') == true) {
          numberPress(e.target.textContent);
        } else if (e.target.classList.contains('operation') == true) {
          operation(e.target.textContent);
        } else if (e.target.className == 'btn claer_btn') {
          clear(e.srcElement.id);
        } else if (e.target.id == 'decimal') {
          decimal();
        } else if (e.target.id == 'howWorkBtn') {
          howWork();
        } else {

        };
        activate(e);

        if (saveCalc != null){
          saveCalc.className = "calc";
        }
        saveCalc = e.currentTarget;
        saveCalc.className = "calc active";
      });

      function activate(e) {
        let calcAct = e.currentTarget;
        calcAct.setAttribute('class', 'calc active');
      };

      function howWork(){
        if (operationList.childNodes.length>1) {
          operationList.innerHTML = "";
        } else {
          let operations = Lis.querySelectorAll('.operation');
          for (var i = 0; i < operations.length; i++) {
            let newLi = document.createElement('li');
            let operationText = operations[i].value;
            newLi.innerText = operationText;
            operationList.appendChild(newLi);
          };
        };
      };

      function numberPress(number){
        if (memoryNewNumber) {
          display.value = number;
          memoryNewNumber = false;
        } else {
          if (display.value === '0') {
            display.value = number;
          } else {
            display.value += number;
          };
        };
      };

      function operation(op){
        var localOperationMemory = display.value;
        if (memoryNewNumber && memoryPendingOperation !== '=') {
          display.value = memoryCurrentNumber;
        } else {
          memoryNewNumber = true;
          if (memoryPendingOperation ==='+') {
            memoryCurrentNumber += parseFloat(localOperationMemory);
          } else if (memoryPendingOperation === '-') {
            memoryCurrentNumber -= parseFloat(localOperationMemory);
          } else if (memoryPendingOperation === '*') {
            memoryCurrentNumber *= parseFloat(localOperationMemory);
          } else  if(memoryPendingOperation === '/') {
            memoryCurrentNumber /= parseFloat(localOperationMemory);
          } else {memoryCurrentNumber = parseFloat(localOperationMemory);
          };
          display.value = memoryCurrentNumber;
          memoryPendingOperation = op;
        };
      };

      function decimal(){
        var localDecimalMemory = display.value;
        if (memoryNewNumber) {
          localDecimalMemory = '0.';
          memoryNewNumber = false;
        } else {
          if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
          };
        };
        display.value = localDecimalMemory;
      };

      function clear(id){
        if (id === 'ce') {
          display.value = '0';
          memoryNewNumber = true;
        } else if (id === 'c') {
          display.value = '0';
          memoryNewNumber = true;
          memoryCurrentNumber = 0;
          memoryPendingOperation = '';
        };
      };


      var block = Lis.querySelector('#calc'),

      delta_x = 0,
      delta_y = 0;

      block.onmousedown = saveXY;
      block.addEventListener('onmousedown', saveXY, false);

      Lis.onmouseup = clearXY;
      function saveXY(obj_event) {
        if (obj_event) {
          x = obj_event.pageX;
          y = obj_event.pageY;
        } else {
          x = window.event.clientX;
          y = window.event.clientY;
        };
        x_block = block.offsetLeft;
        y_block = block.offsetTop;
        delta_x = x_block - x;
        delta_y = y_block - y;
        Lis.onmousemove = moveBlock;
        Lis.addEventListener ('onmousemove', moveBlock, false);
      };

      function clearXY() {
        Lis.onmousemove = null;
      };

      function moveBlock(obj_event) {
        if (obj_event) {
          x = obj_event.pageX;
          y = obj_event.pageY;
        }
        else {
          x = window.event.clientX;
          y = window.event.clientY;
        }
        new_x = delta_x + x;
        new_y = delta_y + y;
        block.style.top = new_y + 'px';
        block.style.left = new_x + 'px';
      };
};
