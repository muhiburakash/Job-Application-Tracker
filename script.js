
let interviewList = [];
let rejectedList = []
let total = document.getElementById('totalCount');
let interview = document.getElementById('interviewCount');
let rejected = document.getElementById('rejectedCount');

const allJobPost = document.getElementById('allJobPosts');
function calculateTotal() {
  total.innerText = allJobPost.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
};
calculateTotal()

const mainContiner = document.querySelector('main');
const filterSection = document.getElementById('filter-section')

const allBtn = document.getElementById('allBtn');
const interviewBtn = document.getElementById('interviewBtn');
const rejectedBtn = document.getElementById('rejectedBtn');
allBtn.addEventListener

function toggleStyle(id) {
  //remove blue bg 
  allBtn.classList.remove('bg-blue-500', 'text-white');
  interviewBtn.classList.remove('bg-blue-500', 'text-white');
  rejectedBtn.classList.remove('bg-blue-500', 'text-white');
  //added gray bg normal button
  allBtn.classList.add('bg-gray-300', 'text-black');
  interviewBtn.classList.add('bg-gray-300', 'text-black');
  rejectedBtn.classList.add('bg-gray-300', 'text-black');
  //added blue bg active button
  const selacted = document.getElementById(id);
  selacted.classList.remove('bg-gray-300', 'text-black');
  selacted.classList.add('bg-blue-500', 'text-white');

  if (id == 'interviewBtn') {
    allJobPost.classList.add('hidden');
    filterSection.classList.remove('hidden')
  }
  else if (id == 'allBtn') {
    allJobPost.classList.remove('hidden');
    filterSection.classList.add('hidden')
  }
}

mainContiner.addEventListener('click', function (evant) {
  console.log(evant.target.classList.contains('interview-btn'))
  if (evant.target.classList.contains('interview-btn')) {
    const parentNode = evant.target.parentNode.parentNode;
    const companyName = parentNode.querySelector('.company').innerText;
    const jobTitle = parentNode.querySelector('.job-title').innerText;
    const details = parentNode.querySelector('.details').innerText;
    const status = parentNode.querySelector('.status').innerText;
    const jobDrescription = parentNode.querySelector('.job-drescription').innerText;
    parentNode.querySelector('.status').innerText = 'Interview'
    const postInfo = {
      companyName,
      jobTitle,
      details,
      status: 'Interview',
      jobDrescription
    }
    const interviewExit = interviewList.find(item => item.interview == postInfo.interview);


    if (!interviewExit) {
      interviewList.push(postInfo);
    }
    calculateTotal()
    renderInterview()
  }
})

function renderInterview() {

  filterSection.innerText = '';
  for (let interview of interviewList) {
    console.log(interview)
    let div = document.createElement('div');
    div.className = 'job-post p-8 bg-white rounded-md space-y-2 relative'
    div.innerHTML = `
          <h2 class="company text-3xl font-bold">${interview.companyName}</h2>
          <p class="job-title font-medium text-xl">${interview.jobTitle}</p>
          <p class="details text-gray-700">${interview.details}</p>
          <p class="status btn w-[120px]">${interview.status}</p>
          <p class="job-drescription text-gray-700">${interview.jobDrescription}</p>
          <div class="mt-4 flex gap-3">
            <button class="interview-btn btn border border-green-600 text-green-600 ">Interview</button>
            <button class="reject-btn btn border border-red-600 text-red-600 ">Rejected</button>
          </div>
          <div class="absolute top-5 right-5">
            <button class="btn delete-btn h-[50px] w-[50px] rounded-full "><i
                class="fa-regular fa-trash-can"></i></button>
          </div>
    `
    filterSection.appendChild(div);
  }
}