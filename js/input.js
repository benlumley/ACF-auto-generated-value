(function($){


	function initialize_field( $el ) {
		var $input = $el.find('.auto-generated-value-input');

		if($input.data('hide') === 'yes' && ($el.is('tr') || $el.is('div'))){
			$el.hide();
		}


		// Check if value is set
		if( ! $input.val() ){
			// If not, get all existing values to make sure the new one is unique
			var $repeater = $el.parents('[data-type=repeater]');

			var values = [];
			$repeater.find('.auto-generated-value-input').each(function(){
				if($(this).val()){
					values.push($(this).val());
				}
			});
			// Hash
			var hash = 'xxxxxxxxxx'.replace(/x/g,function(c){var chars="abcdefghijklmnopqrtsuvwxyz0123456789".split(''); return chars[Math.floor(chars.length * Math.random())]});
			var value = $input.data('prefix') + hash;
			// Generate new values until we get one that doesn't exist
			console.log(values);
			$input.val(value);
		}

		// Handle edit button
		$el.find('.auto-generated-value-input-wrapper .edit-link').click(function(){
			if(confirm('Warning: Editing this field might affect existing entries for this form and could cause lost data.')){
				$input.removeAttr('readonly');
				$(this).hide();
				$input.focus().select();
			}

		});
	}


	if( typeof acf.add_action !== 'undefined' ) {

		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/

		acf.add_action('ready append', function( $el ){

			// search $el for fields of type 'auto_generated_value'
			acf.get_fields({ type : 'auto_generated_value'}, $el).each(function(){

				initialize_field( $(this) );

			});

		});


	} else {


		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM.
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/

		$(document).live('acf/setup_fields', function(e, postbox){

			$(postbox).find('.field[data-field_type="auto_generated_value"]').each(function(){

				initialize_field( $(this) );

			});

		});


	}


})(jQuery);
