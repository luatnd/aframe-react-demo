import * as moment from 'moment';

export default class ConsoleLogger {
  static log(msg:string, componentName = ""):void {
    console.log(`[${componentName}] ${msg} at ${moment().format('HH:mm:ss-SSS')}`);
  }

  static getUnix() {
    return moment().format('X');
  }
}