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

    var currentIndex = 0;
    var itemWidth; // Se determinará dinámicamente
    var itemsCount = $('.card-holder').length; // Número total de elementos
    var containerWidth; // Se determinará dinámicamente
    var visibleItems; // Se determinará dinámicamente

    // Función para calcular el ancho de los elementos y el contenedor
    function calculateDimensions() {
        itemWidth = $('.card-holder').outerWidth(true) / 2; // Ancho de cada elemento + márgenes
        containerWidth = itemWidth * itemsCount;
        $('.carousel-container').width(containerWidth);
        visibleItems = Math.floor($('.carousel-container').width() / itemWidth);
    }

    // Función para actualizar el carrusel
    function updateCarousel() {
        calculateDimensions(); // Asegúrate de que las dimensiones se recalculen cada vez
        var newTransform = -(itemWidth * currentIndex);
        $('.carousel-container').css('transform', 'translateX(' + newTransform + 'px)');

		 if (currentIndex <= 0) {
            $('.carrusel-controls .previous').prop('disabled', true);
        } else {
            $('.carrusel-controls .previous').prop('disabled', false);
        }
        
        if (currentIndex >= itemsCount - visibleItems) {
            $('.carrusel-controls .next').prop('disabled', true);
        } else {
            $('.carrusel-controls .next').prop('disabled', false);
        }
    }

    // Eventos de clic para los botones del carrusel
    $('.carrusel-controls .next').click(function() {
        if (currentIndex < itemsCount - visibleItems) {
            currentIndex++;
            updateCarousel();
        }
    });

    $('.carrusel-controls .previous').click(function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Ajusta el carrusel al cambiar el tamaño de la ventana
    $(window).resize(function() {
        updateCarousel();
    });

    // Calcula las dimensiones iniciales cuando el documento esté listo
	 $('.view-all').click(function() {
        var carouselContainer = $(this).closest('.items-section').find('.carousel-container');
        var itemsSection = $(this).closest('.items-section');
		var carruselControls = $(this).closest('.items-section').find('.carrusel-controls');
        
        carouselContainer.toggleClass('grid-view');

        if (carouselContainer.hasClass('grid-view')) {
            itemsSection.animate({ height: 1370}, 500); // +200 para considerar otros márgenes y paddings
			carruselControls.hide();
            $(this).text('VER MENOS');
        } else {
            itemsSection.animate({ height: '850px' }, 500); // La altura original del contenedor
			carruselControls.show();
            $(this).text('VER TODO');
            updateCarousel();
        }
    });
});
