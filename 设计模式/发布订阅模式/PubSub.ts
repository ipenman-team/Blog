import { EventEmitter } from "events";
import { createServer, Server } from "net";
const ee = new EventEmitter()

export class Person {
    private _id: number
    private _name: string
    constructor(name: string) {
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
export class PubSub {
    private subscribers: { [x: string]: any[]; }
    private server: Server

    constructor() {
        this.subscribers = {}
        this.server = createServer(() => { })
        this.listen()
    }

    private listen() {
        this.server.listen(3307, () => { })
    }
    private trigger(keyword: string, ...args) {
        switch (keyword) {
            case 'subscribe':
                this.server.emit("subscribe", ...args)
                break
            case 'message':
                this.server.emit("message", ...args)
                break
        }

    }

    on(keyword: string, handle: (...args: any[]) => void) {
        this.server.on(keyword, () => {
            handle.length && handle()
        })
    }

    publish(topic: string, msg: string) {
        const events = this.subscribers[topic]
        if (!events) return
        events.forEach((event) => {
            event.handle.call(event.target, msg, event.target)
            this.trigger("message", msg, event.target)
        })
    }

    subscribe(topic: string, target: Person, handle: (...args) => void) {
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