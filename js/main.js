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
      cloneSection.className = `view-page swiper-slide account-${index + 1}`
      main.append(cloneSection)
    }
  })

  //각 계좌마다 섹션에 정보출력
  for (let i = 0; i < 3; i++) {
    const account = accounts[i]
    makeComponent(account, i)
  }
}

const makeComponent = (account, index) => {
  console.log(account)
  const targetSection = document.querySelector(`.account-${index + 1}`)

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
  barGage.style.width = `${leftBudgetPercent(account.TotalSpend, account.Budget)}%`
  barBtn.style.left = `${leftBudgetPercent(account.TotalSpend, account.Budget)}%`
  remainDate.innerText = leftDay()
  remainAmount.innerText = leftBudget(account.TotalSpend, account.Budget)

  //저금통 
  const goalWrap = targetSection.querySelector('.goal-list')

  account.saveList.forEach(ele => {
    const goalItem = document.createElement('li')
    const colorBox = document.createElement('div')
    const goalTit = document.createElement('p')
    const goalTotal = document.createElement('p')
    goalItem.className = "goal-item"
    colorBox.className = "goal-item-color-box"
    goalTit.className = "goal-tit"
    goalTotal.className = "goal-total"
    
    colorBox.appendChild(goalTit)
    colorBox.appendChild(goalTotal)
    goalItem.appendChild(colorBox)
    goalWrap.appendChild(goalItem)

    colorBox.style.backgroundColor = ele.color
    colorBox.style.width =  `${(ele.SavedMoney / ele.goal) * 100}%`
    goalTit.innerText = ele.name
    goalTotal.innerText = `${calTotal(ele.goal, ele.SavedMoney)}원`
  })

}

const leftBudgetPercent = (totalSpend, budget) => {
  return (Number(totalSpend) / Number(budget)) * 100
}
const leftBudget = (totalSpend, budget) => {
  return Number(budget) - Number(totalSpend)
}
const leftDay = () => {
  return // 말일 - 오늘
}
const calTotal = (goal, SavedMoney) => {
  return (Number(goal) -Number(SavedMoney)).toLocaleString()
}

