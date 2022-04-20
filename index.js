const runCommand = require('./runCommand')
const fs = require('fs')

const { streamKey } = require('./streamKey.json')

function streamVideoPromise(file, streamKey, onData) {
  return new Promise((resolve,reject)=>{
    if(!file || !streamKey){
      reject("File and streamKey need to be passed.")
    }
    runCommand(
      'ffmpeg',
      `-re -i ${file} -c copy -f flv rtmp://a.rtmp.youtube.com/live2/${streamKey}`,
      (data) => {
        if(onData) onData(data);
      },
      () => {
        if(onFinished){
          resolve()
        }
      }
    )
  })
}

fs.readdir(process.cwd()+'/videos/', (err, files) => {
  if(err)throw err;

  while(true){
    files.forEach(async file => {
      await streamVideoPromise(process.cwd()+'/videos/'+file,streamKey,console.log)
  
      if(log)console.log(`Finished streaming ${file}`)
    }); 
  }
});