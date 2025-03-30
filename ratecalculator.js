/**
 *  CODED BY CARLO
 */
jQuery(function() {
    // Cache the elements that are frequently used
    const $inputs = jQuery("input");
    const $pElements = jQuery("p");
    const $aButton = jQuery("#a");
    const $bButton = document.getElementById('b');
    
    // Event listener for the button click
    $aButton.click(function() {
        // Retrieve and validate input values
        let principalAmount = getCleanedInputValue($inputs.eq(0));
        let interestRate = getCleanedInputValue($inputs.eq(1));

        if (principalAmount === null) {
            alert("Please enter a PRINCIPAL AMOUNT");
            return;
        } else if (interestRate === null) {
            alert("Please enter an INTEREST RATE");
            return;
        }

        let withHoldingTaxRate = 20;
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1; // Get current month (1-indexed)
        let currentYear = currentDate.getFullYear();

        // Calculate earnings
        let dailyEarning = calculateDailyEarning(principalAmount, interestRate, currentYear);
        let withHoldingTaxAmount = dailyEarning * percentToDecimal(withHoldingTaxRate);
        let dailyEarningAmount = dailyEarning - withHoldingTaxAmount;

        // Get number of days in the current month
        let daysInMonth = getDaysInMonth(currentMonth, currentYear);

        // Calculate monthly and yearly earnings
        let monthlyEarningAmount = dailyEarningAmount * daysInMonth;
        let yearlyEarningAmount = monthlyEarningAmount * 12;

        // Update the UI with the results
        $pElements.eq(0).text(`DAILY EARNING: ${dailyEarningAmount.toFixed(2)}`);
        $pElements.eq(1).text(`MONTHLY EARNING: ${monthlyEarningAmount.toFixed(2)}`);
        $pElements.eq(2).text(`YEARLY EARNING: ${yearlyEarningAmount.toFixed(2)}`);
        
        console.log(Math.round((dailyEarningAmount + Number.EPSILON) * 100) / 100);
    });

    // Trigger click event when "Enter" is pressed
    $inputs.keyup(function (event) {
        if (event.keyCode === 13) {
            $aButton.click();
        }
    });

    // Check online status to enable/disable the button
    checkOnlineStatus();

    // Helper Functions
    function getCleanedInputValue($input) {
        let value = $input.val();
        return value != null && value !== '' ? value.replace(/,/g, '') : null;
    }

    function calculateDailyEarning(principal, interestRate, year) {
        return (parseFloat(principal) * percentToDecimal(interestRate)) / (isLeapYear(year) ? 366 : 365);
    }

    function percentToDecimal(percent) {
        return parseFloat(percent) / 100;
    }

    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate(); // Returns the number of days in the month
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }

	 // Listen for online and offline status changes
	 window.addEventListener('online', checkOnlineStatus);
	 window.addEventListener('offline', checkOnlineStatus);

    function checkOnlineStatus() {
        if (navigator.onLine) {
            $bButton.disabled = false;
        } else {
            $bButton.disabled = true;
        }
    }
    
    // Format input with commas
    window.formatWithCommas = function(input) {
        if (input.value === '') {
            input.value = null;
            return;
        }
        let value = input.value.replace(/,/g, '');
        input.value = Number(value).toLocaleString('en-US');
    };

    // Ensure only numeric input
    window.isNumber = function(event) {
        const keyCode = event.keyCode || event.which;
        const key = String.fromCharCode(keyCode);
        if (!/[\d]/.test(key)) {
            event.preventDefault();
        }
    };
});
