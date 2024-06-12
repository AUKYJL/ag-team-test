import webpack from "webpack-stream";
import webPackConfig from "../webpack.prodWOI.js";

export const jsBuildWOI = () => {
  return app.gulp
    .src(app.path.src.js)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      webpack({
        config: webPackConfig,
      })
    )
    .pipe(app.gulp.dest(app.path.build.js));
};
