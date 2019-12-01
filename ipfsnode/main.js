const fs = require('fs');
const IPFS = require('ipfs');
const Protector = require('libp2p-pnet')
// your path to the key file
const swarmKeyPath = './swarm.key';
const node = new IPFS({
    libp2p: {
        modules: {
            connProtector: new Protector(fs.readFileSync(swarmKeyPath))
        }
    }
})
