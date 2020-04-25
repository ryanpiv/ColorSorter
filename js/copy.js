const fallbackCopyTextToClipboard = (text) => {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    showCopiedValue(text);
  }
  navigator.clipboard.writeText(text).then(function() {
    showCopiedValue(text);
  }, function(err) {
    alert('Async: Could not copy text: ', err);
  });
}

const showCopiedValue = (color) => {
  $copy = $('.c-copy');

  $copy.setAttribute('style', 'background-color: ' + color);
  $('.c-copy__value').innerHTML = color;
  $copy.classList.remove('u-width-0');
  $copy.classList.remove('u-height-0');
  $copy.classList.add('u-width-100');
  $copy.classList.add('u-height-100');
  $copy.classList.add('is-shown');


  setTimeout(() => {
    $copy.classList.remove('is-shown');
    setTimeout(() => {
      $copy.classList.add('u-width-0');
      $copy.classList.add('u-height-0');
      $copy.classList.remove('u-width-100');
      $copy.classList.remove('u-height-100');
    }, 300);
  }, 1000);
}
