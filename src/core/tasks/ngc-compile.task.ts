import { ITask } from './task.interface';
import { OptionsKeys } from '../../model/options.keys';
const gulp = require('gulp');
//const exec = require('child_process').exec;
const exec = require('gulp-exec');


/**
 * Compile our typescript files with ngc
 */
export class NgcCompileTask implements ITask {

  /**
   * Registring the task
   */
  registerTask(argv: any, onError: () => void, dependencies: string[] = []): string {
    const taskName = 'compile-ngc';

    gulp.task(taskName, dependencies, (done: Function) => {

      const tsConfig = `${argv[OptionsKeys.OUT_DIR]}/tsconfig-ngc.json`;
      const pathNgcDefault =  this.getPath() + "/node_modules/.bin/ngc -p " + tsConfig;
      const command = pathNgcDefault || `${argv[OptionsKeys.PATH_NGC]}`;

      const path = `./${argv[OptionsKeys.ROOT_DIR]}`;

      const options = {
        continueOnError: false, // default = false, true means don't emit error event
        pipeStdout: false, // default = false, true means stdout is written to file.contents
        customTemplatingThing: "test" // content passed to lodash.template()
      };
      const reportOptions = {
        err: true, // default = true, false means don't write err
        stderr: true, // default = true, false means don't write stderr
        stdout: true // default = true, false means don't write stdout
      };

      
      return gulp.src(path)
        .pipe(exec(command, options))
        .pipe(exec.reporter(reportOptions));
    });

    

    return taskName;
  }

  getPath()
  {      
      if(!process.env.PWD)
      {
            process.env.PWD = process.cwd();
      }	
	    return process.env.PWD;
  }
}
