# 发布/订阅 模式（Pub/Sub design pattern）

## 描述（Describe）

发布订阅模式是常见处理消息的模式，流程如下图：
![](https://github-blog-resource.oss-cn-beijing.aliyuncs.com/pub.jpg)

订阅者和发布者之间需要一个调度中心来执行具体的操作。这个调度中心可以是中间件，

## 好处（Virtues）

① 松解耦：抽象订阅者和发布者，他们彼此相互是不知道对方，而他们只需要负责自己要做的事（订阅者只需要一次性订阅某个事件，而发布者只需要发布消息）

② 可扩展性

## 简易实现（Example）

```ts
class PubSub {
	private subscribers
	constructor() {
		this.subscribers = {}
	}

	publish(topic: string, msg: string) {
		const events = this.subscribers[topic]
		events.forEach((event) => event.handle.call(event.target, msg, event.target))
	}

	subscribe(topic: string, target: Person, handle: Function) {
		this.subscribers[topic] = this.subscribers[topic] || []
		this.subscribers[topic].push({ target, handle })
	}

	unsubscribe(topic: string, target: Person) {
		if (this.subscribers[topic]) {
			const subscriberIndex = this.subscribers[topic].findIndex((event) => event.target.id === target.id)
			if (subscriberIndex !== -1) {
				this.subscribers[topic].splice(subscriberIndex, 1)
				console.log(`${target.name} unsubscribe! surplus member number is ${this.subscribers[topic].length}`)
			}
		}
	}
}

class Person {
	private _id: number
	private _name: string
	constructor(name) {
		this._id = new Date().getTime()
		this._name = name
	}
	get id() {
		return this._id
	}
	get name() {
		return this._name
	}
	set name(name: string) {
		this._name = name
	}
}

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
function sendEmail(msg) {
	console.log(`send email to ${this.name}! content: ${msg}`)
}
// send SMS
function sendSMS(msg) {
	console.log(`send SMS to ${this.name}! content: ${msg}`)
}

pubsub.subscribe('subscribe', zhangsan, subscribeEvent)
pubsub.subscribe('sendMail', zhangsan, sendEmail)
pubsub.subscribe('sendSMS', lisi, sendSMS)
pubsub.subscribe('sendSMS', zhaoliu, sendSMS)
pubsub.subscribe('sendSMS', zhouqi, sendSMS)

//  publish event message
pubsub.publish('subscribe', `subscribe success!`)
pubsub.publish('sendSMS', 'help me get the package')
pubsub.unsubscribe('sendSMS', lisi)
pubsub.publish('sendSMS', 'help me get the package')
```
