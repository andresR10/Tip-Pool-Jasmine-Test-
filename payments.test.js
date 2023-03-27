describe('payments tests', function(){
    beforeEach(function(){
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
    });

    it('should add a new payment to submitPaymentInfo() ', function() {
        submitPaymentInfo();

        expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment1'].tipAmt).toEqual('20'); 
        expect(allPayments['payment1'].tipPercent).toEqual(20); 
    });

    it('should not add a new payment on to submitPaymentInfo() with empty input', function() {
        billAmtInput.value = '';
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should create a payment to createCurPayment()', function (){
        let payment = createCurPayment();
        expect(payment).toEqual({billAmt: '100', tipAmt: '20', tipPercent: 20});
    });

    it('should not create payment if createCurPayment() input is invalid', function(){
        billAmtInput.value = '';
        tipAmtInput.value = 20;

        expect(createCurPayment()).toEqual(undefined);
    })

    it('should update the payment table on appendPaymentTable()', function(){
        let curPayment = createCurPayment();
        appendPaymentTable(curPayment);

        let paymentList = document.querySelectorAll('#paymentTable tbody tr td')

        expect(paymentList.length).toEqual(3);
        expect(paymentList[0].innerText).toEqual('$100');
        expect(paymentList[1].innerText).toEqual('$20');
        expect(paymentList[2].innerText).toEqual('20%');

    })

    it('should update updateSummary() with sum of all payments', function() {
        allPayments['payment1'] = {billAmt: 100, tipAmt: 20, tipPercent: 20};
        allPayments['payment2'] = {billAmt: 50, tipAmt: 10, tipPercent: 20};

        updateSummary();

        let summaryList = document.querySelectorAll('#summaryTable tbody tr td');

        expect(summaryList.length).toEqual(3);
        expect(summaryList[0].innerText).toEqual('$150');
        expect(summaryList[1].innerText).toEqual('$30');
        expect(summaryList[2].innerText).toEqual('20%');
    })

    afterEach(function(){
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerHTML = '';
    });
})