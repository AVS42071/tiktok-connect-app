const { WebcastPushConnection } = require('tiktok-live-connector');

// Username of someone who is currently live
let tiktokUsername = "officialgeilegisela";

// Create a new wrapper object and pass the username


let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername, {
    processInitialData: false,
    enableExtendedGiftInfo: true,
    enableWebsocketUpgrade: true,
    requestPollingIntervalMs: 2000,
    clientParams: {
        "app_language": "en-US",
        "device_platform": "web"
    },
    requestHeaders: {
        "headerName": "headerValue"
    },
    websocketHeaders: {
        "headerName": "headerValue"
    },
    requestOptions: {
        timeout: 10000
    },
    websocketOptions: {
        timeout: 10000
    }
});
tiktokLiveConnection.on('connected', state => {
    console.log('Hurray! Connected!', state);
})

tiktokLiveConnection.on('disconnected', () => {
    console.log('Disconnected :(');
})


tiktokLiveConnection.on('streamEnd', (actionId) => {
    if (actionId === 3) {
        console.log('Stream ended by user');
    }
    if (actionId === 4) {
        console.log('Stream ended by platform moderator (ban)');
    }
})


tiktokLiveConnection.on('websocketConnected', websocketClient => {
    console.log("Websocket:", websocketClient.connection);
})


tiktokLiveConnection.on('error', err => {
    console.error('Error!', err);
})


tiktokLiveConnection.on('gift', data => {
    if (data.giftType === 1 && !data.repeatEnd) {
        // Streak in progress => show only temporary
        console.log(`${data.uniqueId} is sending gift ${data.giftName} x${data.repeatCount}`);
    } else {
        // Streak ended or non-streakable gift => process the gift with final repeat_count
        console.log(`${data.uniqueId} has sent gift ${data.giftName} x${data.repeatCount}`);
    }
})

tiktokLiveConnection.on('roomUser', data => {
    console.log(`Viewer Count: ${data.viewerCount}`);
})


tiktokLiveConnection.on('like', data => {
    console.log(`${data.uniqueId} sent ${data.likeCount} likes, total likes: ${data.totalLikeCount}`);
})

tiktokLiveConnection.on('subscribe', (data) => {
    console.log(data.uniqueId, "subscribed!");
})

tiktokLiveConnection.on('follow', (data) => {
    console.log(data.uniqueId, "followed!");
})


tiktokLiveConnection.getRoomInfo().then(roomInfo => {
    console.log(roomInfo);
    console.log(`Stream started timestamp: ${roomInfo.create_time}, Streamer bio: ${roomInfo.owner.bio_description}`);
    console.log(`HLS URL: ${roomInfo.stream_url.hls_pull_url}`); // Can be played or recorded with e.g. VLC
}).catch(err => {
    console.error(err);
})


let tiktokLiveConnection = new WebcastPushConnection('@username');

tiktokLiveConnection.getAvailableGifts().then(giftList => {
    console.log(giftList);
    giftList.forEach(gift => {
        console.log(`id: ${gift.id}, name: ${gift.name}, cost: ${gift.diamond_count}`)
    });
}).catch(err => {
    console.error(err);
})
