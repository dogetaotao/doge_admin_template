import React, {useEffect, useState} from 'react';
import {Table, Tag} from "antd";
import {transactionList} from "../../../api/remoteSearch"

const columns = [
  {
    title: "Name",
    dataIndex: 'order_no',
    key: 'order_no',
    width: 200.
  },
  {
    title: "Consumption",
    dataIndex: "price",
    key: "price",
    width: 195,
    render: text => (`$${text}`),
  },
  {
    title: "Status",
    key: "tag",
    dataIndex: "tag",
    width: 100,
    render: (tag) => (
      <Tag color={tag === "pending" ? "magenta" : "green"} key={tag}>
        {tag}
      </Tag>
    ),
  },
]


const TransactionTable = () => {

  let _isMounted = false
  const [list, setList] = useState(null)

  const fetchData = () => {
    transactionList().then((response) => {
      const list = response.data.data.item.slice(0, 13)
      if (_isMounted) {
        console.log(list)
        setList(list)
      }
    })
  }

  useEffect(() => {
    _isMounted = true
    fetchData()
    return () => {
      _isMounted = false
    }
  }, [])

  return (
    <Table
      columns={columns}
      dataSource={list}
      pagination={false}
    />

  )
}

export default TransactionTable;
