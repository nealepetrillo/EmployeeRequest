/**
 * The index.js script contains functions and scripts to be run with 
 * index.html. The scripts rely on JQuery, JQuery validate, Mask and 
 * Tooltipster which must be included in the index.html file before this.
 */
 $(document).ready(function () {
	initalize();
 });


/** Begin Functions **/

/**
 * Initialization function to be called when the page loads
 */
function initalize() {
	
	//Initialize tool-tips
	$('#indexForm :input').each(function() {
		
      var tipelement = getTipContainer(this);

      $(tipelement).tooltipster({
         trigger: 'custom', 
         onlyOne: false, 
         position: 'right',
         multiple:false,
         autoClose:false});
	});
	
	//Initialize validation rules
	$("#indexForm").validate({
		rules:
		{
			name:
			{
				required: true,
				letterswithbasicpunc: true
			},
			idNumber:
			{
				required: true,
				alphanumeric: true
			},
			phoneNumber:
			{
				required: true,
				phoneUS: true
			},
			street:
			{
				required: true,
				alphanumeric: true
			},
			city:
			{
				required: true,
				letterswithbasicpunc: true
			},
			state:
			{
				required: true
			},
			zip:
			{
				required: true,
				zipcodeUS: true
			},
			currentEmployee:
			{
			
			}
		},
		messages:
		{
			name:
			{
				required: "Please enter a name",
				letterswithbasicpunc: "Name can only contain letters and basic punctuation" 
			},
			idNumber:
			{
				required: "Please enter an ID number",
				alphanumeric: "ID number must be letters or numbers"
			},
			phoneNumber:
			{
				required: "Please enter a phone number",
				phoneUS: "Please enter a ten digit phone number"
			},
			street:
			{
				required: "Please enter a street",
				alphanumeric: "Please enter a street address"
			},
			city:
			{
				required: "Please enter a city",
				letterswithbasicpunc: "City must contain leters and basic punctuation"
			},
			state:
			{
				required: "Please select a state"
			},
			zip:
			{
				required: "Please enter a zip code",
				zipcodeUS: "Please enter a five or nine digit zip code"
			},
			currentEmployee:
			{
			
			}
		},
		errorPlacement: function(error, element)
		{
			var $element = $(element),
				tipelement=element,
				text=$(error).text(),
				last_error='';

			tipelement = getTipContainer(element);

			last_error = $(tipelement).data('last_error');
			$(tipelement).data('last_error',text);
			
			if(text !='' && text != last_error)
			{
				$(tipelement).tooltipster('content', text);
				$(tipelement).tooltipster('show');
			}
		},
		success: function(label, element)
		{
            var tipelement = getTipContainer(element);
            $(tipelement).tooltipster('hide');
		},
		submitHandler: function(form) 
		{
			processForm();
		}
	});
	
	//Initialize formatting
	var phoneMask = {onKeyPress: function(cep){
		var masks = ['000-0000', '(000) 000-0000'];
		
		if(cep.length < 8) 
		{
			mask = masks[0];
		}
		else 
		{
			mask = masks[1];
		}
		
		$("#phoneNumber").mask(mask,this);
	}};
	
	$("#phoneNumber").mask('(000) 000-0000', phoneMask);
	
	var zipMask = {onKeyPress: function(cep){
		var masks = ['00000', '00000-0000'];
		
		if(cep.length < 3) 
		{
			mask = masks[0];
		}
		else 
		{
			mask = masks[1];
		}
		
		$("#zip").mask(mask,this);
	}};
	
	$("#zip").mask('00000-0000', zipMask);
}

/**
 * Form processing function to be called when the employee request form is submitted
 */
 function processForm() {

		//Get the form contents
		var rawData = $("#indexForm").serializeArray();
		var jsonData = {};
		var value;
		
		$.each(rawData, function() {
			if(jsonData[this.name] !== undefined) {
				if(!jsonData[this.name].push) {
					jsonData[this.name] = [jsonData[this.name]];
				}
				jsonData[this.name].push(this.value || '');
			}
			else {
				jsonData[this.name] = this.value || '';
			}
		});
		
		//Log the data for viewing - this is for debugging / confirmation only
		console.log(jsonData);
		
		//Send the AJAX request
		$.post("http://localhost", jsonData, processServerResponse);
		
		//Hid the form and display confirmation
		$("#formContainer").hide();
		$("#formConfirmation").show();
 }
 
 function processServerResponse(data,status) {
	alert("Request succeeded!");
 }
function getTipContainer(element)
{
	var tipelement = element;
	if ( $(element).is(":checkbox") || $(element).is(":radio") )
	{
		tipelement = $(element).parents('.container').get(0);
	}
	return tipelement;
}