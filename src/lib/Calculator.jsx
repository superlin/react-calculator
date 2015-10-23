import React from 'react';
import ResultPanel from './ResultPanel';
import ButtonPanel from './ButtonPanel';

export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      input: [],
      num: 0,
      lastch: '',
      lastop: '+',
      text: ''
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onButtonClick(type) {
    var exp, op, ch, text, num, input, res;

    var state = this.state;
    switch (type) {
    case 'c':
      this.setState({
        lastch: '',
        text: ''
      });
      break;

    case 'ac':
      this.setState({
        input: [],
        num: 0,
        lastch: '',
        lastop: '+',
        text: '',
      });
      break;

    case 'pn':

      break;

    case '.':

      break;

    case '+':
    case '-':
      op = state.lastch;
      if (op === '+' || op === '-') {
        this.setState({
          lastop: type
        });
        break;
      }

      if (state.input.length === 0) {
        text = state.text;
        this.setState({
          input: [text, type],
          num: parseFloat(text),
          lastop: type,
          lastch: type
        });
      } else {
        exp = state.input.join(" ");
        res = eval(exp);
        this.setState({
          input: [res, type],
          num: res,
          lastop: type,
          lastch: type,
          text: res + ''
        });
      }

      break;

    case '=':
      input = state.input;
      num = state.num;

      if (input.length === 0) {
        exp = parseFloat(state.text) + " " + state.lastop + " " + num;
      } else {
        exp = state.input.join(" ");
        ch = state.lastch;
        if (/[0-9]/.test(ch)) {
          num = parseFloat(state.text);
        }
        exp += " " + num;
      }

      res = eval(exp);
      this.setState({
        input: [],
        lastch: type,
        num: num,
        text: res + ''
      });
      break;

    default:
      ch = state.lastch;
      text = state.text;
      if (!/[+\-*=/0]/.test(ch)) {
        this.setState({
          lastch: type,
          text: text+type
        });
      } else {
        this.setState({
          lastch: type,
          text: type
        });
      }
    }

    /*var cur;
    var lastLetter;
    switch (type) {
    case 'c':
      this.setState({
        last: '',
        cur: '0'
      });
      break;
    case 'back':
      this.setState({
        cur: this.state.cur === '0' ? this.state.cur : this.state.cur.slice(0, -1) || '0'
      });
      break;
    case '=':
      try {
        this.setState({
          last: this.state.cur + '=',
          cur: eval(this.state.cur) + ''
        });
      } catch (e) {
        this.setState({
          last: this.state.cur + '=',
          cur: 'NaN'
        });
      }
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      cur = this.state.cur;
      lastLetter = cur.slice(-1);
      if (lastLetter === '+' || lastLetter === '-' || lastLetter === '*' || lastLetter === '/')
        this.setState({
          cur: cur.slice(0, -1) + type
        });
      else
        this.setState({
          cur: this.state.cur + type
        });
      break;
    case '.':
      cur = this.state.cur;
      lastLetter = cur.slice(-1);
      if (lastLetter !== '.') {
        this.setState({
          cur: this.state.cur + type
        });
      }
      break;
    default:
      this.setState({
        cur: this.state.cur === '0' ? type : this.state.cur + type
      });
      break;
    }*/
  }
  render() {
    var num = this.state.text;
    return (
      <div className="react-calculator">
        <ResultPanel num={num}/>
        <ButtonPanel onClick={this.onButtonClick} />
      </div>
    );
  }
}
