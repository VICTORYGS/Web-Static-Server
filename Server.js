/**
 * 完全基于node原生自带模块实现
 * 将server文件置于前端资源目录下 执行node server 即可
 * node server [port]
 * example node server 3000
 * 默认80端口
 * 默认会打开index.html文件
 */
const http=require('http')
const fs=require('fs')
const URL=require('url')
let port=process.argv[2]||80
http.createServer((req,res)=>{
  let url='.'+decodeURIComponent(URL.parse(req.url).pathname)
  console.log(url);
  function getPath(url) {
    fs.stat(url,(err,Stats)=>{
      if(err){
        res.writeHead(404)
        res.end('not found')
      }else{
        if(Stats.isDirectory()){
          if(url.slice(-1)!=='/'){
            url+='/'
          }
          getPath(URL.resolve(url,'index.html'))
        }else if(Stats.isFile()){
          let headers={}
          let len=mime.length
          for(let i=0;i<len;i++){
            let value=mime[i]
            let reg=new RegExp(`.${value.split('/')[1]}$`)
            if(reg.test(url)){
              headers['content-type']=value
              break
            }
          }
          res.writeHead(200,headers)
          fs.createReadStream(url).pipe(res);
        }
      }
    })
  }
  getPath(url)
}).listen(port,()=>{
  console.log('服务已启动')
})

var mime=[
  'text/html',
  'text/css',
  'text/xml',
  'image/gif',
  'image/jpeg',
  'application/javascript',
  'application/atom+xml',
  'application/rss+xml',
  'text/mathml',
  'text/plain',
  'text/vnd.sun.j2me.app-descriptor',
  'text/vnd.wap.wml',
  'text/x-component',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/vnd.wap.wbmp',
  'image/webp',
  'image/x-icon',
  'image/x-jng',
  'image/x-ms-bmp',
  'font/woff',
  'font/woff2',
  'application/java-archive',
  'application/json',
  'application/mac-binhex40',
  'application/msword',
  'application/pdf',
  'application/postscript',
  'application/rtf',
  'application/vnd.apple.mpegurl',
  'application/vnd.google-earth.kml+xml',
  'application/vnd.google-earth.kmz',
  'application/vnd.ms-excel',
  'application/vnd.ms-fontobject',
  'application/vnd.ms-powerpoint',
  'application/vnd.oasis.opendocument.graphics',
  'application/vnd.oasis.opendocument.presentation',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.wap.wmlc',
  'application/x-7z-compressed',
  'application/x-cocoa',
  'application/x-java-archive-diff',
  'application/x-java-jnlp-file',
  'application/x-makeself',
  'application/x-perl',
  'application/x-pilot',
  'application/x-rar-compressed',
  'application/x-redhat-package-manager',
  'application/x-sea',
  'application/x-shockwave-flash',
  'application/x-stuffit',
  'application/x-tcl',
  'application/x-x509-ca-cert',
  'application/x-xpinstall',
  'application/xhtml+xml',
  'application/xspf+xml',
  'application/zip',
  'application/octet-stream',
  'application/octet-stream',
  'application/octet-stream',
  'application/octet-stream',
  'application/octet-stream',
  'audio/midi',
  'audio/mpeg',
  'audio/ogg',
  'audio/x-m4a',
  'audio/x-realaud',
  'video/3gpp',
  'video/mp2t',
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/webm',
  'video/x-flv',
  'video/x-m4v',
  'video/x-mng',
  'video/x-ms-asf',
  'video/x-ms-wmv',
  'video/x-msvideo'
]
