import { PubSub, Person } from "./PubSub";

const pubsub = new PubSub()
const zhangsan = new Person('zhangsan')
const lisi = new Person('lisi')
const wangwu = new Person('wangwu')
const zhaoliu = new Person('zhaoliu')
const zhouqi = new Person('zhouqi')
// subscribe event
function subscribeEvent() {
    console.log(`${this.name}：subscribe success!`)
}
// send email
function sendEmail(msg: string) {
    console.log(`send email to ${this.name}! content: ${msg}`)
}
// send SMS
function sendSMS(msg: string) {
    console.log(`send SMS to ${this.name}! content: ${msg}`)
}

pubsub.subscribe('subscribe', zhangsan, subscribeEvent)
pubsub.subscribe('sendMail', zhangsan, sendEmail)
pubsub.subscribe('sendSMS', lisi, sendSMS)
pubsub.subscribe('sendSMS', zhaoliu, sendSMS)
pubsub.subscribe('sendSMS', zhouqi, sendSMS)
pubsub.on('message', (...args) => {
    console.log('22', ...args)
})