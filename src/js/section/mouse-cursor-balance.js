import $ from 'jquery';

$(document).ready(function() {
  const $container = $('.private-mouse-container');
  const lines = [];
  
  const spacing = 100;
  const rows = Math.ceil($(window).height() / spacing);
  const cols = Math.ceil($(window).width() / spacing);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const $line = $('<div class="private-mouse-line"></div>');
      $line.css({
        top: `${i * spacing}px`,
        left: `${j * spacing}px`
      });
      $container.append($line);
      lines.push($line[0]);
    }
  }

  function updateLines(x, y) {
    $.each(lines, function(index, line) {
      const rect = line.getBoundingClientRect();
      const lineCenterX = rect.left + rect.width / 2;
      const lineCenterY = rect.top + rect.height / 2;

      const dx = x - lineCenterX;
      const dy = y - lineCenterY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      $(line).css('transform', `rotate(${angle}deg)`);

      const distance = Math.sqrt(dx * dx + dy * dy);
      let newColor = 'red';

      if (distance < 250) {
        if (distance < 40) newColor = '#FF8C00';
        else if (distance < 80) newColor = '#FFD700';
        else if (distance < 120) newColor = '#228B22';
        else if (distance < 160) newColor = '#4169E1';
        else if (distance < 200) newColor = '#0000CD';
        else newColor = '#800080';
      }

      $(line).css('background-color', newColor);
    });
  }

  $(window).on('mousemove', function(e) {
    updateLines(e.clientX, e.clientY);
  });

  $(window).on('touchmove', function(e) {
    if (e.originalEvent.touches.length > 0) {
      const touch = e.originalEvent.touches[0];
      updateLines(touch.clientX, touch.clientY);
    }
  }, { passive: true });
});