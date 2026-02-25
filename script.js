// let currentTab = 'all';

// function switchTab(tab) {
//   console.log(tab);
//   const tabs = ['all', 'interview', 'rejected'];
//   for (const t of tabs);
//   const tabName = document.getElementsByName("tab-" + t);
//   console.log(tabName);
// }
let interviewList = [];
let rejectedList = []
let total = document.getElementById('totalCount');
let interview = document.getElementById('interviewCount');
let rejected = document.getElementById('rejectedCount');

const allJobPost = document.getElementById('alljobPosts');
function calculateTotal() {
  total.innerText = allJobPost.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
};
calculateTotal()

const mainContiner = document.querySelector('main');
console.log(mainContiner);

const allBtn = document.getElementById('allBtn');
const interviewBtn = document.getElementById('interviewBtn');
const rejectedBtn = document.getElementById('rejectedBtn');
allBtn.addEventListener

function toggleStyle(id) {
  allBtn.classList.remove('bg-blue-500', 'text-white');
  interviewBtn.classList.remove('bg-blue-500', 'text-white');
  rejectedBtn.classList.remove('bg-blue-500', 'text-white');

  allBtn.classList.add('bg-gray-300', 'text-black');
  interviewBtn.classList.add('bg-gray-300', 'text-black');
  rejectedBtn.classList.add('bg-gray-300', 'text-black');

  const selacted = document.getElementById(id);
  selacted.classList.remove('bg-gray-300', 'text-black');
  selacted.classList.add('bg-blue-500', 'text-white')
}