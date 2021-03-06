fetchAllCode = function(){
	Array.prototype.slice.call(document.querySelectorAll('code[data-source]')).forEach(function(codeContainer){
		console.log(codeContainer.dataset.source);
		var xhr = new XMLHttpRequest();
		xhr.open("GET", codeContainer.dataset.source, true);
		xhr.overrideMimeType("text/plain; charset=UTF-8");
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var code = document.createTextNode(xhr.responseText);
					codeContainer.appendChild(code);
					if(typeof(hljs) !== 'undefined') {
						hljs.highlightBlock(codeContainer);
					}
				}
				else
				{
					console.error(xhr.status)
					console.error("Error while trying to get remote code");
				}
			}
		};
		try {
			xhr.send(null);
		} catch (e) {
			console.error("XHR failed for " + url + ", " + e);
		}
	});
}
