import svgSprite from 'gulp-svg-sprite'

export const svgSprive = () => {
  return app.gulp.src(`${app.path.src.svgicons}`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SVG',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: `../icons/icons.svg`,
          // Create a page with a list of icons
          example: true
        },
      },
    }))
    .pipe(app.gulp.dest(`${app.path.build.images}`))
}