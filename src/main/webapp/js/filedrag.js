/*
filedrag.js - HTML5 File Drag & Drop demonstration
Featured on SitePoint.com
Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
 */
(function() {

	// getElementById
	function $id(id) {
		return document.getElementById(id);
	}

	// output information
	function Output(msg) {
		var m = $id("messages");
		m.innerHTML = msg + m.innerHTML;
	}

	// file drag hover
	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}

	// file selection
	function FileSelectHandler(e) {

		// cancel event and hover styling
		FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		// process all File objects
		for ( var i = 0, f; f = files[i]; i++) {
			ParseFile(f);
			UploadFile(f);
		}

	}

	// output file information
	function ParseFile(file) {

		// display an image
		if (file.type.indexOf("image") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) {
				Output("<p><strong>" + file.name + "</strong>"
						+ "</strong> (type: <strong>" + file.type
						+ "</strong> size: <strong>" + file.size
						+ "</strong> bytes)</p>"
						+ '<p><img src="' + e.target.result
						+ '" class="preview"/></p>');
			}
			reader.readAsDataURL(file);
		}

		// display text
		else if (file.type.indexOf("text") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) {
				Output("<p><strong>"+ file.name	+ "</strong>" +
						+ "</strong> (type: <strong>" + file.type
						+ "</strong> size: <strong>" + file.size
						+ "</strong> bytes)</p><pre>"
						+ e.target.result.replace(/</g, "&lt;").replace(/>/g,
								"&gt;") + "</pre>");
			}
			reader.readAsText(file);
		} else {
			Output("<p><strong>" + file.name
					+ "</strong> (type: <strong>" + file.type
					+ "</strong> size: <strong>" + file.size
					+ "</strong> bytes)</p>");

		}
	}

	// upload JPEG files
	function UploadFile(file) {

		// following line is not necessary: prevents running on SitePoint
		// servers
		if (location.host.indexOf("sitepointstatic") >= 0)
			return

		var xhr = new XMLHttpRequest();
		// if (xhr.upload && file.type == "image/jpeg" && file.size <=
		// $id("MAX_FILE_SIZE").value) {
		if (xhr.upload) { // && file.size <= 30000) {

			// create progress bar
			var o = $id("progress");
			var progress = o.appendChild(document.createElement("p"));
			var responseNode = document.createTextNode("[" + file.name + "] ");

			progress.appendChild(responseNode);

			// progress bar
			xhr.upload.addEventListener("progress", function(e) {
				var pc = parseInt(100 - (e.loaded / e.total * 100));
				progress.style.backgroundPosition = pc + "% 0";
			}, false);

			// file received/failed
			xhr.onreadystatechange = function(e) {
				if (xhr.readyState == 4) {
					progress.className = (xhr.status == 200 ? "success"
							: "failure")

					if (xhr.status == 200) {

						var response = xhr.responseText.split('$$$');

						progress.appendChild(document
								.createTextNode(response[0]));

						var link = document.createElement('a');
						link.setAttribute('href', response[1]);
						link.appendChild(document.createTextNode(response[1]));
						progress.appendChild(link);

					} else {
						progress.appendChild(document
								.createTextNode(xhr.responseText));
					}

				}
			};

			// start upload
			xhr.open("POST", $id("upload").action, true);

			var formData = new FormData();
			formData.append('file', file);
			xhr.send(formData);
		}

	}

	// initialize
	function Init() {

		var fileselect = $id("fileselect"), filedrag = $id("filedrag"), submitbutton = $id("submitbutton");

		// file select
		fileselect.addEventListener("change", FileSelectHandler, false);

		// is XHR2 available?
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {

			// file drop
			filedrag.addEventListener("dragover", FileDragHover, false);
			filedrag.addEventListener("dragleave", FileDragHover, false);
			filedrag.addEventListener("drop", FileSelectHandler, false);
			filedrag.style.display = "block";

			// remove submit button
			submitbutton.style.display = "none";
		}

	}

	// call initialization file
	if (window.File && window.FileList && window.FileReader) {
		Init();
	}

})();