import React from 'react';

export default class ButtonPanel extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    var target = event.target;

    if (target.tagName !== 'BUTTON') {
      return;
    }

    var btns = target.parentNode.parentNode.querySelectorAll("button");
    [].forEach.call(btns, (btn) => {
      btn.classList.remove('active');
    });

    target.classList.add('clicked', 'active');
    setTimeout(() => {
      target.classList.remove('clicked');
    }, 200);
    this.props.onClick(target.dataset.value);
  }
  render() {
    return (
      <div className="button-panel s4 column" onClick={this.onClick}>
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
