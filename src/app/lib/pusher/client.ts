import Pusher from "pusher-js";

const pusherClient = new Pusher(process.env.PUSHER_APP_KEY!, {
    cluster: process.env.PUSHER_APP_CLUSTER!,
})

export default pusherClient;
