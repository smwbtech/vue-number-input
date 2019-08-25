/**
 * Author: Jamie Munro
 * Origin: https://www.endyourif.com/set-cursor-position-of-textarea-with-javascript/
 * [setSelectionRange description]
 * @param {[type]} input          [description]
 * @param {[type]} selectionStart [description]
 * @param {[type]} selectionEnd   [description]
 */
function setSelectionRange(input, selectionStart, selectionEnd) {
	if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	} else if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveEnd('character', selectionEnd);
		range.moveStart('character', selectionStart);
		range.select();
	}
}

export function setCaretToPos(input, pos) {
	setSelectionRange(input, pos, pos);
}
