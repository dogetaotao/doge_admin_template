import Mock from "mockjs"

const list = []
const count = 20

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    key: "@increment",
    order_no: "@NAME",
    price: '@float(1000, 15000, 0, 2)',
    "tag|1": ['已支付', '未支付']
  }))
}

export default {
  transactionList: (_) => {
    return {
      code: 20000,
      data: {item: list}
    }
  }
}
