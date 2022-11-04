import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  // Looking for .otf font files
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Convert to .ttf
      .pipe(fonter({ formats: ["ttf"] }))
      // Upload to source folder
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
  );
};

export const fontCopy = () => {
  // Looking for .otf font files
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.*`, {})
      // Upload to source folder
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const ttfToWoff = () => {
  // Looking for .ttf font files
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // convert to .woff
      .pipe(fonter({ formats: ["woff"] }))
      // upload to the folder with the result
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // looking for .ttf font files
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      // convert to .woff2
      .pipe(ttf2woff2())
      // upload to the folder with the result
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // Looking for .woff and woff2 font files
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.{woff,woff2}`))
      // Upload to the folder with the result
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const fontStyle = () => {
  // Font Connection Style File
  let fontsFile = `${app.path.srcFolder}/scss/config/fonts.scss`;
  // Check if font files exist
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Checking if a style file exists for connecting fonts
      if (!fs.existsSync(fontsFile)) {
        // If the file does not exist, create it
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // Writing Font Connections to a Style File
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;

            if (fontWeight.toLowerCase() === "thin") {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === "extralight") {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === "light") {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === "semibold") {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === "bold") {
              fontWeight = 700;
            } else if (
              fontWeight.toLowerCase() === "extrabold" ||
              fontWeight.toLowerCase() === "heavy"
            ) {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === "black") {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }

            fs.appendFile(
              fontsFile,
              `
              @font-face {
                font-family: ${fontName};
                font-display: swap;
                src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                font-weight: ${fontWeight};
                font-style: normal;
              }\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        // If the file exists, delete it.
        console.log(
          "scss/config/fonts.scss already exists. To update a file, you need to delete it!"
        );
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};
