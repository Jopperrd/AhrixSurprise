$(document).ready(async function () {
    var box = document.getElementById('dvd'),
        colors = ['#ff0000', '#ff4000', '#ff8000', '#ffbf00', '#ffff00', '#bfff00', '#80ff00', '#40ff00', '#00ff00', '#00ff40', '#00ff80', '#00ffbf', '#00ffff', '#00bfff', '#0080ff', '#0040ff', '#0000ff', '#4000ff', '#8000ff', '#bf00ff', '#ff00ff', '#ff00bf', '#ff0080', '#ff0040', '#ff0000'],
        currentColor = Math.floor((Math.random() * 25) + 1),
        win = window,
        ww = win.innerWidth,
        wh = win.innerHeight,
        boxTop = box.offsetTop,
        boxLeft = box.offsetLeft + 10,
        boxWidth = box.offsetWidth,
        boxHeight = box.offsetHeight,
        translateX = ww / 2 - boxWidth / 2,
        translateY = wh / 2 - boxHeight / 2,
        xMin = -boxLeft,
        yMin = -boxTop,
        xMax = ww - boxLeft - boxWidth,
        yMax = wh - boxTop - boxHeight,
        request = null,
        direction = 'se',
        speed = 1,
        timeout = null;
        upperColor = currentColor > 13;

    setStyle(box, {
        transform: 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0)',
    });
    //await new Promise(r => setTimeout(r, 3000));
    switchColor();
    init();

    window.addEventListener('resize', function (argument) {
        clearTimeout(timeout);
        timeout = setTimeout(update, 100);
    }, false);

    async function init() {
        request = requestAnimationFrame(init);
        move();
    }

    function update() {
        xMin = -boxLeft;
        yMin = -boxTop;
        xMax = win.innerWidth - boxLeft - boxWidth;
        yMax = win.innerHeight - boxTop - boxHeight;
    }

    function move() {
        setDirection();
        setStyle(box, {
            transform: 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0)',
        });
    }

    function setDirection() {
        switch (direction) {
            case 'ne':
                translateX += speed;
                translateY -= speed;
                break;
            case 'nw':
                translateX -= speed;
                translateY -= speed;
                break;
            case 'se':
                translateX += speed;
                translateY += speed;
                break;
            case 'sw':
                translateX -= speed;
                translateY += speed;
                break;
        }
        setLimits();
    }

    function setLimits() {
        if (translateY <= yMin) {
            if (direction == 'nw') {
                direction = 'sw';
            } else if (direction == 'ne') {
                direction = 'se';
            }
            switchColor();
        }
        if (translateY >= yMax) {
            if (direction == 'se') {
                direction = 'ne';
            } else if (direction == 'sw') {
                direction = 'nw';
            }
            switchColor();
        }
        if (translateX <= xMin) {
            if (direction == 'nw') {
                direction = 'ne';
            } else if (direction == 'sw') {
                direction = 'se';
            }
            switchColor();
        }
        if (translateX >= xMax) {
            if (direction == 'ne') {
                direction = 'nw';
            } else if (direction == 'se') {
                direction = 'sw';
            }
            switchColor();
        }
    }

    function switchColor() {
        var color = 0;

        if (upperColor) {
            color = Math.floor((Math.random() * 13) + 1);
        } else {
            color = Math.floor((Math.random() * 13) + 13);
        }

        setStyle(box, {
            color: colors[color]
        });

        currentColor = color;
    }

    function getVendor() {
        var ua = navigator.userAgent.toLowerCase(),
            match = /opera/.exec(ua) || /msie/.exec(ua) || /firefox/.exec(ua) || /(chrome|safari)/.exec(ua) || /trident/.exec(ua),
            vendors = {
                opera: '-o-',
                chrome: '-webkit-',
                safari: '-webkit-',
                firefox: '-moz-',
                trident: '-ms-',
                msie: '-ms-',
            };

        return vendors[match[0]];
    };

    function setStyle(element, properties) {
        var prefix = getVendor(),
            property, css = '';
        for (property in properties) {
            css += property + ': ' + properties[property] + ';';
            css += prefix + property + ': ' + properties[property] + ';';
        }
        element.style.cssText += css;
    }
});