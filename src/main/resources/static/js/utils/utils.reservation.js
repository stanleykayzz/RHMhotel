/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
        "use strict";

        if (typeof Core === "undefined")
            throw "Core is not declared";

        Core.utils.reservation = Core.utils.reservation || {};

        /**
         * Init a datepicker
         * @param datepickerID
         * @param min
         * @param max
         */
        Core.utils.reservation.datePicker = function (datepickerID, min, max) {
            $(datepickerID).datepicker();

            if (min !== null)
                $(datepickerID).datepicker("option", "minDate", min);

            if (max !== null)
                $(datepickerID).datepicker("option", "maxDate", max);

            $(datepickerID).datepicker("option", "autoSize", true);
        };

        Core.utils.reservation.getCurrencySymbol = function () {
            var currency_info = {
                'AED': 'د.إ',
                'ANG': 'ƒ',
                'ARS': '$',
                'AUD': 'A$',
                'BRL': 'R$',
                'BSD': 'B$',
                'CAD': '$',
                'CHF': 'CHF',
                'CLP': '$',
                'CNY': '¥',
                'COP': '$',
                'CZK': 'Kč',
                'DKK': 'kr',
                'EUR': '€',
                'FJD': 'FJ$',
                'GBP': '£',
                'GHS': 'GH₵',
                'GTQ': 'Q',
                'HKD': '$',
                'HNL': 'L',
                'HRK': 'kn',
                'HUF': 'Ft',
                'IDR': 'Rp',
                'ILS': '₪',
                'INR': '₹',
                'ISK': 'kr',
                'JMD': 'J$',
                'JPY': '¥',
                'KRW': '₩',
                'LKR': '₨',
                'MAD': '.د.م',
                'MMK': 'K',
                'MXN': '$',
                'MYR': 'RM',
                'NOK': 'kr',
                'NZD': '$',
                'PAB': 'B/.',
                'PEN': 'S/.',
                'PHP': '₱',
                'PKR': '₨',
                'PLN': 'zł',
                'RON': 'lei',
                'RSD': 'RSD',
                'RUB': 'руб',
                'SEK': 'kr',
                'SGD': 'S$',
                'THB': '฿',
                'TND': 'DT',
                'TRY': 'TL',
                'TTD': '$',
                'TWD': 'NT$',
                'USD': '$',
                'VEF': 'Bs',
                'VND': '₫',
                'XAF': 'FCFA',
                'XCD': '$',
                'XPF': 'F',
                'ZAR': 'R'
            };

            data.symbol = currency_info[data.countryInfo.to];
        };
    })();