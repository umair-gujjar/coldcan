const io = require('socket.io')(http);
const FrameStorageService = require('./frame-storage.service');
const VideoConverter = require('./convert-video.service');
const Logger = require('./log.service');

class MainController {
    constructor() {
        io.on('connection', this.init);
    }

    init(socket) {
        Logger.info('Incoming socket connection');

        socket.on('video-chunk', this.saveFrame);

        socket.on('disconnect', this.saveVideo);
    }

    saveFrame() {
        Logger.info('Started frame saving');
        FrameStorageService.storeBase64Image(chunk)
        	.then(() => {
        		Logger.info('Frame successfully saved');
        	})
        	.catch((e) => {
        		Logger.error(e);
        	});
    }

    saveVideo() {
        Logger.info('Started video saving');
    	Logger.debug(FrameStorageService.FRAMES_PATH);

        VideoConverter.makeVideoFromFramesInPath(FrameStorageService.FRAMES_PATH)
        	.then(() => {
        		Logger.info('Video successfully saved');
        	})
        	.catch((e) => {
        		Logger.error(e);
        	});
    }
}

module.exports = new MainController();
