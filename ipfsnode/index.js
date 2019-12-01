/* eslint no-console: ["off"] */
'use strict'

const IPFS = require('ipfs')
const assert = require('assert').strict
const { generate: writeKey } = require('libp2p/src/pnet')
const path = require('path')
const fs = require('fs')
const privateLibp2pBundle = require('./libp2p-bundle')
const { mkdirp } = require('./utils')

// Create two separate repo paths so we can run two nodes and check their output
const repo = path.resolve('./tmp', 'repo', '.ipfs')
mkdirp(repo)

// Create a buffer and write the swarm key to it
const swarmKey = Buffer.alloc(95)
writeKey(swarmKey)

// This key is for the `TASK` mentioned in the writeFileSync calls below
const otherSwarmKey = Buffer.alloc(95)
writeKey(otherSwarmKey)

// Add the swarm key to both repos
const swarmKeyPath = path.resolve(repo, 'swarm.key')
fs.writeFileSync(swarmKeyPath, swarmKey)
// TASK: switch the commented out line below so we're using a different key, to see the nodes fail to connect
// fs.writeFileSync(swarmKey2Path, otherSwarmKey)

// Create the first ipfs node
const node = new IPFS({
  repo: repo,
  libp2p: privateLibp2pBundle(swarmKeyPath),
  config: {
    Addresses: {
      // Set the swarm address so we dont get port collision on the nodes
      Swarm: ['/ip4/0.0.0.0/tcp/6100']
    }
  }
})


console.log('auto starting the nodes...')

// `nodesStarted` keeps track of how many of our nodes have started
let nodesStarted = 0
/**
 * Calls `connectAndTalk` when both nodes have started
 * @returns {void}
 */
const didStartHandler = () => {
  if (++nodesStarted === 2) {
    // If both nodes are up, start talking
    connectAndTalk()
  }
}

/**
 * Exits the process when all started nodes have stopped
 * @returns {void}
 */
const didStopHandler = () => {
  if (--nodesStarted < 1) {
    console.log('all nodes stopped, exiting.')
    process.exit(0)
  }
}

/**
 * Stops the running nodes
 * @param {Error} err An optional error to log to the console
 * @returns {void}
 */
const doStop = (err) => {
  if (err) {
    console.error(err)
  }

  console.log('Shutting down...')
  node.stop()

}

/**
 * Connects the IPFS nodes and transfers data between them
 * @returns {void}
 */
const connectAndTalk = async () => {
  console.log('connecting the nodes...')
  const nodeId = await node.id()
  //const dataToAdd = Buffer.from('Hello, private friend!')
  console.log(nodeId)
  // Connect the nodes
  // This will error when different private keys are used
  // try {
  //   await node1.swarm.connect(node2Id.addresses[0])
  // } catch (err) {
  //   return doStop(err)
  // }
  // console.log('the nodes are connected, let\'s add some data')
  //
  // // Add some data to node 1
  // let addedCID
  // try {
  //   addedCID = await node1.add(dataToAdd)
  // } catch (err) {
  //   return doStop(err)
  // }
  // console.log(`added ${addedCID[0].path} to the node1`)
  //
  // // Retrieve the data from node 2
  // let cattedData
  // try {
  //   cattedData = await node2.cat(addedCID[0].path)
  // } catch (err) {
  //   return doStop(err)
  // }
  // assert.deepEqual(cattedData.toString(), dataToAdd.toString(), 'Should have equal data')
  // console.log(`successfully retrieved "${dataToAdd.toString()}" from node2`)

  //doStop()
}

// Wait for the nodes to boot
node.once('start', didStartHandler)
// node2.once('start', didStartHandler)

// Listen for the nodes stopping so we can cleanup
node.once('stop', didStopHandler)
// node2.once('stop', didStopHandler)
