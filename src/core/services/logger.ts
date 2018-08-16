import * as chalk from 'chalk';

export class Logger {
  static success(text: string) {
    console.log(chalk.default.green(text));
  }

  static error(text: string) {
    console.log(chalk.default.red(text));
  }

  static warning(text: string) {
    console.log(chalk.default.yellow(text));
  }
}
