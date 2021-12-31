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

}