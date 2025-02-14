const print = document.querySelector('.print')
const cancel = document.querySelector('.cancel')
const back = document.querySelector('.back')
const result = document.querySelector('.result')
const numBtns = document.querySelectorAll('.btn')
const division = document.querySelector('.division')
const multiply = document.querySelector('.multiply')
const plus = document.querySelector('.plus')
const minus = document.querySelector('.minus')

const numbers = Array.from(numBtns)
const btns = [division, multiply, plus, minus].concat(numbers);

// 숫자패드 클릭 및 기호 클릭
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', () => {
    print.innerText += btns[i].innerHTML
  })
}

// 결과
result.addEventListener("click", () => {
  try {
    print.innerText = eval(print.innerText) // eval()는 권장하지 않음 "해킹 가능성 있음"
  } catch (err) {
    window.alert('계산이 안됩니다. \n' + err)
    print.innerText = ""
  }
})

// 초기화
cancel.addEventListener("click", () => {
  print.innerText = ''
})

// 뒤로가기 버튼 클릭시 마지막 숫자 제거
back.addEventListener('click', () => {
  print.innerText = print.innerText.slice(0, -1)
})

