fetch("./data/test.json")
  .then(res => res.json())
  .then(res => start(res))

function start(accountArr) {
  const accounts = accountArr.accounts
  const accountsLength = accounts.length

}