class Typing {
  constructor(opts) {
    this.opts = opts || {};
    this.source = opts.source;
    this.output = opts.output;
    this.dely = opts.dely || 30;
    this.chain = {
      parent: null,
      dom: this.output,
      val: []
    }
    if (!(typeof this.opts.done === 'function')) {
      this.opts.done = function () {
      }
    }
  }

  /**
   * 初始化化对象
   */
  init() {
    this.chain.val = this.convert(this.source, this.chain.val)
  }

  /**
   * 得到所有需打印的字符并且存入数组中
   * @param dom
   * @param arr
   * @returns {*}
   */
  convert(dom, arr) {
    let children = Array.from(dom.childNodes)
    for (let i = 0; i < children.length; i++) {
      let node = children[i]
      if (node.nodeType === 3) {
        //把字符串拆成一个个单独字符再储存到数组中
        arr = arr.concat(node.nodeValue.split(''))
      }
      //如果节点不是文本继续递归获取文本
      else if (node.nodeType === 1) {
        let val = []
        val = this.convert(node, val)
        arr.push({
          'dom': node,
          'val': val
        })
      }
    }
    return arr
  }

  /**
   * 打印单个字符
   * @param dom
   * @param val
   * @param callback
   */
  print(dom, val, callback) {
    setTimeout(() => {
      dom.appendChild(document.createTextNode(val))
      callback()
    }, this.dely)
  }

  /**
   * 打印dom里的字符
   * @param e
   */
  play(e) {
    //打印最后一个字节
    if(!e.val.length) {
      if(e.parent) {
        this.play(e.parent)
      } else {
        this.opts.done()
      }
      return
    }
    //提出数组中第一个元素并且将其删除
    let current = e.val.shift()
    if(typeof current === 'string') {
      this.print(e.dom, current, () => {
        this.play(e) //继续打印下一个节点
      })
    } else {
      //克隆节点，并且把节点加入e.dom最后
      let dom = current.dom.cloneNode()
      e.dom.appendChild(dom)
      this.play({
        parent: e,
        dom,
        val: current.val
      })
    }
  }

  /**
   * 开启
   */
  start() {
    this.init()
    this.play(this.chain)
  }
}

export default Typing
