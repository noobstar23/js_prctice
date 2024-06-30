/**
 *  CODED BY CARLO
 */
jQuery(function() {
	jQuery("#a").click(function() {
		let principalAmount = jQuery("input").eq(0).val() != null && jQuery("input").eq(0).val()!='' ? jQuery("input").eq(0).val() : null;
		let interestRate =  jQuery("input").eq(1).val() != null && jQuery("input").eq(1).val()!='' ? percentToDeciaml(jQuery("input").eq(1).val()) : null;
		let withHoldingTaxRate = 20,
		dailyEarningAmount=0.0,
		monthlyEarningAmount=0.0,
		yearlyEarningAmount=0.0;
		if (principalAmount===null) {
			alert(" Please enter a PRINCIPAL AMOUNT");
			return;
		} else if (interestRate===null) {
			alert(" Please enter a INTEREST RATE");
			return;
		} else {			
			var dailyEarning = parseFloat(principalAmount) * interestRate / 365 ;
			var withHoldingTaxAmount = dailyEarning * percentToDeciaml(withHoldingTaxRate);
			dailyEarningAmount = dailyEarning - withHoldingTaxAmount;
			monthlyEarningAmount = dailyEarningAmount * 30;
			yearlyEarningAmount = monthlyEarningAmount * 12;
						
			jQuery("p").eq(0).text("DAILY EARNING: "+dailyEarningAmount.toFixed(2));
			jQuery("p").eq(1).text("MONTHLY EARNING: "+monthlyEarningAmount.toFixed(2));
			jQuery("p").eq(2).text("YEARLY EARNING: "+yearlyEarningAmount.toFixed(2));
			
			console.log(Math.round( ( dailyEarningAmount + Number.EPSILON ) * 100 ) / 100)
		};
	});
	jQuery(function() {
		jQuery("input").keyup(function (event) {
            if (event.keyCode === 13) {
                $("#a").click();
            }
        });
	});
});

function percentToDeciaml(percentStr) {
	return parseFloat(percentStr) / 100;  
};