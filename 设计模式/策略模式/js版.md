## 描述

策略模式，是侧重行为的一种常用设计模式。

## 好处

① 根据 key 动态执行相应的动作  
② 减少 if else 深层嵌套

## 示例

比如有这样一个需求：有 n 个订单  
1.未支付的订单，若是电子产品，每隔 2 小时提醒一次，电器 6 小时提醒一次，衣服或日用品每隔 24 小时提醒一次  
2.运输中的订单，每到达一个转送站，发送提醒  
3.已收货，提醒签收成功，可以评价或进行售后  
4.已评价，关闭订单
数据结构如下：

```js
const orders = [
	{ order_no: 1000, name: '小米', type: 1, state: unPay },
	{ order_no: 1001, name: '华为', type: 2, state: pending },
	{ order_no: 1002, name: '洗发露', type: 3, state: transport },
	{ order_no: 1003, name: '衬衫', type: 1, state: received },
	{ order_no: 1004, name: '电饭锅', type: 1, state: evaluation },
]
```

```ts
enum OrderState {
	unPay = 1, // 未支付
	pending = 2, // 待发货
	transport = 3, // 运输中
	received = 4, // 已收货
	evaluation = 5, // 评价
}

enum OrderType {
	electronic = 1, // 电子产品
	commodity = 2, // 日用品
	clothes = 3, // 衣服
	cooking = 4, // 厨具
}
```

正常的代码实现：

```js
function Order(orders) {
	for (const o of orders) {
		if (o.state === OrderState.unPay) {
			if (o.type === OrderType.electronic) {
				// every two hours send msg
			} else if (o.type === OrderType.cooking) {
				// every six hours send msg
			} else if (o.type === OrderType.commodity || o.type === OrderType.clothes) {
				// every twenty-four hours send msg
			}
		} else if (o.state === OrderState.pending) {
			// arrive, send
		} else if (o.state === OrderState.transport) {
			// ...
		} else if (o.state === OrderState.received) {
			// ...
		} else if (o.state === OrderState.evaluation) {
			// ...
		}
	}
}
```

代码看起来是不是显得很乱很丑，很容易就看混淆，理解起来也比较费劲，有的同学可能想到说用 switch。

```js
function Order(orders) {
	for (const o of orders) {
		switch (o.state) {
			case OrderState.unPay:
				if (o.type === OrderType.electronic) {
					// every two hours send msg
				} else if (o.type === OrderType.cooking) {
					// every six hours send msg
				} else if (o.type === OrderType.commodity || o.type === OrderType.clothes) {
					// every twenty-four hours send msg
				}
				break
			case OrderState.pending:
				// every six hours send msg
				break
			case OrderState.transport:
				// every two hours send msg
				break
			case OrderState.received:
				// ...
				break
			case OrderState.evaluation:
				// ...
				break
		}
	}
}
```

这样跟原来的 if else 相比 确实好了不少，但是如果要在加一下逻辑：评价等级，1 星，2 星，3 星，4 星，5 星，都执行不同的逻辑，这样 switch 也不太好，一样的臃肿，可读性很差，写代码的时候也容易写错！

那么怎么更好的解决呢？这时候我们本文介绍的设计模式就派上用场了。

```js
const { unPay, pending, transport, received, evaluation } = OrderState
const { electronic, cooking, commodity, clothes } = OrderType
const func = {
	[unPay]: {
		[electronic]: () => {}, // every two hours send msg
		[cooking]: () => {}, // every six hours send msg
		[commodity]: () => {}, // every twenty-four hours send msg
		[clothes]: () => {}, // every twenty-four hours send msg
	},
	[pending]: () => {}, // do something
	[transport]: () => {}, // do something
	[received]: () => {}, // do something
	[evaluation]: () => {}, // do something
}

function Order(orders) {
	for (const o of orders) {
		func[o.state] && func[o.state][o.type] && func[o.state][o.type]()
	}
}
```

这样代码看起来是不是很优雅了呢，读起来清新脱俗，逻辑也很清晰！就算加逻辑，变动逻辑也可以随时替换，例如加一个评价状态 星级，只需要定义 评价下的方法

```js
const func = {
	[unPay]: {
		[electronic]: () => {}, // every two hours send msg
		[cooking]: () => {}, // every six hours send msg
		[commodity]: () => {}, // every twenty-four hours send msg
		[clothes]: () => {}, // every twenty-four hours send msg
	},
	[pending]: () => {}, // do something
	[transport]: () => {}, // do something
	[received]: () => {}, // do something
	[evaluation]: {
		[one]: () => {}, // one star
		[two]: () => {}, // two star
		[three]: () => {}, // three star
		[four]: () => {}, // four star
		[five]: () => {}, // five star
	},
}
```

如果执行的逻辑多，还可以把里面的函数，再提取出来，这个比较简单了，不做赘述。

OK，本文至此结束！
