const listItems = []

const form = document.getElementById('form-itens')
const itensInput = document.getElementById('receber-item')
const ulItems = document.getElementById('lista-de-itens')
const ulItemsBuy = document.getElementById('itens-comprados')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  SaveItem()
  showItems()
  itensInput.focus()
})

function SaveItem() {
  const item = itensInput.value

  const isDuplicate = listItems.some(
    (element) =>
      element.value.toUpperCase() === item.toUpperCase()
  )

  if (isDuplicate) {
    alert('Item já existe')
  } else {
    listItems.push({ value: item, check: false })
  }

  itensInput.value = ''
}

function showItems() {
  ulItems.innerHTML = ''
  ulItemsBuy.innerHTML = ''

  listItems.forEach((element, index) => {
    if (element.check) {
      ulItemsBuy.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" checked class="is-clickable" />
            <span class="itens-comprados is-size-5">${element.value}</span>
          </div>
          <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>`
    } else {
      ulItems.innerHTML += `
      <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
              <input type="checkbox" class="is-clickable" />
              <input type="text" class="is-size-5" value="${element.value}"></input>
          </div>
          <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      `
    }

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach((item) => {
      item.addEventListener('click', (event) => {
        const valueOfElement = event.target.parentElement.parentElement.getAttribute('data-value')
        listItems[valueOfElement].check = event.target.checked

        showItems()
      })
    })
  })
}