(function( wp, $ ) {
	var api = wp.customize;

	/**
	 * Redirect to the post edit screen.
	 *
	 * @link https://github.com/xwp/wp-customize-snapshots/issues/101
	 * @param {string} url Edit post link.
	 */
	api.postEditRedirect = function postEditRedirect( url ) {
		var urlParser = document.createElement( 'a' ), onceProcessingComplete;
		urlParser.href = url;

		if ( urlParser.search ) {
			urlParser.search += '&';
		}
		urlParser.search += 'customizer_return=' + encodeURIComponent( window.location.href );

		onceProcessingComplete = function() {
			var request;
			if ( api.state( 'processing' ).get() > 0 ) {
				return;
			}

			api.state( 'processing' ).unbind( onceProcessingComplete );

			request = api.requestChangesetUpdate();
			request.done( function() {
				unbindAYS();
				window.location.href = urlParser.href;
			} );
		};

		if ( 0 === api.state( 'processing' ).get() ) {
			onceProcessingComplete();
		} else {
			api.state( 'processing' ).bind( onceProcessingComplete );
		}
	};

	function unbindAYS() {
		$( window ).off( 'beforeunload.customize-confirm' );
	}

	api.bind( 'ready', () => api.previewer.bind( 'edit-post', api.postEditRedirect ) );

})( this.wp, this.jQuery );