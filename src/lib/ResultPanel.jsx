import React from 'react';

export default class ResultPanel extends React.Component {
  //start-non-standard
  static propTypes = {
    result: React.PropTypes.object
  };
  static defaultProps = {
    result: {
      text: '0',
      direct: true
    }
  };
  //end-non-standard
  constructor() {
    super();
  }
  render() {
    var {text, direct} = this.props.result,
      str = text,
      lenlimit = 10,
      fReg = /(\d+)(\d{3})/,
      parts;

    // 直接输入
    if (direct) {
      parts = str.split('.');
      while (fReg.test(parts[0])) {
        parts[0] = parts[0].replace(fReg, "$1,$2");
      }
      if (parts.length > 1) {
        str = parts.join('.')
      } else {
        str = parts[0];
      }
    } else {
      text = parseFloat(text);
      // 不是数字或者超出范围
      if (isNaN(text) || !isFinite(text)) {
        str = '错误';
      } else {
        // 大整数或者很小的浮点数，使用科学计数法
        // 如果科学计数法的前半部分过长，保留一定的精度
        if (text > 0 && (text >= parseFloat('1e' + lenlimit) || text < parseFloat('1e-' + (lenlimit - 1)))
            || text < 0 && (text <= parseFloat('-1e' + (lenlimit - 1)) || text > parseFloat('-1e-' + (lenlimit - 2)))) {

          str = parseFloat(text).toPrecision(lenlimit).split("+").join("");
          if (str.replace(".", "").length > lenlimit) {
            parts = str.split('e');
            parts[0] = parts[0].replace(/\.?0+$/,"");  // 清除尾部的0
            str = parts[0] + 'e' + parts[1];
          }
        }
        // 不需要科学计数法的数学
        // 整数部分逗号分隔
        else {
          str = parseFloat(text).toPrecision(lenlimit);
          parts = str.split('.');
          while (fReg.test(parts[0])) {
            parts[0] = parts[0].replace(fReg, "$1,$2");
          }
          if (parts.length > 1) {
            str = parts.join('.')
          } else {
            str = parts[0];
          }
          str = str.replace(/\.?0+$/,""); // 清除尾部的0
        }
      }
    }

    return (
      <div className="result-panel">
        <div className="last-row"></div>
        <div className="cur-row">{str}</div>
      </div>
    );
  }
}
