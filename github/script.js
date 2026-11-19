const menuButton = document.getElementById('menuButton');
const accountNav = document.getElementById('accountNav');
menuButton.addEventListener('click', () => {
  const open = accountNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

const dialog = document.getElementById('accountDialog');
const dialogHeading = document.getElementById('dialogHeading');
const dialogMessage = document.getElementById('dialogMessage');
document.querySelectorAll('[data-open-modal]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const signup = link.dataset.openModal === 'signup';
    dialogHeading.textContent = signup ? 'Create your account' : 'Welcome back';
    dialogMessage.textContent = signup ? 'Sign up and start your wellbeing journey.' : 'Log in to access your membership.';
    dialog.showModal();
    accountNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});
document.getElementById('profileButton').addEventListener('click', () => {
  dialogHeading.textContent = 'Your account';
  dialogMessage.textContent = 'Log in or sign up to continue.';
  dialog.showModal();
});
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
document.getElementById('accountForm').addEventListener('submit', event => {
  event.preventDefault();
  alert('This is a demonstration only. Connect an authentication service to enable real accounts.');
  dialog.close();
  event.target.reset();
});

// Simple on-page search: scrolls to the first matching section or text element.
document.getElementById('searchForm').addEventListener('submit', event => {
  event.preventDefault();
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!query) return;
  const match = [...document.querySelectorAll('main h1, main h2, main h3, main p, main a')]
    .find(element => element.textContent.toLowerCase().includes(query));
  if (match) match.scrollIntoView({ behavior: 'smooth', block: 'center' });
  else alert('No matching content found. Try another search.');
});

// Calendar widget
let displayedMonth = new Date();
const monthYear = document.getElementById('monthYear');
const calendarGrid = document.getElementById('calendarGrid');
const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
function drawCalendar() {
  const year = displayedMonth.getFullYear();
  const month = displayedMonth.getMonth();
  monthYear.textContent = displayedMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  calendarGrid.replaceChildren();
  weekdays.forEach(day => {
    const cell = document.createElement('span');
    cell.className = 'weekday';
    cell.textContent = day;
    calendarGrid.appendChild(cell);
  });
  const offset = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < offset; i++) calendarGrid.appendChild(document.createElement('span'));
  const now = new Date();
  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement('span');
    cell.textContent = day;
    if (day === now.getDate() && month === now.getMonth() && year === now.getFullYear()) cell.className = 'today';
    calendarGrid.appendChild(cell);
  }
}
document.getElementById('previousMonth').addEventListener('click', () => {
  displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1);
  drawCalendar();
});
document.getElementById('nextMonth').addEventListener('click', () => {
  displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1);
  drawCalendar();
});
document.getElementById('year').textContent = new Date().getFullYear();
drawCalendar();
