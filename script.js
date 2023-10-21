var isLocked = false;

function toggleLock() {
    isLocked = !isLocked;
    var lockUnlockButton = document.getElementById('lockUnlock');
    lockUnlockButton.innerText = isLocked ? 'Unlock' : 'Lock';
    lockUnlockButton.classList.toggle('locked', isLocked);
    var textAreas = document.querySelectorAll('textarea');
    textAreas.forEach(function (textarea) {
        textarea.disabled = isLocked;
    });
}

function handleTabKey(event, index) {
    if (event.keyCode === 9) { // Tab key
        event.preventDefault();
        var textarea = document.getElementsByTagName('textarea')[index];
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var value = textarea.value;
        textarea.value = value.substring(0, start) + '\t' + value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        update(0);
    }
}

function copyToClipboard() {
    var text = document.getElementById('viewer').contentDocument.documentElement.outerHTML;
    var copyBuffer = document.getElementById('copyBuffer');
    copyBuffer.value = text;
    copyBuffer.select();
    document.execCommand('copy');
    alert("HTML code copied to clipboard");
}

function createDownloadableFile() {
    const htmlCode = document.getElementById("htmlCode").value;
    const cssCode = document.getElementById("cssCode").value;
    const javascriptCode = document.getElementById("javascriptCode").value;

    const combinedCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${javascriptCode}</script>
        </body>
        </html>
    `;

    const blob = new Blob([combinedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'code.html';

    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);

    alert("Downloadable file created!");
}

function update(i) {
    if (i == 0) {
        let htmlCode = document.getElementById("htmlCode").value;
        let cssCode = document.getElementById("cssCode").value;
        let javascriptCode = document.getElementById("javascriptCode").value;
        let text = htmlCode + "<style>" + cssCode + "</style>" + "<scri" + "pt>" + javascriptCode + "</scri" + "pt>";
        let iframe = document.getElementById('viewer').contentWindow.document;
        iframe.open();
        iframe.write(text);
        iframe.close();
    }
}
