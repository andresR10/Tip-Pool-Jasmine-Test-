describe('helpers to payments tests', function(){
    let tr;
    beforeEach(function(){
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
        submitPaymentInfo();
        tr = document.createElement('tr');
        
    });

    it('should return the total of all payment values of the given type', function(){
        const tipTotal = sumPaymentTotal('tipAmt');
        expect(tipTotal).toEqual(20);
    })
    
    it('should sum the total bill amount from all payments', function(){
        const billTotal = sumPaymentTotal('billAmt');
        expect(billTotal).toEqual(100);
    })

    it('should sum the total percent amount from all payments', function(){
        const percentTotal = sumPaymentTotal('tipPercent');
        expect(percentTotal).toEqual(20);
    });

    it('should convert billAmt and tipAmt into a percent', function(){
        const billAmt = 100;
        const tipAmt = 20;
        const expectedPercent = 20;

        const result = calculateTipPercent(billAmt, tipAmt);
        expect(result).toEqual(expectedPercent);
    });

    it('should append new td element with value to a table row', function(){
        const value = 'test value';
        
        appendTd(tr, value);

        expect(tr.children.length).toEqual(1);

        const td = tr.children[0];
        expect(td.innerText).toEqual(value);
    })

    it('should append a deleteBtn element to a table row', function(){
        appendDeleteBtn(tr);
        expect(tr.children.length).toEqual(1);
        expect(tr.children[0].innerText).toEqual('X');
    });
    
    afterEach(function(){
        billAmtInput.value = '';
        tipAmtInput.value = '';
        allPayments = {};
        paymentId =  0;
        paymentTbody.innerHTML = '';
    })
});