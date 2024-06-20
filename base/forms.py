from django import forms
class PaymentForm(forms.Form):
    order_type = forms.CharField(max_length=50)
    order_id = forms.IntegerField()
    amount = forms.IntegerField()
    order_desc = forms.CharField(max_length=255, required=False)
    bank_code = forms.CharField(max_length=50, required=False)
    language = forms.CharField(max_length=2, required=False)