import gulp from "gulp"; // The main module
import { path } from "./gulp/config/path.js"; // Import paths
import { plugins } from "./gulp/config/plugins.js"; // Importing Shared Plugins

// Passing values to a global variable
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Import tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import {
  otfToTtf,
  ttfToWoff,
  fontStyle,
  fontCopy,
} from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// File change watcher
function watcher() {
  // gulp.watch(path.watch.files, copy)
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { svgSprive };

// Sequential font processing
// const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
const fonts = gulp.series(fontCopy, fontStyle);
// Main goals
// const mainTasks = gulp.series(gulp.parallel(copy, html, scss, js, images));
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Export scripts
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// Executing the Default Script
gulp.task("default", dev);
