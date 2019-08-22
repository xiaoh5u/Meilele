//引入gulp
const gulp = require('gulp');

//引入组件
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const del = require('del');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;




//防止编译SASS过程中报错后退出监听

function swallowError(error) {
  // If you want details of the error in the console
  console.error(error.toString())

  this.emit('end')
}




// gulp.task('css', function () {
//   return gulp.src('src/css/*.css')
//     .pipe(autoprefixer({            // 通过autoprefixer插件自动补全CSS兼容
//       overrideBrowserslist: ['last 20 versions', 'Android >= 4.0'],
//     }))
//     .pipe(sourcemaps.init())        // 创建sourcemap文件
//     .pipe(gulp.dest('./dist/css'))  // 文件导入到dist/css文件夹下
//     .pipe(cleancss())               // 压缩css文件成生产环境版本
//     .pipe(rename({                  // 文件重命名加上.min后缀
//       suffix: '.min'
//     }))
//     .pipe(sourcemaps.write('.'))    // 写入生成sourcemap
//     .pipe(gulp.dest('./dist/css'))  // 文件导入到dist/css文件夹下
//     .pipe(reload({
//       stream: true
//     }));
// })
gulp.task('copy', function () {
  return gulp.src('./src/js/layui/**')
  .pipe(gulp.dest('./dist/js/layui'))
})

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.{scss,sass}')
    .pipe(sass()) // 通过sass插件将sass编译为css，如果需要编译less，则改用less插件
    .on('error', swallowError)//报错后警告不退出
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 20 versions', 'Android >= 4.0'],
    }))
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('./dist/css'))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({
      stream: true
    }));
})


gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({ // 通过babel插件将ES6转成ES5
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify()) // 丑化js代码
    .pipe(rename({ // 重命名
      // prefix: 'bonjour-',  // 添加前缀
      suffix: '.min' // 添加后缀
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({
      stream: true
    }));
})

gulp.task('image', function () {
  return gulp.src('src/images/*')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest('./dist/images'));
})



gulp.task('index', async () => {
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(reload({
      stream: true
    }))
})

gulp.task('html', async () => {
  gulp.src('html/*.{html,htm}')
    .pipe(gulp.dest('./dist/html'))
    .pipe(reload({
      stream: true
    }))
})

gulp.task('layout', async () => {
  gulp.src('layout/*.{html,htm}')
    .pipe(gulp.dest('./dist/layout'))
    .pipe(reload({
      stream: true
    }))
})

gulp.task('delete', function () {
  return del(['./dist']); // 加return 方法变为同步
})

gulp.task('default', ['delete'], function () {
  gulp.start('serve');
})

gulp.task('serve', ['index', 'sass', 'js', 'image', 'layout','copy', 'html'], function () {
  browserSync.init({
    files: ['**'],
    server: {
      baseDir: './dist',
      index: './index.html'
    },
    port: 8080
  });

  gulp.watch('./index.html', ['index']);
  gulp.watch('src/sass/*.{scss,sass}', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
  // gulp.watch('src/images/*', ['image'])
  gulp.watch('html/*.{html,htm}', ['html']);
  gulp.watch('layout/*.{html,htm}', ['layout']);

  // gulp.watch('./*.{html,htm}').on('change', reload);
})

// gulp.task('build', ['index', 'sass', 'js', 'image', 'layout', 'html'], function () {
//   // 处理首页
//   console.log('发布完成');
// })