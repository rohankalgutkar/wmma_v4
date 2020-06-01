function navClick(input) {
  location.href("/" + input + ".html")
}

var openmodal = document.querySelectorAll('#add-account')
for (var i = 0; i < openmodal.length; i++) {
  openmodal[i].addEventListener('click', function (event) {
    event.preventDefault()
    toggleModal()
  })
}

const overlay = document.querySelector('.modal-overlay')
overlay && overlay.addEventListener('click', toggleModal)

var closemodal = document.querySelectorAll('.modal-close')
if (closemodal) {
  for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener('click', toggleModal)
  }
}

document.onkeydown = function (evt) {
  evt = evt || window.event
  var isEscape = false
  if ("key" in evt) {
    isEscape = (evt.key === "Escape" || evt.key === "Esc")
  } else {
    isEscape = (evt.keyCode === 27)
  }
  if (isEscape && document.body.classList.contains('modal-active')) {
    toggleModal()
  }
};


function toggleModal() {
  const body = document.querySelector('body')
  const modal = document.querySelector('.modal')
  modal.classList.toggle('opacity-0')
  modal.classList.toggle('pointer-events-none')
  body.classList.toggle('modal-active')
}

//temp
// document.getElementById("add-account").click();


const accountAddedNotif = document.getElementById('accountAddedNotif');

if (accountAddedNotif) {
  setTimeout(() => {
    accountAddedNotif.classList.add('hidden')
  }, 3000)
}


// Acc page form validation
function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

function addAccToggleSubmit() {
  const submitBtn = document.getElementById('addAccSubmitBtn')
  const ipAccName = document.getElementById('ipAccName')
  // const ipLast4Digit = document.getElementById('ipLast4Digit')
  const ipCurrBal = document.getElementById('ipCurrBal')
  if (ipAccName.value && ipCurrBal.value) {
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-50')
  } else if (!submitBtn.disabled) {
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-50')
  }

}

const addAccForm = document.getElementById('addAccountForm')
if (addAccForm) {
  addAccForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const ipLast4Digit = document.getElementById('ipLast4Digit')
    const addAccountValidation = document.getElementById('addAccountValidation');
    if (ipLast4Digit.value.length != 4 && ipLast4Digit.value.length != 0) {
      addAccountValidation.classList.remove('hidden')
      setTimeout(() => {
        addAccountValidation.classList.add('hidden')
      }, 3000)
      return false
    }

    if (!document.getElementById('addAccSubmitBtn').disabled) {
      addAccForm.submit()
    }
  })
}