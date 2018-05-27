$(document).ready(function(e){

	$('#my-form-div').on('click','#btn-approve', function(e) { 
		e.preventDefault();

		var html = 
		`<div>
			<div class="elt">Input number</div>
			<div class="val">`+ $('#textInput1').val() +`</div>

			<div class="elt">Select with multiple elements</div>
			<div class="val">`+ $('#selectMultipleInput').val() +`</div>

			<div class="elt">Select with autocmplete feature</div>
			<div class="val">`+ $('#selectAutocompleteInput').val() +`</div>

			<div class="elt">Radio button element</div>
			<div class="val">`+ $('input[name="name-of-radio"]:checked').val() +`</div>

			<div class="elt">Checkbox element</div>
			<div class="val">`+ $('input[name="name-of-checkbox"]:checked').val() +`</div>

			<div class="elt">Textarea element</div>
			<div class="val">`+ $('#textareaInput').val() +`</div>
		</div>`;
		$('#res').html(html);
	})

		$(function() {


			$('#generateFormBtn').click(function(e){
				var result_div = $('#my-form-div');
				var jsonInput = $('#jsonInput'); 
				var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla"];
				// autocomplete(document.getElementById("myInput"), countries);


				var data = JSON.parse(jsonInput.val()); 


				if (data == undefined) {
					console.log('invalid json'); 
				}

				if (jsonInput == '') {
					alert('No Data')
					return false; 
				}

				/*Extract form information*/
				var frm_action = data.action; 
				var frm_method = data.method; 
				var frm_class = data.class;
				var frm_id = data.id;
				var frm_ids = data.ids;

				var frm_elt = '<form ';

				if (frm_action) {
					frm_elt += 'action="' + frm_action + '" '; 
				}

				if (frm_method) {
					frm_elt += 'method="' + frm_method + '" '; 
				}
				
				if (frm_class) {
					frm_elt += 'class="' + frm_class + '" '; 
				}	

				frm_elt += ' >';

				/*Extract the schema*/
				var frm_schema = data.schema; 
				var input_elts = '';
				$.each(data.schema, function(key,value) {
					switch(value.elt){
						case 'input': 
							input_elts += makeInput(value);
							break; 

						case 'select': 
							input_elts += makeSelect(value);
							break; 

						case 'radio': 
							input_elts += makeRadio(value);
							break; 

						case 'textarea': 
							input_elts += makeTextarea(value);
							break; 

						case 'checkbox': 
							input_elts += makeCheckbox(value);
							break; 
					}
				})

				frm_elt += input_elts + '</form>';
				result_div.html(frm_elt);

				$('.select-autocomplete').selectize({});

				/*
				Items to work on 
				1 text input, 
				2 textarea, 
				3 radio buttons, 
				4 checkboxes, 
				5 dropdown menus, 
				6 multiselect dropdown menus, 
				7 dropdown menus with autocomplete.
				*/


				// console.log(jsonInput.val()); 

			});

		});

		function wrapEltInDiv(elt, label) {
			return '<div class="form-group">' +
						'<label>'+label+'</label>' +
						elt + 
					'</div>';
		}

		function makeInput(dt) {
			var html = '<input ';
			html += generateAttributes(dt);

			if (dt.default) {
				html += ' value="' + dt.default + '" ';
			}

			html += " />";
			
			return wrapEltInDiv(html, dt.label);
		}

		function makeSelect(dt) {
			var html = '<select ';
			html += generateAttributes(dt);

			html += " >";

			if (dt.options) {
				$.each(dt.options, function(key,value) {
					html += '<option value="'+key+'">'+value+'</option>'
				})
			}

			html += "</select>";
			return wrapEltInDiv(html, dt.label);
		}

		function makeRadio(dt) {
			var html = '';
			var attr = generateAttributes(dt);

			var spacing = '<div class="'; 
			if (dt.spacing) {
				spacing += dt.spacing;
			}else{
				spacing += 'form-check'; 
			}
			spacing += '" >'

			if (dt.options) {
				$.each(dt.options, function(key,value) {
					html += spacing;
					html += '<label />'+value+'</label>';
					html += '<input '+attr+' type="radio" value="'+key+'"/>';
					html += '</div>';
				})
			}

			return wrapEltInDiv(html, dt.label);
		}

		function makeTextarea(dt) {
			var html = '<textarea ';
			html += generateAttributes(dt);

			if (dt.default) {
				html += '>' + dt.default;
			}

			html += "</textarea>";
			return wrapEltInDiv(html, dt.label);
		}

		function makeCheckbox(dt) {
			var html = '';
			var attr = generateAttributes(dt);

			if (dt.options) {
				$.each(dt.options, function(key,value) {
					html += '<label />'+value+'</label>';
					html += '<input '+attr+' type="checkbox" value="'+key+'"/>';
				})
			}

			return wrapEltInDiv(html, dt.label);
		}

		/**
		 * @desc Handles the attributes, class and id which are common to almost all elements.  
		 */
		function generateAttributes(schema_obj) {
			var attr = schema_obj.attribute;
			var content = '';
			$.each(attr, function(key,value) {
				console.log(key, value);
				content += key + '="' + value + '" ';
			})

			if (schema_obj.type) {
				content += 'type="' + schema_obj.type + '" '; 
			}

			if (schema_obj.class) {
				content += 'class="' + schema_obj.class + '" '; 
			}
			
			if (schema_obj.id) {
				content += 'id="' + schema_obj.id + '" '; 
			}

			return content; 
		}
});
// function processFormfields(){
//   		$('#res') += '<div class="form-group">' +
// 				'<label>''me</label>' +
// 			'</div>';
// }

