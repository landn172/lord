const express = require('express');
const path = require('path');
const fs = require('fs')
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const autoprefixer = require('express-autoprefixer')
const {
  createBundleRenderer
} = require('vue-server-renderer')
const resolve = file => path.resolve(__dirname, file)

const app = express();
const isProd = process.env.NODE_ENV === 'production'

let renderer
let readyPromise

const templatePath = resolve('./src/index.template.html')

function createRenderer(bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false // 推荐
  }))
}

if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(serverBundle, {
    template, // （可选）页面模板
    clientManifest, // （可选）客户端构建 manifest
    inject: false
  })
} else {
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(autoprefixer({ browsers: ['last 2 versions', 'Android >= 4.4', 'IOS >= 8.0'], cascade: false }))
//   .use(express.static(path.join(__dirname, 'public')));

// 引用 esj 模板引擎
app.set('views', path.join(__dirname, 'dist'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs')

// app.use(compression({threshold: 0}))

app.use(logger('dev'));
// app.use(favicon('./public/logo-48.png'))
app.use('/static', serve('./dist/static', true))
app.use('/public', serve('./public', true))
app.use('/manifest.json', serve('./manifest.json', true))
app.use('/sw.js', serve('./dist/sw.js'))
app.use('/workbox-sw.prod.js', serve('./dist/workbox-sw.prod.js'))

function render(req, res) {
  const s = Date.now()

  res.setHeader("Content-Type", "text/html")

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: `lord's space`, // default title
    url: req.url
  }

  const renderStream = renderer.renderToStream(context)

  renderStream.on('data', data => res.write(data))
  renderStream.on('end', (data) => res.end(data || ''))

  renderStream.on('error', err => handleError(err))

  // renderer.renderToString(context, (err, html) => {
  //   if (err) {
  //     return handleError(err)
  //   }
  //   res.send(html)
  //   if (!isProd) {
  //     console.log(`whole request: ${Date.now() - s}ms`)
  //   }
  // })
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

module.exports= {
  ready:readyPromise,
  close(){
    app.close()
  }
}
