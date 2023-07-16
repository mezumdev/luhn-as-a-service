function generateValidCard(bin, length) {
	var cardNumber = generate(bin, length),
		luhnValid  = luhnChk(cardNumber),
		limit      = 20,
		counter	   = 0;

	while (!luhnValid) {
		cardNumber = generate(bin, length);
		luhnValid  = luhnChk(cardNumber);
		counter++;
		
		if (counter === limit) {
			cardNumber = (luhnValid) ? cardNumber : 'cannot make valid card with given params'
			break;
		}
	}
	
	return cardNumber;
}

function generate(bin, length) {
    var cardNumber = bin,
        randomNumberLength = length - (bin.length + 1);

    for (var i = 0; i < randomNumberLength; i++) {
        var digit = Math.floor((Math.random() * 9) + 0);
        cardNumber += digit;
    }

	var checkDigit = getCheckDigit(cardNumber);

	cardNumber += String(checkDigit);
	
    return cardNumber;
}

function getCheckDigit(number) {
    var sum = 0,
        module,
        checkDigit;

    for (var i = 0; i < number.length; i++) {

        var digit = parseInt(number.substring(i, (i + 1)));

        if ((i % 2) == 0) {
            digit = digit * 2;
            if (digit > 9) {
                digit = (digit / 10) + (digit % 10);
            }
        }
        sum += digit;
    }

    module     = parseInt(sum) % 10;
    checkDigit = ((module === 0) ? 0 : 10 - module);
    
    return checkDigit;
}

var luhnChk = (function (arr) {
    return function (ccNum) {
        var 
            len = ccNum.length,
            bit = 1,
            sum = 0,
            val;

        while (len) {
            val = parseInt(ccNum.charAt(len * -1), 10);
            sum += (bit ^= 1) ? arr[val] : val;
        }

        return sum && sum % 10 === 0;
    };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

Deno.serve((req) => new Response(
    {
        number: generateValidCard("4011", 16),
    }
));