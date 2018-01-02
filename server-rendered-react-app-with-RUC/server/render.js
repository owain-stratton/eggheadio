import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from '../src/components/App'

// This gets the clientStats from webpackHotServerMiddleware, you can see a
// middleware is returned which then sends the html response.
// For prod you'd pass in the clientStats manually after building with webpack.
export default ({ clientStats }) => (req, res) => {
  const app = ReactDOM.renderToString(<App />)
  const chunkNames = flushChunkNames()

  // output of the chunks from webpack
  const {
    js,
    styles,
    cssHash, // import for local import of css
    scripts,
    stylesheets,
  } = flushChunks(clientStats, { chunkNames })

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react universal from scratch</title>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
  )
}
