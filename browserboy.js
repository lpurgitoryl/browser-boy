document.querySelector('.power-button').addEventListener('click', function(event) {
    event.preventDefault();
    var target = document.querySelector('.gameboy');
    if (target.classList.contains('power-on')) {
      target.classList.remove('power-on');
    } else {
      target.classList.add('power-on');
    }
  });

