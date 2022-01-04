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
  for (let i = 0; i < accountsLength; i++) {
    const account = accounts[i]
    makeComponent(account, i)
    slideSec(account, i)
  }
}

const makeComponent = (account, index) => {
  console.log(account)
  const targetSection = document.querySelector(`.account-${index + 1}`)

  //header정보 
  const header = targetSection.querySelector('.header-title')
  const headerImg = targetSection.querySelector('.img-profile')
  //계좌 정보 
  const accNum = targetSection.querySelector('.account-number')
  const accTotal = targetSection.querySelector('.account-total')
  const barGage = targetSection.querySelector('.bar-data')
  const barBtn = targetSection.querySelector('.bar-btn')
  const remainDate = targetSection.querySelector('.account-remain .date')
  const remainAmount = targetSection.querySelector('.account-remain .amount')

  //데이터 출력
  header.innerText = account.accountName
  headerImg.src = `./img/header-img${index + 1}.png`
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
    colorBox.style.width = `${(ele.SavedMoney / ele.goal) * 100}%`
    goalTit.innerText = ele.name
    goalTotal.innerText = `${calTotal(ele.goal, ele.SavedMoney)}원`
  })

  //지출내역
  const daySpendingUl = targetSection.querySelector('.detail-date-list')

  let currDate
  let currIndex = 0
  account.bankList.reverse()
  account.bankList.forEach((day, index, bankList) => {
    if (currDate !== day.date) {
      // outer ul li생성
      const dayItem = document.createElement('li')
      const dayTit = document.createElement('h3')
      const dayTotal = document.createElement('p')
      dayItem.className = "detail-date-item"
      dayTit.className = "date-tit bk"
      dayTotal.className = "date-total gray"

      dayItem.appendChild(dayTit)
      dayItem.appendChild(dayTotal)
      daySpendingUl.appendChild(dayItem)

      dayTit.innerText = calcDate(day.date)
      dayTotal.innerText = `${calcTotalSpend(day.date, account.bankList)}원 지출`
      //inner ul생성
      const innerUl = document.createElement('ul')
      const innerLi = document.createElement('li')
      const spendTit = document.createElement('span')
      const spendMoney = document.createElement('span')
      innerUl.className = "day-list"
      innerLi.className = "day-content"
      spendTit.className = "day-cont-tit"
      spendMoney.className = "day-cont-total"

      innerLi.appendChild(spendTit)
      innerLi.appendChild(spendMoney)
      innerUl.appendChild(innerLi)
      dayItem.appendChild(innerUl)

      spendTit.innerText = day.history
      spendMoney.innerHTML = checkIncome(day.price, day.income)
      currIndex++
    } else {
      const dayList = targetSection.querySelector(`.detail-date-list > li:nth-child(${currIndex}) .day-list`)
      const cloneSpendLi = dayList.querySelector('li').cloneNode(true)

      cloneSpendLi.querySelector('.day-cont-tit').innerText = day.history
      cloneSpendLi.querySelector('.day-cont-total').innerHTML = checkIncome(day.price, day.income)

      dayList.appendChild(cloneSpendLi)
    }
    currDate = day.date
  })
}
const leftBudgetPercent = (totalSpend, budget) => {
  return (Number(totalSpend) / Number(budget)) * 100
}
const leftBudget = (totalSpend, budget) => {
  return Number(budget) - Number(totalSpend)
}
const leftDay = () => {
  const today = new Date('2021/10/4') //임의로 오늘 설정 
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const lastDay = new Date(year, month, 0)

  return lastDay.getDate() - today.getDate() // 말일 - 오늘
}
const calTotal = (goal, SavedMoney) => {
  return (Number(goal) - Number(SavedMoney)).toLocaleString()
}
const checkIncome = (price, income) => {
  if (income == "in") {
    return `<span class="day-cont-total income">${price}</span>`
  } else {
    return `<span class="day-cont-total">${price}</span>`
  }
}

const calcDate = (date) => {
  const today = new Date('2021/10/4') //임의로 오늘 설정 
  const todayTime = today.getTime()
  const currDay = new Date(date)
  const currDayTime = currDay.getTime()
  let diffDay = todayTime - currDayTime
  diffDay = diffDay / 1000 / 60 / 60 / 24 //시간을 다시 날짜로 변경
  diffDay = Math.abs(Number.parseInt(diffDay)); //절대값만 반환

  day = 0
  //console.log(diffDay)
  if (diffDay == 0) {
    day = '오늘'
  } else if (diffDay == 1) {
    day = '어제'
  } else if (diffDay <= 7) {
    day = `${diffDay}일전`
  } else {
    day = date
  }

  return day
}
const calcTotalSpend = (date, account) => {
  const sameDate = account.filter(ele => ele.date == date && ele.income == "out")
  const total = sameDate.reduce(
    (sum, curr) => sum + curr.price,
    0)
  return total.toLocaleString()
}
const slideSec = (account, i) => {
  const targetSection = document.querySelector(`.account-${i + 1}`)
  const touchBar = targetSection.querySelector('.show-full-list');
  const botSec = targetSection.querySelector('.bottom-section');

  // 지출내역 클릭시 위로 슬라이드 

  touchBar.addEventListener("click", () => botSec.classList.toggle('active'))
}