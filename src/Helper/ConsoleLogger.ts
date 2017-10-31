import * as moment from 'moment';

export default class ConsoleLogger {
  static log(msg:string, componentName = "", cssFormat = ''):void {
    console.log(`%c[${componentName}] ${msg} at ${moment().format('HH[h]mm[m]ss[s]-SSS')}`, cssFormat);
  }
  static warn(msg:string, componentName = "", cssFormat = ''):void {
    console.warn(`%c[${componentName}] ${msg} at ${moment().format('HH[h]mm[m]ss[s]-SSS')}`, cssFormat);
  }

  static getUnix() {
    return moment().format('X');
  }
}