// utils/bufferManager.js
const { Readable } = require('stream');
const { StreamBuffer } = require('stream-buffers');

class BufferManager {
    constructor() {
        this.audioBuffers = new Map();
    }

    // store audio buffer with a unique ID
    storeBuffer(buffer, id = Date.now().toString()) {
        this.audioBuffers.set(id, Buffer.from(buffer));
        return id;
    }

    // retrieve buffer by ID
    getBuffer(id) {
        return this.audioBuffers.get(id);
    }

    // convert buffer to stream
    bufferToStream(buffer) {
        const readable = new Readable();
        readable.push(buffer);
        readable.push(null);
        return readable;
    }

    // create a writable stream buffer
    createWriteStream() {
        return new StreamBuffer({
            initialSize: (100 * 1024),    // 100 KB
            incrementAmount: (10 * 1024)   // 10 KB
        });
    }

    // delete buffer by ID
    deleteBuffer(id) {
        return this.audioBuffers.delete(id);
    }

    // clear all stored buffers
    clearAll() {
        this.audioBuffers.clear();
    }
}

module.exports = new BufferManager();