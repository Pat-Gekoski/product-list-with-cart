'use strict'

const emptyCartButtons = document.querySelectorAll('.cart-btn')
const activeCartButtons = document.querySelectorAll('.active-cart-btn')
const removeButtons = document.querySelectorAll('.remove-btn')
const addButtons = document.querySelectorAll('.add-btn')
const totalItems = document.getElementById('total-items')
const overlay = document.getElementById('overlay')
const confirmModal = document.getElementById('confirmModal')

const menuItems = [
	{ id: 1, img: 'img/image1.jpg', name: 'Waffle with Berries', cost: 6.5, qty: 0 },
	{ id: 2, img: 'img/image2.jpg', name: 'Vanilla Bean Crème Brûlée', cost: 7.0, qty: 0 },
	{ id: 3, img: 'img/image3.jpg', name: 'Macaron Mix of Five', cost: 8.0, qty: 0 },
	{ id: 4, img: 'img/image4.jpg', name: 'Classic Tiramisu', cost: 5.5, qty: 0 },
	{ id: 5, img: 'img/image5.jpg', name: 'Pistachio Baklava', cost: 4.0, qty: 0 },
	{ id: 6, img: 'img/image6.jpg', name: 'Lemon Meringue Pie', cost: 5.0, qty: 0 },
	{ id: 7, img: 'img/image7.jpg', name: 'Red Velvet Cake', cost: 4.5, qty: 0 },
	{ id: 8, img: 'img/image8.jpg', name: 'Salted Caramel Brownie', cost: 5.5, qty: 0 },
	{ id: 9, img: 'img/image9.jpg', name: 'Vanilla Panna Cotta', cost: 6.5, qty: 0 },
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

function removeAllItemsOfKind(e) {
	if (e.target?.dataset?.removeId) {
		const itemId = +e.target?.dataset?.removeId
		const item = menuItems.find((item) => item.id === itemId)
		if (item) {
			item.qty = 0
			const qtyElem = document.getElementById(`qty-${itemId}`)
			if (qtyElem) {
				console.log(qtyElem)
				qtyElem.innerText = 0

				const emptyBtn = Array.from(emptyCartButtons).find((b) => b.dataset.id == itemId)
				const activeBtn = Array.from(activeCartButtons).find((b) => b.dataset.id == itemId)
				activeBtn.classList.remove('flex')
				activeBtn.classList.add('hidden')
				emptyBtn.classList.remove('hidden')
				emptyBtn.classList.add('flex')
			}
		}
	}
	updateCartUI()
}

function updateCartUI() {
	let cartHtml = ''
	let totalQty = 0
	let totalCost = 0

	removeOldListeners()

	for (const item of menuItems) {
		if (item.qty > 0) {
			totalQty += item.qty
			totalCost += item.qty * item.cost

			cartHtml += `
				<div class="flex flex-col">
					<div class="border-rose100 flex flex-row items-center justify-between border-b mb-4">
						<div class="flex flex-col gap-2">
							<p class="text-rose800 text-sm font-semibold">${item.name}</p>
							<div class="mb-4 flex items-center space-x-3">
								<p class="text-red text-sm font-semibold">${item.qty}x</p>
								<p class="text-rose500 text-sm">@ $${item.qty.toFixed(2)}</p>
								<p class="text-rose500 text-sm font-semibold">$${(item.qty * item.cost).toFixed(2)}</p>
							</div>
						</div>
						<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								data-remove-id="${item.id}"
								class="remove-all-btn group mb-4 inline-block cursor-pointer hover:fill-black"
							>
								<path
									d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5Z"
									fill="#AD8A85"
									class="duration-300 group-hover:fill-black"
								/>
								<path
									d="M13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z"
									fill="#AD8A85"
									class="duration-300 group-hover:fill-black"
								/>
							</svg>
					</div>
				</div>
			`
		}
	}

	if (totalQty) {
		const list = document.querySelector('.cart-items')
		const totalQtyEl = document.getElementById('totalQty')
		const emptyCart = document.querySelector('.empty-cart')
		emptyCart.classList.remove('flex')
		emptyCart.classList.add('hidden')
		list.classList.remove('hidden')
		list.classList.add('flex')

		cartHtml += `
			<div class="my-4 flex items-center justify-between">
					<p class="text-rose900 text-sm font-thin">Order Total</p>
					<p class="text-rose900 text-2xl font-bold">$${totalCost.toFixed(2)}</p>
				</div>
				<div class="bg-rose50 mb-6 mt-5 flex items-center justify-center gap-2 rounded-md p-4">
					<img src="img/carbon_tree.svg" alt="Carbon Tree" />
					<p class="text-sm font-thin">This is a <span class="font-semibold">carbon-neutral</span> delivery</p>
				</div>
				<button id="confirmOrder" class="bg-red text-md flex w-full items-center justify-center rounded-full p-3 text-white">
					Confirm Order
				</button>
			</div>
		`

		totalQtyEl.innerHTML = totalQty

		list.innerHTML = ''
		list.innerHTML = cartHtml

		addRemoveListeners()

		const confirmBtn = document.getElementById('confirmOrder')
		confirmBtn.addEventListener('click', openModal)
	} else {
		const list = document.querySelector('.cart-items')
		const totalQtyEl = document.getElementById('totalQty')
		const emptyCart = document.querySelector('.empty-cart')

		emptyCart.classList.remove('hidden')
		emptyCart.classList.add('flex')
		list.classList.remove('flex')
		list.classList.add('hidden')

		totalQtyEl.innerHTML = 0
	}
}

function removeOldListeners() {
	const removeBtns = document.querySelectorAll('.remove-all-btn')
	for (const button of removeBtns) {
		button.removeEventListener('click', removeAllItemsOfKind)
	}
}

function addRemoveListeners() {
	const removeBtns = document.querySelectorAll('.remove-all-btn')
	for (const button of removeBtns) {
		button.addEventListener('click', removeAllItemsOfKind)
	}
}

function openModal() {
	overlay.classList.remove('opacity-0', 'pointer-events-none')

	setTimeout(() => {
		confirmModal.classList.remove('translate-y-full')
		confirmModal.classList.add('translate-y-0')
	}, 100)
}

openModal()
