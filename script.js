let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

// counters
const total = document.getElementById('totalCount');
const interview = document.getElementById('interviewCount');
const rejected = document.getElementById('rejectedCount');
const tabCount = document.getElementById('tabCount');

// buttons
const allBtn = document.getElementById('allBtn');
const interviewBtn = document.getElementById('interviewBtn');
const rejectedBtn = document.getElementById('rejectedBtn');

// sections
const allJobPost = document.getElementById('allJobPosts');
const filterSection = document.getElementById('filter-section');
const emptyState = document.getElementById('emptyState');
const mainContainer = document.querySelector('main');

// count
function calculateTotal() {
  total.innerText = allJobPost.children.length;
  interview.innerText = interviewList.length;
  rejected.innerText = rejectedList.length;

  if (currentStatus === 'interviewBtn') {
    tabCount.innerText = interviewList.length;
  } else if (currentStatus === 'rejectedBtn') {
    tabCount.innerText = rejectedList.length;
  } else {
    tabCount.innerText = allJobPost.children.length;
  }
}

// show/hide empty state
function toggleEmptyState(length) {
  if (length === 0) {
    emptyState.classList.remove('hidden'); // show empty
    filterSection.classList.add('hidden'); // hide jobs list
    allJobPost.classList.add('hidden'); // hide all jobs if on "all"
  } else {
    emptyState.classList.add('hidden'); // hide empty
    filterSection.classList.remove('hidden'); // show filtered jobs
    if (currentStatus === 'allBtn') allJobPost.classList.remove('hidden');
  }
}

calculateTotal();

// Tab Switch
function toggleStyle(id) {
  [allBtn, interviewBtn, rejectedBtn].forEach(btn => {
    btn.classList.remove('bg-blue-500', 'text-white');
    btn.classList.add('bg-gray-300', 'text-black');
  });

  const active = document.getElementById(id);
  active.classList.add('bg-blue-500', 'text-white');
  active.classList.remove('bg-gray-300', 'text-black');

  currentStatus = id;

  if (id === 'allBtn') {
    allJobPost.classList.remove('hidden');
    filterSection.classList.add('hidden');
    toggleEmptyState(allJobPost.children.length);
  }

  if (id === 'interviewBtn') {
    allJobPost.classList.add('hidden');
    renderInterview();
    toggleEmptyState(interviewList.length);
  }

  if (id === 'rejectedBtn') {
    allJobPost.classList.add('hidden');
    renderRejected();
    toggleEmptyState(rejectedList.length);
  }

  calculateTotal();
}

// click handler
mainContainer.addEventListener('click', function (event) {

  // INTERVIEW
  if (event.target.classList.contains('interview-btn')) {
    const post = event.target.closest('.job-post');

    const data = {
      companyName: post.querySelector('.company').innerText,
      jobTitle: post.querySelector('.job-title').innerText,
      details: post.querySelector('.details').innerText,
      jobDrescription: post.querySelector('.job-drescription').innerText,
      status: 'Interview'
    };

    rejectedList = rejectedList.filter(j => j.companyName !== data.companyName);

    if (!interviewList.find(j => j.companyName === data.companyName)) {
      interviewList.push(data);
    }

    post.querySelector('.status').innerText = 'Interview';

    if (currentStatus === 'interviewBtn') renderInterview();
    toggleEmptyState(interviewList.length);
    calculateTotal();
  }

  // REJECTED
  if (event.target.classList.contains('reject-btn')) {
    const post = event.target.closest('.job-post');

    const data = {
      companyName: post.querySelector('.company').innerText,
      jobTitle: post.querySelector('.job-title').innerText,
      details: post.querySelector('.details').innerText,
      jobDrescription: post.querySelector('.job-drescription').innerText,
      status: 'Rejected'
    };

    interviewList = interviewList.filter(j => j.companyName !== data.companyName);

    if (!rejectedList.find(j => j.companyName === data.companyName)) {
      rejectedList.push(data);
    }

    post.querySelector('.status').innerText = 'Rejected';

    if (currentStatus === 'rejectedBtn') renderRejected();
    toggleEmptyState(rejectedList.length);
    calculateTotal();
  }

  // DELETE
  if (event.target.closest('.delete-btn')) {
    const post = event.target.closest('.job-post');
    const companyName = post.querySelector('.company').innerText;

    interviewList = interviewList.filter(item => item.companyName !== companyName);
    rejectedList = rejectedList.filter(item => item.companyName !== companyName);

    document.querySelectorAll('#allJobPosts .job-post').forEach(job => {
      if (job.querySelector('.company').innerText === companyName) {
        job.remove();
      }
    });

    post.remove();

    if (currentStatus === 'interviewBtn') renderInterview();
    if (currentStatus === 'rejectedBtn') renderRejected();

    // update empty state dynamically
    let length =
      currentStatus === 'interviewBtn'
        ? interviewList.length
        : currentStatus === 'rejectedBtn'
          ? rejectedList.length
          : allJobPost.children.length;

    toggleEmptyState(length);
    calculateTotal();
  }
});

// render interview
function renderInterview() {
  filterSection.innerHTML = '';
  toggleEmptyState(interviewList.length);

  interviewList.forEach(job => {
    const div = document.createElement('div');
    div.className = 'job-post p-8 bg-white rounded-md space-y-2 relative';
    div.innerHTML = `
      <h2 class="company text-3xl font-bold">${job.companyName}</h2>
      <p class="job-title text-xl">${job.jobTitle}</p>
      <p class="details text-gray-700">${job.details}</p>
      <p class="status btn w-[120px]">${job.status}</p>
      <p class="job-drescription text-gray-700">${job.jobDrescription}</p>

      <div class="mt-4 flex gap-3">
        <button class="interview-btn btn border border-green-600 text-green-600">Interview</button>
        <button class="reject-btn btn border border-red-600 text-red-600">Rejected</button>
      </div>

      <div class="absolute top-5 right-5">
        <button class="btn delete-btn h-[50px] w-[50px] rounded-full">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;
    filterSection.appendChild(div);
  });
}

// render rejected
function renderRejected() {
  filterSection.innerHTML = '';
  toggleEmptyState(rejectedList.length);

  rejectedList.forEach(job => {
    const div = document.createElement('div');
    div.className = 'job-post p-8 bg-white rounded-md space-y-2 relative';
    div.innerHTML = `
      <h2 class="company text-3xl font-bold">${job.companyName}</h2>
      <p class="job-title text-xl">${job.jobTitle}</p>
      <p class="details text-gray-700">${job.details}</p>
      <p class="status btn w-[120px]">${job.status}</p>
      <p class="job-drescription text-gray-700">${job.jobDrescription}</p>

      <div class="mt-4 flex gap-3">
        <button class="interview-btn btn border border-green-600 text-green-600">Interview</button>
        <button class="reject-btn btn border border-red-600 text-red-600">Rejected</button>
      </div>

      <div class="absolute top-5 right-5">
        <button class="btn delete-btn h-[50px] w-[50px] rounded-full">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;
    filterSection.appendChild(div);
  });
}