
function calculateInterest(props) {
  let years, months;
  let ADAContribMonth, monthlyADAIncrease;
  let amount = props["startingBalance"];
  let totalADAPur = 0;
  let totalCurrInv = 0;
  let ADAPrice = parseFloat(props["currencyPerAda"]);
  const time = 1 / 12;

  if (props["timeToGrowUnit"] === "years") {
    years = props["timeToGrow"];
    months = 0;
  } else {
    years = Math.trunc(props["timeToGrow"] / 12);
    months = props["timeToGrow"] % 12;
  }

  for (let i = 0; i < years; i++) {
    ADAPrice += ADAPrice * (props["yearlyADAIncrease"] / 100);
    ADAContribMonth = props["monthlyContribution"] / ADAPrice;

    amount += ((amount * ((1 + (props["returnOnStake"] / 100) / 12) ** 12 )) - amount);
    amount += ADAContribMonth * 12;

    totalCurrInv += props["monthlyContribution"] * 12;
    totalADAPur += ADAContribMonth * 12;
  }

  monthlyADAIncrease = (ADAPrice * (props["yearlyADAIncrease"] / 100)) / 12;
  for (let i = 0; i < months; i++) {
    ADAPrice += monthlyADAIncrease;
    ADAContribMonth = props["monthlyContribution"] / ADAPrice;

    amount += (amount * ((1 + (props["returnOnStake"] / 100) / 1) ** time)) - amount;
    amount += ADAContribMonth;

    totalCurrInv += props["monthlyContribution"];
    totalADAPur += ADAContribMonth;
  }


  props["setFinalAdaPrice"](ADAPrice);
  props["setTotalCurrencyInvested"](totalCurrInv);
  props["setTotalAdaPurchased"](totalADAPur);
  props["setFinalAda"](amount);
}

export { calculateInterest };

