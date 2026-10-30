const events = [
  {
    id: 1,
    category: 'Music',
    title: 'Sunset Live Festival',
    date: 'Aug 24 • 7:30 PM',
    location: 'Seattle, WA',
    price: 79,
    seatsLeft: 2100,
    tag: 'Featured'
  },
  {
    id: 2,
    category: 'Food',
    title: 'Harbor Food Market',
    date: 'Aug 26 • 12:00 PM',
    location: 'Portland, OR',
    price: 32,
    seatsLeft: 540,
    tag: 'Popular'
  },
  {
    id: 3,
    category: 'Tech',
    title: 'AI Startup Summit',
    date: 'Aug 29 • 9:00 AM',
    location: 'San Francisco, CA',
    price: 149,
    seatsLeft: 310,
    tag: 'New'
  },
  {
    id: 4,
    category: 'Sports',
    title: 'City 5K Night Run',
    date: 'Sep 02 • 6:15 PM',
    location: 'Denver, CO',
    price: 45,
    seatsLeft: 980,
    tag: 'Hot'
  },
  {
    id: 5,
    category: 'Art',
    title: 'Modern Art Gallery',
    date: 'Sep 05 • 5:30 PM',
    location: 'Chicago, IL',
    price: 28,
    seatsLeft: 180,
    tag: 'Limited'
  }
];

const categoryFilters = document.querySelectorAll('.chip');
const eventList = document.getElementById('eventList');
const selectedEventName = document.getElementById('selectedEventName');
const selectedEventPrice = document.getElementById('selectedEventPrice');
const ticketQty = document.getElementById('ticketQty');
const subtotal = document.getElementById('subtotal');
const fee = document.getElementById('fee');
const total = document.getElementById('total');
const checkoutButton = document.getElementById('checkoutButton');
const notificationList = document.getElementById('notificationList');
const increaseQtyButton = document.getElementById('increaseQty');
const decreaseQtyButton = document.getElementById('decreaseQty');

let currentCategory = 'All';
let selectedEvent = events[0];
let qty = 2;

function formatPrice(value) {
  return `$${value}`;
}

function updateTotals() {
  const serviceFee = qty * 6;
  const subtotalValue = selectedEvent.price * qty;
  const totalValue = subtotalValue + serviceFee;

  subtotal.textContent = formatPrice(subtotalValue);
  fee.textContent = formatPrice(serviceFee);
  total.textContent = formatPrice(totalValue);
  ticketQty.textContent = qty;
  selectedEventName.textContent = selectedEvent.title;
  selectedEventPrice.textContent = formatPrice(selectedEvent.price);
}

function renderEvents() {
  const filtered = currentCategory === 'All'
    ? events
    : events.filter((event) => event.category === currentCategory);

  eventList.innerHTML = filtered.map((event) => `
    <article class="event-card" data-id="${event.id}">
      <div class="event-poster ${event.category.toLowerCase()}">
        <span class="poster-badge">${event.tag}</span>
      </div>

      <div class="event-info">
        <div class="event-topline">
          <span class="meta">${event.category}</span>
          <span class="meta">${event.seatsLeft} left</span>
        </div>
        <h4>${event.title}</h4>
        <div class="event-meta">
          <span>${event.date}</span>
          <span>•</span>
          <span>${event.location}</span>
        </div>
      </div>

      <div class="event-price">
        <div class="price-tag">${formatPrice(event.price)} <small>ticket</small></div>
        <button class="book-btn" data-id="${event.id}">Book now</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.book-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const eventId = Number(button.dataset.id);
      selectedEvent = events.find((event) => event.id === eventId) || events[0];
      qty = 2;
      updateTotals();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

categoryFilters.forEach((chip) => {
  chip.addEventListener('click', () => {
    categoryFilters.forEach((item) => item.classList.toggle('active', item === chip));
    currentCategory = chip.textContent.trim();
    renderEvents();
  });
});

increaseQtyButton.addEventListener('click', () => {
  qty = Math.min(qty + 1, 10);
  updateTotals();
});

decreaseQtyButton.addEventListener('click', () => {
  qty = Math.max(qty - 1, 1);
  updateTotals();
});

checkoutButton.addEventListener('click', () => {
  const ticketSummary = `${qty} ticket${qty > 1 ? 's' : ''} for ${selectedEvent.title}`;
  const newItem = document.createElement('li');
  newItem.textContent = `Booked: ${ticketSummary} • ${total.textContent}`;
  notificationList.prepend(newItem);
  checkoutButton.textContent = 'Booked!';
  checkoutButton.disabled = true;
  setTimeout(() => {
    checkoutButton.textContent = 'Confirm booking';
    checkoutButton.disabled = false;
  }, 1400);
});

renderEvents();
updateTotals();
