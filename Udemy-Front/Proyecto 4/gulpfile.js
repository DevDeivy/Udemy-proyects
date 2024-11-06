import {src, dest, watch, series} from 'gulp';
import * as dartSass from 'sass';
import gulpSass  from 'gulp-sass';

const sass = gulpSass(dartSass);

export function js_gulp(done){ //compilar archivos de JS
    src('src/js/script.js') // Ubicacion del JS
        .pipe(dest('dist/JS')) // Destino donde se compilará
    done()
};

export function css_gulp(done){
    src('src/scss/app.scss', {sourcemaps: true}) /*acceder a el archivo de sass*/
        .pipe( sass().on('error', sass.logError)) /*una vez que lo encuentre lo compila */
        .pipe(dest('dist/CSS', {sourcemaps: true})) /* Destino donde se compilará*/
    done()
};

export function dev(){
    watch('src/scss/**/*.scss', css_gulp);
    watch('src/js/**/*.js', js_gulp);
}; 

export default series(js_gulp, css_gulp, dev); //exportar todas las funciones anteriores