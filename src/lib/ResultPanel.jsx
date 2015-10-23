import React from 'react';

export default class ResultPanel extends React.Component {
  static propTypes = {
    num: React.PropTypes.string
  };
  static defaultProps = {
    num: '0'
  };
  constructor() {
    super();
  }
  render() {
    var num = this.props.num, str, parts;
    var lenlimit = 10;
    var fReg = /(\d+)(\d{3})/;

    if (num === '') {
      num = '0';
    }
    num = parseFloat(num);
    // 不是数字或者超出范围
    if (isNaN(num) || !isFinite(num)) {
      str = '错误';
    } else {
      // 大整数或者很小的浮点数，使用科学计数法
      // 如果科学计数法的前半部分过长，保留一定的精度
      if (num > 0 && (num >= parseFloat('1e' + lenlimit) || num < parseFloat('1e-' + (lenlimit - 2)))
          || num < 0 && (num <= parseFloat('-1e' + (lenlimit-1)) || num > parseFloat('-1e-' + (lenlimit - 3)))) {
        str = num.toExponential().split("+").join("");
        if (str.length > lenlimit) {
          parts = str.split('e');
          parts[0] = parseFloat(parts[0]).toPrecision(lenlimit - 1 - parts[1].length);
          str = parts[0] + 'e' + parts[1];
        }
      }
      // 不需要科学计数法的数学
      // 整数部分逗号分隔
      else {
        str = num + '';
        if (str.length > lenlimit) {
          str = num.toPrecision(lenlimit);
        }
        parts = str.split('.');
        while (fReg.test(parts[0])) {
          parts[0] = parts[0].replace(fReg, "$1,$2");
        }
        str = parts.join('.');
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
