"use strict";
$(document).ready(function() {
    var breakpoints = { sm: 540, md: 720, lg: 960, xl: 1140 };
    var $preloader = $('.preloader');
    if ($preloader.length) { $preloader.delay(1500).slideUp(); }
    var $navbarCollapse = $('.navbar-main .collapse');
    $navbarCollapse.on('hide.bs.collapse', function() { var $this = $(this);
        $this.addClass('collapsing-out');
        $('html, body').css('overflow', 'initial'); });
    $navbarCollapse.on('hidden.bs.collapse', function() { var $this = $(this);
        $this.removeClass('collapsing-out'); });
    $navbarCollapse.on('shown.bs.collapse', function() { $('html, body').css('overflow', 'hidden'); });
    $('.navbar-main .dropdown').on('hide.bs.dropdown', function() { var $this = $(this).find('.dropdown-menu');
        $this.addClass('close');
        setTimeout(function() { $this.removeClass('close'); }, 200); });
    $('.dropdown-submenu > .dropdown-toggle').click(function(e) { e.preventDefault();
        $(this).parent('.dropdown-submenu').toggleClass('show'); });
    $('.dropdown').hover(function() { $(this).addClass('show');
        $(this).find('.dropdown-menu').addClass('show');
        $(this).find('.dropdown-toggle').attr('aria-expanded', 'true'); }, function() { $(this).removeClass('show');
        $(this).find('.dropdown-menu').removeClass('show');
        $(this).find('.dropdown-toggle').attr('aria-expanded', 'false'); });
    $('.dropdown').click(function() { if ($(this).hasClass('show')) { $(this).removeClass('show');
            $(this).find('.dropdown-menu').removeClass('show');
            $(this).find('.dropdown-toggle').attr('aria-expanded', 'false'); } else { $(this).addClass('show');
            $(this).find('.dropdown-menu').addClass('show');
            $(this).find('.dropdown-toggle').attr('aria-expanded', 'true'); } });
    if ($('.headroom')[0]) { var headroom = new Headroom(document.querySelector("#navbar-main"), { offset: 0, tolerance: { up: 1, down: 0 }, });
        headroom.init(); }
    $('[data-background]').each(function() { $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')'); });
    $('[data-background-color]').each(function() { $(this).css('background-color', $(this).attr('data-background-color')); });
    $('[data-color]').each(function() { $(this).css('color', $(this).attr('data-color')); });
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').each(function() {
        var popoverClass = '';
        if ($(this).data('color')) { popoverClass = 'popover-' + $(this).data('color'); }
        $(this).popover({ trigger: 'focus', template: '<div class="popover ' + popoverClass + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>' })
    });
    $('.form-control').on('focus blur', function(e) { $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0)); }).trigger('blur');
    var e = document.querySelector('[data-toggle="price"]');
    "undefined" != typeof CountUp && e && e.addEventListener("change", function(e) {! function(e) { var t = e.target,
                d = t.checked,
                a = t.dataset.target,
                o = document.querySelectorAll(a);
            [].forEach.call(o, function(e) { var t = e.dataset.annual,
                    a = e.dataset.monthly,
                    o = e.dataset.decimals ? e.dataset.decimals : null,
                    n = e.dataset.duration ? e.dataset.duration : 1,
                    r = e.dataset.options ? JSON.parse(e.dataset.options) : null,
                    l = d ? new CountUp(e, t, a, o, n, r) : new CountUp(e, a, t, o, n, r);
                l.error ? console.error(l.error) : l.start() }) }(e) })
    if ($(".input-slider-container")[0]) { $('.input-slider-container').each(function() { var slider = $(this).find('.input-slider'); var sliderId = slider.attr('id'); var minValue = slider.data('range-value-min'); var maxValue = slider.data('range-value-max'); var sliderValue = $(this).find('.range-slider-value'); var sliderValueId = sliderValue.attr('id'); var startValue = sliderValue.data('range-value-low'); var c = document.getElementById(sliderId),
                d = document.getElementById(sliderValueId);
            noUiSlider.create(c, { start: [parseInt(startValue)], connect: [true, false], range: { 'min': [parseInt(minValue)], 'max': [parseInt(maxValue)] } });
            c.noUiSlider.on('update', function(a, b) { d.textContent = a[b]; }); }) }
    $(".progress-bar").each(function() { $(this).waypoint(function() { var progressBar = $(".progress-bar");
            progressBar.each(function(indx) { $(this).css("width", $(this).attr("aria-valuenow") + "%"); });
            $('.progress-bar').css({ animation: "animate-positive 3s", opacity: "1" }); }, { triggerOnce: true, offset: '60%' }); });
    $('.testimonial-carousel').owlCarousel({ loop: true, margin: 8, nav: false, dots: true, responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } }, });
    $('[data-toggle="on-screen"]')[0] && $('[data-toggle="on-screen"]').onScreen({ container: window, direction: 'vertical', doIn: function() {}, doOut: function() {}, tolerance: 200, throttle: 50, toggleClass: 'on-screen', debug: false });
    $('[data-toggle="scroll"]').on('click', function(event) { var hash = $(this).attr('href'); var offset = $(this).data('offset') ? $(this).data('offset') : 0;
        $('html, body').stop(true, true).animate({ scrollTop: $(hash).offset().top - offset }, 600);
        event.preventDefault(); });
    $(document).on('click', '.card-rotate .btn-rotate', function() { var $rotating_card_container = $(this).closest('.rotating-card-container'); if ($rotating_card_container.hasClass('hover')) { $rotating_card_container.removeClass('hover'); } else { $rotating_card_container.addClass('hover'); } });
    $('#clock').countdown('2020/10/10').on('update.countdown', function(event) {
        var $this = $(this).html(event.strftime('' +
            '<span>%-w</span> week%!w ' +
            '<span>%-d</span> day%!d ' +
            '<span>%H</span> hr ' +
            '<span>%M</span> min ' +
            '<span>%S</span> sec'));
    });
    $('.jarallax').jarallax({ speed: 0.2 });
    var scroll = new SmoothScroll('a[href*="#"]', { speed: 500, speedAsDuration: true });
    if ($(document).width() >= breakpoints.lg) {
        var equalize = { uniqueIds: [], elements: [] };
        $('[data-equalize-height]').each(function() {
            var id = $(this).attr('data-equalize-height');
            if (!equalize.uniqueIds.includes(id)) {
                equalize.uniqueIds.push(id)
                equalize.elements.push({ id: id, elements: [] });
            }
        });
        $('[data-equalize-height]').each(function() { var $el = $(this); var id = $el.attr('data-equalize-height');
            equalize.elements.map(function(elements) { if (elements.id === id) { elements.elements.push($el); } }); });
        equalize.elements.map(function(elements) { var elements = elements.elements; if (elements.length) { var maxHeight = 0;
                elements.map(function($element) { maxHeight = maxHeight < $element.outerHeight() ? $element.outerHeight() : maxHeight; });
                elements.map(function($element) { $element.height(maxHeight); }) } });
    }
    $('[data-bind-characters-target]').each(function() { var $text = $($(this).attr('data-bind-characters-target')); var maxCharacters = parseInt($(this).attr('maxlength'));
        $text.text(maxCharacters);
        $(this).on('keyup change', function(e) { var string = $(this).val(); var characters = string.length; var charactersRemaining = maxCharacters - characters;
            $text.text(charactersRemaining); }) });
    $('.copy-docs').on('click', function() { var $copy = $(this); var htmlEntities = $copy.parents('.nav-wrapper').siblings('.card').find('.tab-pane:last-of-type').html(); var htmlDecoded = $('<div/>').html(htmlEntities).text().trim(); var $temp = $('<textarea>');
        $('body').append($temp);
        console.log(htmlDecoded);
        $temp.val(htmlDecoded).select();
        document.execCommand('copy');
        $temp.remove();
        $copy.text('Copied!');
        $copy.addClass('copied');
        setTimeout(function() { $copy.text('Copy');
            $copy.removeClass('copied'); }, 1000); });
    $('.current-year').text(new Date().getFullYear());
});