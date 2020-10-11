'use strict';
console.log('Starting up');

function init() {
    renderProjs();

}

function renderProjs() {
    var $elProjects = $('.projects');
    var strHTML = gProjs.reduce((acc, proj) => acc += `<div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onClick="renderModal('${proj.id}')">
        <div class="portfolio-hover">
            <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
            </div>
        </div>
        <img class="img-fluid" src="img/proj/${proj.id}.jpg" >
 </a>
        <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
        </div>
</div>` , '');

    $elProjects.html(strHTML);
}

function renderModal(id) {
    var $elModal = $('.modal-container');
    var proj = getProj(id);
    var strHTML = `<div
    class="portfolio-modal modal fade"
    id="portfolioModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
<h2>${proj.name}</h2>
                <p class="item-intro text-muted">
                  ${proj.title}
                </p>
                <img
                  class="img-fluid d-block mx-auto"
                  src="img/proj/${proj.id}.jpg"
                  alt=""
                />
                <p>
${proj.desc}
                </p>
                <ul class="list-inline">
                  <li>Date: September 2020</li>
                  <li>Client: <a href="https://moshekalman.github.io/${proj.url}/"
                   target="_blank">
                   https://moshekalman.github.io/${proj.url}</a></li>
                  <li>
                  Categories: <span class="badge badge-secondary">${proj.labels[0]}</span>
                  <span class="badge badge-secondary">${proj.labels[1]}</span>
                  </li>
                </ul>
                <button
                  class="btn btn-primary"
                  data-dismiss="modal"
                  type="button"
                >
                  <i class="fa fa-times"></i>
                  Close Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    $elModal.html(strHTML);
}

function contactEmail() {
    var $elSubject = $('.subject');
    var $elEmail = $('.email');
    var $elBody = $('.body');
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${$elEmail.val()}&su=${$elSubject.val()}&b
    ody=${$elBody.val()}`);
    $elSubject.val('');
    $elEmail.val('');
    $elBody.val('');
}





