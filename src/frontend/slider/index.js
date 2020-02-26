/**
 * WordPress dependencies
 */
const { omit } = lodash;

const domReady = wp.domReady;

domReady( () => {
	const sliders = document.querySelectorAll( '.wp-block-themeisle-blocks-slider' );

	sliders.forEach( slider => {
		const track = slider.querySelector( '.glide__slides' );
		const options = omit({ ...slider.dataset }, [ 'autoplay', 'height' ]);
		const autoplay = 'false' === slider.dataset.autoplay ? false : ( 'true' === slider.dataset.autoplay ? 2000 : slider.dataset.autoplay );

		Object.keys( options ).map( option => options[option] = Number( options[option]) );

		new Glide( `#${ slider.id }`, {
			type: 'carousel',
			keyboard: true,
			autoplay,
			hoverpause: true,
			...options,
			breakpoints: {
				800: {
					perView: 1,
					peek: 0,
					gap: 0
				}
			}
		}).mount();

		if ( track ) {
			track.style.height = slider.dataset.height;
		}
	});
});
