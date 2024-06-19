$(document).ready(function(){
    // Ocultar inicialmente la barra de búsqueda
    $('.search-bar-container').hide();

    $('.nav-icons img[alt="Search"]').click(function(e){
        e.stopPropagation();
        $('.search-bar-container').slideToggle();
    });

    $(document).click(function(e) {
        var searchBar = $(".search-bar-container");
        if (!searchBar.is(e.target) && searchBar.has(e.target).length === 0) {
            searchBar.slideUp();
        }
    });

    $('.search-bar-container').click(function(e){
        e.stopPropagation();
    });

    $('.menu-toggle').click(function(){
        $('.menu-container').animate({ right: '0px' });
        $('.overlay').fadeIn();
    });

    $('.close-menu, .overlay').click(function(){
        $('.menu-container').animate({ right: '-100%' });
        $('.overlay').fadeOut();
    });

    // Manejo de múltiples carruseles
    $('.items-section').each(function() {
        var $section = $(this);
        var currentIndex = 0;
        var itemWidth;
        var itemsCount = $section.find('.card-holder').length; // Número total de elementos
        var containerWidth;
        var visibleItems;

        // Función para calcular el ancho de los elementos y el contenedor
        function calculateDimensions() {
            itemWidth = $section.find('.card-holder').outerWidth(true); // Ancho de cada elemento + márgenes
            containerWidth = itemWidth * itemsCount;
            $section.find('.carousel-container').width(containerWidth);
            visibleItems = Math.floor($section.find('.carousel-container').parent().width() / itemWidth);
        }

        // Función para actualizar el carrusel
        function updateCarousel() {
            calculateDimensions(); // Asegúrate de que las dimensiones se recalculen cada vez
            var maxIndex = itemsCount - visibleItems; // Máximo índice permitido para desplazarse
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex; // Ajusta el índice actual si supera el máximo
            }
            var newTransform = -(itemWidth * currentIndex);
            $section.find('.carousel-container').css('transform', 'translateX(' + newTransform + 'px)');

            if (currentIndex <= 0) {
                $section.find('.carrusel-controls .previous').prop('disabled', true);
            } else {
                $section.find('.carrusel-controls .previous').prop('disabled', false);
            }
            
            if (currentIndex >= maxIndex) {
                $section.find('.carrusel-controls .next').prop('disabled', true);
            } else {
                $section.find('.carrusel-controls .next').prop('disabled', false);
            }
        }

        // Inicializar el carrusel al cargar la página
        updateCarousel();

        // Eventos de clic para los botones del carrusel
        $section.find('.carrusel-controls .next').click(function() {
            var maxIndex = itemsCount - visibleItems; // Recalcula el máximo índice permitido
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        $section.find('.carrusel-controls .previous').click(function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Ajusta el carrusel al cambiar el tamaño de la ventana
        $(window).resize(function() {
            updateCarousel();
        });

        // Manejo del botón "VER TODO"
        $section.find('.view-all').click(function() {
            var carouselContainer = $(this).closest('.items-section').find('.carousel-container');
            var itemsSection = $(this).closest('.items-section');
            var carruselControls = $(this).closest('.items-section').find('.carrusel-controls');

            carouselContainer.toggleClass('grid-view');

            if (carouselContainer.hasClass('grid-view')) {
                itemsSection.animate({ height: 1370 }, 500); // +200 para considerar otros márgenes y paddings
                carruselControls.hide();
                $(this).text('VER MENOS');
            } else {
                itemsSection.animate({ height: '850px' }, 500); // La altura original del contenedor
                carruselControls.show();
                updateCarousel();
            }
        });

        // Agregar soporte táctil
        $section.find('.carousel-container').swipe({
            swipeLeft: function(event, direction, distance, duration, fingerCount) {
                var maxIndex = itemsCount - visibleItems; // Recalcula el máximo índice permitido
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateCarousel();
                }
            },
            swipeRight: function(event, direction, distance, duration, fingerCount) {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            },
            excludedElements: $.fn.swipe.defaults.excludedElements + ", button, input, select, textarea, .noSwipe"
        });
    });
});
