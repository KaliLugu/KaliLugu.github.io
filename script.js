(function () {
  'use strict';

  /* Portfolio : filtre par catégorie */
  var buttons = document.querySelectorAll('.filters button');
  var cards = document.querySelectorAll('#grid .proj');

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      buttons.forEach(function (x) {
        x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
      });
      cards.forEach(function (c) {
        c.hidden = !(f === 'all' || c.getAttribute('data-cat') === f);
      });
    });
  });

  /* Contact : prépare le message (aucun envoi dans cette beta) */
  var form = document.getElementById('form');
  var result = document.getElementById('result');
  var out = document.getElementById('out');
  var copy = document.getElementById('copy');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('f-name').value.trim() || '(nom)';
    var mail = document.getElementById('f-mail').value.trim() || '(email)';
    var type = document.getElementById('f-type').value;
    var msg = document.getElementById('f-msg').value.trim() || '(message)';
    out.textContent = 'Demande : ' + type + '\nDe : ' + name + ' <' + mail + '>\n\n' + msg;
    result.classList.add('on');
  });

  function selectOutput() {
    var r = document.createRange();
    r.selectNodeContents(out);
    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(r);
  }

  copy.addEventListener('click', function () {
    var done = function () {
      copy.textContent = 'Copié';
      setTimeout(function () { copy.textContent = 'Copier le message'; }, 1600);
    };
    try {
      navigator.clipboard.writeText(out.textContent).then(done, selectOutput);
    } catch (err) {
      selectOutput();
    }
  });
})();
