(function( wp, $ ) {
	var api = wp.customize;

	// Prevent not-allowed cursor on edit-post-links.
	api.isLinkPreviewable = ( function( originalIsLinkPreviewable ) {
		return function( element, options ) {
			if ( $( element ).closest( 'a' ).hasClass( 'post-edit-link' ) ) {
				return true;
			}
			return originalIsLinkPreviewable.call( this, element, options );
		};
	} )( api.isLinkPreviewable );

	// Send message to pane to request editing a post.
	api.Preview.prototype.handleLinkClick = ( function( originalHandleLinkClick ) {
		return function( event ) {
			if ( $( event.target ).closest( 'a' ).hasClass( 'post-edit-link' ) ) {
				event.preventDefault();
				api.preview.send( 'edit-post', event.target.href );
				$( event.target ).css( 'cursor', 'progress' );
			} else {
				originalHandleLinkClick.call( this, event );
			}
		};
	} )( api.Preview.prototype.handleLinkClick );

})( this.wp, this.jQuery );
