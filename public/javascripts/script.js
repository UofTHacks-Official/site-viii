window.onload = function() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const charWidth = 20;
    const charHeight = 16;
    const cols = Math.floor(w / charWidth) + 1;
    const rows = Math.floor(h / charHeight) + 1;

    var chars = Array(cols);
    for (var i = 0; i < cols; i++) {
        chars[i] = new Array(rows);
        for (var j = 0; j < rows; j++) {
            chars[i][j] = [127, 255];
        }
    }
    var rain = Array(Math.floor(cols / 10));
    for (var i = 0; i < rain.length; i++) {
        rain[i] = [Math.round(Math.random() * cols), Math.round(-1 * Math.random() * rows)];
    }

    ctx.font = '16px monospace';

    function drawGrid() {
        ctx.clearRect(0, 0, w, h);

        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                var rainy = false;
                for (var k = 0; k < rain.length; k++) {
                    if (rain[k][0] == i && rain[k][1] == j) {
                        rainy = true;
                        break;
                    }
                }

                if (rainy) {
                    chars[i][j][0] = Math.round(Math.random() * 95 + 32);
                    chars[i][j][1] = 255;
                    ctx.fillStyle = '#ffffffff';
                } else {
                    ctx.fillStyle = '#1ee113' + chars[i][j][1].toString(16);
                }
                ctx.fillText(String.fromCharCode(chars[i][j][0]), i * charWidth, j * charHeight);

                chars[i][j][1] = Math.max(chars[i][j][1] - 10, 0);
                if (chars[i][j][1] < 20) {
                    chars[i][j][0] = 127;
                }
            }
        }

        for (var i = 0; i < rain.length; i++) {
            rain[i][1] += 1;
            if (rain[i][1] > rows) {
                rain[i] = [Math.round(Math.random() * cols), 0];
            }
        }
    }

    setInterval(drawGrid, 100);

    if (window.location.hash) {
        console.log(window.location.hash);
        var hash = window.location.hash.substring(1);
        if (hash == 'success') {
            document.getElementById('successIndicator').innerHTML = 'Success!';
        } else if (hash == 'error') {
            document.getElementById('successIndicator').innerHTML = 'An error occurred; please try again later.';
        }
    }
}
