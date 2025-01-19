'use strict'

const emptyCartButtons = document.querySelectorAll('.cart-btn')
const activeCartButtons = document.querySelectorAll('.active-cart-btn')
const removeButtons = document.querySelectorAll('.remove-btn')
const addButtons = document.querySelectorAll('.add-btn')

const cartItems = []
const menuItems = [
	{ id: 1, name: 'Waffle with Berries', cost: 6.5, qty: 0 },
	{ id: 2, name: 'Vanilla Bean Crème Brûlée', cost: 7.0, qty: 0 },
	{ id: 3, name: 'Macaron Mix of Five', cost: 8.0, qty: 0 },
	{ id: 4, name: 'Classic Tiramisu', cost: 5.5, qty: 0 },
	{ id: 5, name: 'Pistachio Baklava', cost: 4.0, qty: 0 },
	{ id: 6, name: 'Lemon Meringue Pie', cost: 5.0, qty: 0 },
	{ id: 7, name: 'Red Velvet Cake', cost: 4.5, qty: 0 },
	{ id: 8, name: 'Salted Caramel Brownie', cost: 5.5, qty: 0 },
	{ id: 9, name: 'Vanilla Panna Cotta', cost: 6.5, qty: 0 },
]

for (const button of emptyCartButtons) {
	button.addEventListener('click', (e) => {
		const id = button.dataset.id
		button.classList.remove('flex')
		button.classList.add('hidden')

		for (const btn of activeCartButtons) {
			if (btn.dataset.id === id) {
				btn.classList.remove('hidden')
				btn.classList.add('flex')
			}
		}

		addToCart(id)
	})
}

for (const button of removeButtons) {
	button.addEventListener('click', (e) => {
		const id = button.closest('.active-cart-btn').dataset.id
		removeFromCart(id)
	})
}

for (const button of addButtons) {
	button.addEventListener('click', (e) => {
		const id = button.closest('.active-cart-btn').dataset.id
		addToCart(id)
	})
}

function addToCart(itemId) {
	const item = menuItems.find((item) => item.id === +itemId)
	if (item) {
		item.qty++
		const qtyElem = document.getElementById(`qty-${itemId}`)
		if (qtyElem) {
			qtyElem.innerText = item.qty
		}
	}

	updateCartUI()
}

function removeFromCart(itemId) {
	const item = menuItems.find((item) => item.id === +itemId)
	if (item) {
		item.qty--
		const qtyElem = document.getElementById(`qty-${itemId}`)
		if (qtyElem) {
			qtyElem.innerText = item.qty
		}
		if (item.qty < 1) {
			const emptyBtn = Array.from(emptyCartButtons).find((b) => b.dataset.id === itemId)
			const activeBtn = Array.from(activeCartButtons).find((b) => b.dataset.id === itemId)
			activeBtn.classList.remove('flex')
			activeBtn.classList.add('hidden')
			emptyBtn.classList.remove('hidden')
			emptyBtn.classList.add('flex')
		}
	}

	updateCartUI()
}

function updateCartUI() {
	console.log(menuItems)
}
