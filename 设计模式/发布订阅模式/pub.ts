import { PubSub } from "./PubSub";

const pubsub = new PubSub()
//  publish event message
pubsub.publish('subscribe', `subscribe success!`)
pubsub.publish('sendSMS', 'help me get the package')
pubsub.publish('sendSMS', 'help me get the package')