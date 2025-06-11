export default class Stack {
  constructor() {
    this._a = null;
    this._STACK_INIT_SIZE = 0;
    this._STACK_INCREMENT = 1;
    this._struct = {};
    this.InitStack();
  }
  /**getter stack*/
  get struct() {
    return this._struct;
  }
  get base() {
    return this._struct.base;
  }
  set base(value) {
    this._struct.base = value;
  }
  get top() {
    return this._struct.top;
  }
  set top(value) {
    this._struct.top = value;
  }
  get stackSize() {
    return this._struct.stackSize;
  }
  set stackSize(value) {
    this._struct.stackSize = value;
  }
  get length() {
    return this.StackLength();
  }
  InitStack() {
    this._a = [];
    this.base = null; // base is the stack bottom
    this.top = null;
    this.stackSize = this._STACK_INIT_SIZE;
    return;
  }
  ClearStack() {
    this._a = [];
    this.base = null;
    this.top = this.base;
    this.stackSize = 0;
  } // ClearStack
  StackEmpty() {
    return this.top === this.base
      && this._a.length === 0
  } // StackEmpty
  StackLength() {
    return this.stackSize;
  } // StackLength
  /**
   * @return The stack's top value. */
  GetTop() {
    if (this.StackEmpty()) return false;
    return this._a[this._a.length - 1];
  } // GetTop
  Push(value) {
    if (this.StackEmpty()) this.base = 0;
    this._a.push(value)
    this.top = this._a.length - 1;
    this.stackSize += this._STACK_INCREMENT;
  } // Push
  Pop() {
    if (this.StackEmpty()) return false;
    this._a.pop();
    if (this.stackSize !== 1) {
      this.top = this._a.length - 1;
    } else {
      this.base = null
      this.top = null;
    }
    this.stackSize -= this._STACK_INCREMENT;
  } // Pop
  StackTraverse(callback) {
    let actionFlag = true;
    for (let i = 0; i < this._a.length; i++) {
      const element = array[i];
      actionFlag = callback(element);
      if (!actionFlag) break;
    }
    return actionFlag;
  } // StackTraverse
}
