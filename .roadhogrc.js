export default {
  "entry": "src/index.js",
  "disableCSSModules": false,
  "publicPath": "/",
  "proxy": {
    "/1.0": {
      "target": "http://pre.adbaitai.com",
      "changeOrigin": true
    },
    "/api": {
      "target": "http://pre.adbaitai.com",
      "changeOrigin": true
    },
    "/dsp": {
      "target": "http://pre.adbaitai.com",
      "changeOrigin": true
    },
    "/public": {
      "target": "http://pre.adbaitai.com",
      "changeOrigin": true
    },
    "/user": {
      "target": "http://pre.adbaitai.com",
      "changeOrigin": true
    },
    "/h5": {
      "target": "http://pre.adbaitai.com",
      "changeOrigin": true
    }
  },
  "theme": {
    "@primary-color": "#04b894"
  },
  "autoprefixer": null,
  "extraBabelPlugins": [
    "transform-runtime",
    ["import", { "libraryName": "antd", "style": true }]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  }
}
