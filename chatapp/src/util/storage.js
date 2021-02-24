import store from 'store'

const storage = {
  currentAccount: store.get('currentAccount') || {},
  $store: store,
  read (key) {
    const accountList = store.get('accountList') || []
    const account = accountList.find(item => item.account === this.currentAccount.account) || {}
    return account[key]
  },
  write (key, data) {
    const accountList = store.get('accountList')
    const account = accountList.find(item => item.account === this.currentAccount.account)
    account[key] = data
    return store.set('accountList', accountList)
  },
  remove (key) {
    const accountList = store.get('accountList')
    const account = accountList.find(item => item.account === this.currentAccount.account)
    delete account[key]
    return store.set('accountList', accountList)
  },
  clear () {
    const accountList = store.get('accountList')
    const index = accountList.findIndex((item) => {
      return item.account === this.currentAccount.account
    })
    accountList.splice(index, 1)
    return store.set('accountList', accountList)
  },
  setAccount (userInfo) {
    this.currentAccount = userInfo
    store.set('currentAccount', userInfo)
    const accountList = store.get('accountList') || []
    const index = accountList.findIndex((item) => {
      return item.account === userInfo.account
    })
    if (index > -1) {
      return
    }
    const newAccount = {
      account: userInfo.account,
      userInfo,
      currentChatPerson: {},
      sessionInfo: [],
      historyList: {},
      friendList: [],
      postList: []
    }
    accountList.push(newAccount)
    store.set('accountList', accountList)
  }
}

export default storage
