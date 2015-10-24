import React from 'react';
import ReactDOM from 'react-dom';

export default class ButtonPanel extends React.Component {
  constructor() {
    super();
    this.eventStart = this.eventStart.bind(this);
    this.eventEnd = this.eventEnd.bind(this);
    this.btns = {};
    this.lastop = '';
  }
  componentDidMount() {
    var root = ReactDOM.findDOMNode(this),
      selfBtns = this.btns,
      btns = root.querySelectorAll("button"),
      isTouch = 'ontouchstart' in window;

    // pc使用mouse事件，touch设备使用touch事件
    if (isTouch) {
      root.addEventListener('touchstart', (event) => {
        this.eventStart(event);
      });
      root.addEventListener('touchend', (event) => {
        this.eventEnd(event);
      });
    } else {
      root.addEventListener('mousedown', (event) => {
        this.eventStart(event);
      });
      root.addEventListener('mouseup', (event) => {
        this.eventEnd(event);
      });
    }

    [].forEach.call(btns, (btn) => {
      selfBtns[btn.dataset.value] = btn;
    });
  }
  eventStart(event) {
    var target = event.target,
      dataset = target.dataset,
      btns = this.btns;

    [].forEach.call(Object.keys(btns), (key) => {
      btns[key].classList.remove('active');
    });

    if (/[+\-*/]/.test(dataset.value)) {
      target.classList.add('active');
    }

    target.classList.add('clicked');
  }
  eventEnd(event) {
    var target = event.target,
      dataset = target.dataset,
      lastop = this.lastop;

    if (target.tagName !== 'BUTTON') {
      return;
    }

    // 只有运算符会设置active
    if (/[+\-*/]/.test(dataset.value)) {
      this.lastop = dataset.value;
    }
    // 清除时，之前的运算符高亮
    else if (dataset.value === 'c') {
      if (lastop) {
        this.btns[lastop].classList.add('active');
      }
    }
    // 全部清除时，清除上一次的操作符
    else if (dataset.value === 'a') {
      this.lastop = "";
    }

    setTimeout(() => {
      target.classList.remove('clicked');
    }, 200);

    this.props.onClick(dataset.value);
  }
  render() {
    return (
      <div className="button-panel s4 column">
        <div className="s1 row">
          <button className="button s1 sop" data-value="c"> C </button>
          <button className="button s1 sop" data-value="a"> AC </button>
          <button className="button s1 sop" data-value="f"> +/- </button>
          <button className="button s1 op" data-value="/"> ÷ </button>
        </div>
        <div className="s1 row">
          <button className="button s1 num" data-value="7"> 7 </button>
          <button className="button s1 num" data-value="8"> 8 </button>
          <button className="button s1 num" data-value="9"> 9 </button>
          <button className="button s1 op t1" data-value="*"> × </button>
        </div>
        <div className="s1 row">
          <button className="button s1 num" data-value="4"> 4 </button>
          <button className="button s1 num" data-value="5"> 5 </button>
          <button className="button s1 num" data-value="6"> 6 </button>
          <button className="button s1 op" data-value="-"> - </button>
        </div>
        <div className="s1 row">
          <button className="button s1 num" data-value="1"> 1 </button>
          <button className="button s1 num" data-value="2"> 2 </button>
          <button className="button s1 num" data-value="3"> 3 </button>
          <button className="button s1 op" data-value="+"> + </button>
        </div>
        <div className="s1 row">
          <button className="button s2 num" data-value="0"> 0 </button>
          <button className="button s1 num" data-value="."> . </button>
          <button className="button s1 op" data-value="="> = </button>
        </div>
      </div>
    );
  }
}
