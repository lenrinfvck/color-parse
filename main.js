let $ = function(selector) {
    return document.querySelector(selector);
}

let Color = window.ColorParse;
let $input = $('#inputColor');
$('#updateBtn').addEventListener('click', function() {
    new Color($input.value);
});
