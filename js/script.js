// declaraction of document.ready() function.
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () {
        for (var i = 0; i < fn.length; i++) fn[i]();
    };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
                try {
                    d.documentElement.doScroll('left');
                    run();
                } catch (err) {
                    setTimeout(arguments.callee, 0);
                }
            })();
        else if (wk)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
    };
})();


document.ready(
    // toggleTheme function.
    // this script shouldn't be changed.
    () => {
        const pagebody = document.getElementsByTagName('body')[0]
        const pagehtml = document.documentElement

        const default_theme = 'dark' // 'light'

        function setTheme(status = 'dark') {
            const dark = status === 'dark';
            window.sessionStorage.setItem('theme', dark ? 'dark' : 'light')
            // keep <html> and <body> in sync: <html> drives the canvas
            // background (see head.ejs), <body> drives the theme styles.
            pagehtml.classList.toggle('dark-theme', dark);
            pagebody.classList.toggle('dark-theme', dark);
            const switchDefault = document.getElementById("switch_default")
            if (switchDefault) switchDefault.checked = dark
            const mobileToggle = document.getElementById("mobile-toggle-theme")
            if (mobileToggle) mobileToggle.innerText = dark ? "· Dark" : "· Light"
        };

        const getSavedTheme = () => {
            try { return window.sessionStorage.getItem('theme') || default_theme; } catch (e) { return default_theme; }
        };
        setTheme(getSavedTheme())

        const toggleBtn = document.getElementsByClassName('toggleBtn')[0]
        if (toggleBtn) toggleBtn.addEventListener('click', () => {
            const newTheme = getSavedTheme() === 'dark' ? 'light' : 'dark'
            setTheme(newTheme)
        })
        const mobileToggleBtn = document.getElementById('mobile-toggle-theme')
        if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', () => {
            const newTheme = getSavedTheme() === 'dark' ? 'light' : 'dark'
            setTheme(newTheme)
        })
    }
);
