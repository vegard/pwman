/*
    JavaScript Password Manager — Copyright (C) 2011 Vegard Nossum

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

window.onload = function () {
	/* Only show the contents of hidden fields when they are active (i.e.
	 * being edited). This is done to prevent peeking, etc. We could make
	 * the input fields be password fields, but in this case it is really
	 * important for the user to know what he/she is typing, since they
	 * REALLY want to enter the same values next time. */
	$('form .hidden')
		.fadeTo(0, 0)
		.focusin(function (e) {
			$(this).fadeTo('fast', 1);
		})
		.focusout(function (e) {
			$(this).fadeTo('fast', 0);
		});

	$('#account .text :input')
		/* Make sure that whenever an input field is changed, the current
		 * password is discarded (to prevent the user from using the wrong
		 * password). */
		.change(function (e) {
			$('#password').hide('fast');
			$('#password span').text('');
		})

		/* Turn the textfield red if there were any spaces at the
		 * beginning or end of the input, or if there were two or
		 * more spaces in a row. */
		.keyup(function (e) {
			var val = $(this).val();
			if (val === $.trim(val) && val.indexOf('  ') === -1) {
				$(this).removeClass('error');
			} else {
				$(this).addClass('error');
			}

			return true;
		});

	$('#account :submit').click(function () {
		var key = [
			$.trim($('#passphrase').val()),
			$.trim($('#tag').val())
		];

		var hash = $.sha256bin(key.join('-'));
		var password = $.base64Encode(hash);

		$('#password span').text(password.substr(0, 16));
		$('#password').show('fast');

		/* Prevent the form data from being submitted */
		return false;
	});

	$('#help').click(function() {
		$('#help-text').toggle('fast');
		return false;
	});


	$('#password').hide();
	$('#help-text').hide();

	$('#passphrase').focus();
}
