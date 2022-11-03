import replace from 'gulp-replace' // Search and Replace
import plumber from 'gulp-plumber' // Error processing
import notify from 'gulp-notify' // Messages (tips)
import browserSync from 'browser-sync' // local server
import newer from 'gulp-newer' // Update check
import ifPlugin from 'gulp-if' // Conditional branching
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browserSync: browserSync,
    newer: newer,
    if: ifPlugin
}