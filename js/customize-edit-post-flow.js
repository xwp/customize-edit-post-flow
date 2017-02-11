(function( wp, $ ) {
	var api = wp.customize;

	function init() {
		removeUnpreviewable();
		followEditLinks();
	}

	function followEditLinks() {
		$( 'body' ).on( 'click', '.post-edit-link', function( event ) {
			api.preview.send( 'edit-post', event.target.href );
			$( this ).css( 'cursor', 'progress' );
		} );
	}

	function removeUnpreviewable() {
		$( '.post-edit-link.customize-unpreviewable' ).removeClass( 'customize-unpreviewable' );
	}

	api.bind( 'preview-ready', function(){
		setTimeout( init, 100);
	} );
})( this.wp, this.jQuery );
