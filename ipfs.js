
const Ipfs=require("ipfs")

async function main() {
    const ipfs = await Ipfs.create({
        repo:"leven"
    })

//     const data = 'Hello, <YOUR NAME HERE>'
//
// // add your data to to IPFS - this can be a string, a Buffer,
// // a stream of Buffers, etc
//     const files = await node.add(data)
//
// // 'hash', known as CID, is a string uniquely addressing the data
// // and can be used to get it again. 'files' is an array because
// // 'add' supports multiple additions, but we only added one entry
//    // console.log(files[0].hash)
//     const filehash=files[0].hash
//
//     console.log(filehash)
//
//     const data1 = await node.cat(filehash)
//
// // data is returned as a Buffer, conver it back to a string
//     console.log(data1.toString())
//

 //    const files = [
 //        {
 //            path: '/tmp/ddd.txt',
 //            content:  Ipfs.Buffer.from('ABC')
 //        }
 //    ]
 // //QmWXdjNC362aPDtwHPUE9o2VMqPeNeCQuTBTv1NsKtwypg
 //    const results = await ipfs.add(files)
 //
 //    console.log(results)

    // const result = await ipfs.addFromURL('https://pbs.twimg.com/media/EKlzFcHWsAASVbq?format=jpg&name=small')
    // console.log(result)

    //aa=await ipfs.files.mkdir('/my')
    //bb=await ipfs.files.ls('/my/a.js')

    const stats = await ipfs.files.stat('/my/a.js')
    await ipfs.files.write('/my/a.js', Buffer.from('Hello, worldasfdadf!'))
    //await ipfs.files.mkdir('/my/b.js')
    //await ipfs.files.mkdir('/my/ok')
    await ipfs.files.mkdir('/my/ok/aa.js',{parents:true})
    await ipfs.files.write('/my/b.js', Buffer.from('Hello, asdf!'))
    await ipfs.files.flush('/')
    const files = await ipfs.files.ls('/my',{long:true})

    files.forEach((file) => {
        console.log(file)
        if(file.type==1){


        }
    })

    const stream = ipfs.lsReadableStream('/my')

    stream.on('data', (buf) => {
        // write the file's path and contents to standard out
        console.log(console.log(buf.toString('utf8')))
    })

    //console.log(stats)
    // console.log(bb)

}
main()
