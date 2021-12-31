fetch("./data/test.json")
  .then(res => res.json())
  .then(res => start(res))

function start(accountArr) {
  const accounts = accountArr.accounts
  const accountsLength = accounts.length
  console.log(accounts)

  //첫번째 계좌인지 판별 후 섹션 클론
  const main = document.querySelector('.main-contents-wrap')
  const accountSection = document.querySelector('.view-page')
  console.log(main, accountSection)

  accounts.forEach((cur, index) => {
    if (index !== 0) {
      const cloneSection = accountSection.cloneNode(true)
      cloneSection.className = `view-page swiper-slide accont-${index + 1}`
      main.append(cloneSection)
    }
  })

  //각 계좌마다 섹션에 정보출력
  for (let i = 0; i < 1; i++) {
    const account = accounts[i]
    makeComponent(account, i)
  }
}

const makeComponent = (account, index) => {
  console.log(account)

  const targetSection = document.querySelector(`.accont-${index + 1}`)

  //header정보 
  const header = targetSection.querySelector('.header-title')
  //계좌 정보 
  const accNum = targetSection.querySelector('.account-number')
  const accTotal = targetSection.querySelector('.account-total')
  const barGage = targetSection.querySelector('.bar-data')
  const barBtn = targetSection.querySelector('.bar-btn')
  const remainDate = targetSection.querySelector('.account-remain .date')
  const remainAmount = targetSection.querySelector('.account-remain .amount')

  //데이터 출력
  header.innerText = account.accountName
  accNum.innerText = account.accountNum
  accTotal.innerText = `${Number(account.accountCash).toLocaleString()}원`
  barGage.style.backgroundColor = account.barColor
  barGage.style.width = `${leftBudgetPercent()}%`
  barBtn.style.left = `${leftBudgetPercent()}%`
  remainDate.innerText = leftDay()
  remainAmount.innerText = leftBudget()
}

const leftBudgetPercent = () => {
  return 70
}
const leftBudget = () => {
  return 5
}
const leftDay = () => {
  return 5
}