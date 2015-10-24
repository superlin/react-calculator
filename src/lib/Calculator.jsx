import React from 'react';
import ResultPanel from './ResultPanel';
import ButtonPanel from './ButtonPanel';

export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      input: [],
      num: 0,
      lastch: '0',
      lastop: '+',
      text: '0'
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onButtonClick(type) {
    /*jshint evil:true*/

    var exp, res;

    var {
      input, num, lastch, lastop, text
    } = this.state;

    // 发生错误时必须按AC键
    if (text.indexOf("Infinity") !== -1 && type !== 'a') {
      return;
    }

    switch (type) {
    case 'c':
      if (lastch === type) {
        break;
      }
      
      this.setState({
        lastch: '0',
        text: '0'
      });
      break;

    case 'a':
      if (lastch === type) {
        break;
      }

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
      if (lastch === type) {
        break;
      }

      if (/[+\-*/]/.test(lastch)) {
        if (input.length === 0) {
          this.setState({
            lastop: type,
            lastch: type
          });
        }
        // 5*-
        else if (input.length === 2) {
          input[1] = type;
          this.setState({
            input: input,
            lastop: type,
            lastch: type
          });
        }
        // 5+5*-
        else if (input.length === 4) {
          res = eval(input.slice(0, 2).join(" "));
          this.setState({
            input: [res, type],
            lastop: type,
            lastch: type,
            num: res
          });
        }

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
      if (lastch === type) {
        break;
      }

      if (/[+\-*/]/.test(lastch)) {
        // 5+5*/
        if (input.length === 0 || input.length === 4) {
          this.setState({
            lastop: type,
            lastch: type
          });
        }
        // 5+*
        else if (input.length === 2) {
          input[1] = type;
          this.setState({
            input: input,
            lastop: type,
            lastch: type
          });
        }

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
        if (/[0-9.]/.test(lastch)) {
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
      // 无效输入：输入的字符串已经含有小数点
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
      // 00 -00 长度过长不响应
      if ((text === '0' || text === '-0') && type === '0') {
        break;
      }

      if (/[+\-*/=]/.test(lastch)){
        this.setState({
          lastch: type,
          text: type
        });
      }
      else if (text === '0' || text === '-0') {
        text = text.split("");
        text[text.length - 1] = type;
        text = text.join("");
        this.setState({
          lastch: type,
          text: text
        });
      } else {
        this.setState({
          lastch: type,
          text: text + type
        });
      }
    }
  }
  render() {
    var {text, lastch} = this.state,
      result = {
        text: text,
        direct: /[0-9.]/.test(lastch)
      };

    return (
      <div className="react-calculator">
        <ResultPanel result={result}/>
        <ButtonPanel onClick={this.onButtonClick} />
      </div>
    );
  }
}
