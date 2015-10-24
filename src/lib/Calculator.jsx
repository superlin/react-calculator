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
    var exp, res;

    var {
      input, num, lastch, lastop, text
    } = this.state;

    switch (type) {
    case 'c':
      this.setState({
        lastch: '0',
        text: '0'
      });
      break;

    case 'a':
      this.setState({
        input: [],
        num: 0,
        lastch: '0',
        lastop: '+',
        text: '0',
      });
      break;

    case 'f':
      if (text[0] === '-') {
        text = text.slice(1);
      } else {
        text = '-' + text;
      }
      this.setState({
        text: text
      });
      break;

    case '+':
    case '-':
      if (lastch === '+' || lastch === '-') {
        this.setState({
          lastop: type
        });
        break;
      }

      res = parseFloat(text);
      if (input.length === 0) {
        this.setState({
          input: [res, type],
          num: res,
          lastop: type,
          lastch: type
        });
      }
      // 6*5+
      // 6+5+
      // 5+5*5+
      else if (input.length === 2 || input.length === 4) {
        exp = input.join(" ");
        exp += ' ' + res;
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

    case '*':
    case '/':
      if (lastch === '*' || lastch === '/') {
        this.setState({
          lastop: type
        });
        break;
      }

      res = parseFloat(text);
      if (input.length === 0) {
        this.setState({
          input: [res, type],
          num: res,
          lastop: type,
          lastch: type
        });
      }
      // 6+5*
      // 6*5*
      else if (input.length === 2) {
        if (lastop === '+' || lastop === '-') {
          input.push(res, type);
          this.setState({
            input: input,
            num: res,
            lastop: type,
            lastch: type
          });
        } else {
          res = eval(input.join(' ') + ' ' + res);
          this.setState({
            input: [res, type],
            num: res,
            lastop: type,
            lastch: type,
            text: res + ''
          });
        }
      }
      // 6+5*5*
      else if (input.length === 4) {
        res = eval(input[2] + ' ' + input[3] + ' ' + res);
        input.pop();
        input.pop();
        input.push(res, type);
        this.setState({
          input: input,
          num: res,
          lastop: type,
          lastch: type,
          text: res + ''
        });
      }

      break;

    case '=':
      res = parseFloat(text);
      if (input.length === 0) {
        exp = res + " " + lastop + " " + num;
      } else {
        exp = input.join(" ");
        if (/[0-9]/.test(lastch)) {
          num = res;
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

    case '.':
      if(/[0-9.]/.test(lastch) && text.indexOf('.') !== -1) {
        break;
      }

      if (/[0-9]/.test(lastch)) {
        text += type;
      } else {
        text = '0' + type;
      }

      this.setState({
        text: text,
        lastch: type,
      });
      break;

    default:
      if (!/[+\-*=/0]/.test(lastch)) {
        this.setState({
          lastch: type,
          text: text + type
        });
      } else {
        this.setState({
          lastch: type,
          text: type
        });
      }
    }
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
