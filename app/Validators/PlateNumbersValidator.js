app.service('plateNumbersValidator', function () {

    let sevenLetterResources = [
        //wyrozniki powiatowe 2-literowe
        new RegExp('[A-Z]{2}[0-9]{5}'),
        new RegExp('[A-Z]{2}[0-9]{4}[A-Z]{1}'),
        new RegExp('[A-Z]{2}[0-9]{3}[A-Z]{2}'),
        new RegExp('[A-Z]{2}[1-9]{1}[A-Z]{1}[0-9]{3}'),
        new RegExp('[A-Z]{2}[1-9]{1}[A-Z]{2}[0-9]{2}'),

        //wyrozniki powiatowe 3-literowe
        new RegExp('[A-Z]{4}[0-9]{3}'),
        new RegExp('[A-Z]{4}[0-9]{3}'),
        new RegExp('[A-Z]{3}[0-9]{2}[A-Z]{2}'),
        new RegExp('[A-Z]{3}[1-9]{1}[A-Z]{1}[0-9]{2}'),
        new RegExp('[A-Z]{3}[0-9]{2}[A-Z]{1}[1-9]{1}'),
        new RegExp('[A-Z]{3}[1-9]{1}[A-Z]{2}[1-9]{1}'),
        new RegExp('[A-Z]{5}[0-9]{2}'),
        new RegExp('[A-Z]{4}[0-9]{2}[A-Z]{1}'),
        new RegExp('[A-Z]{4}[0-9]{1}[A-Z]{2}')
    ];

    let eightLetterResources = [
        //wyrozniki powiatowe 3-literowe
        new RegExp('[A-Z]{3}[0-9]{5}'),
        new RegExp('[A-Z]{3}[0-9]{4}[A-Z]{1}'),
        new RegExp('[A-Z]{3}[0-9]{3}[A-Z]{2}')
    ];

    this.checkPlateNumbers = function (plateNumbers) {

        let error = 'Wprowadzony numer rejestracyjny jest niezgodny z polskim prawem\n';

        if (plateNumbers.length === 7) {
            for (let i = 0; i < sevenLetterResources.length; i++) {
                if (sevenLetterResources[i].test(plateNumbers)) {
                    error = '';
                }
            }
        }

        else if (plateNumbers.length === 8) {
            for (let i = 0; i < eightLetterResources.length; i++) {
                if (eightLetterResources[i].test(plateNumbers)) {
                    error = '';
                }
            }
        }

        if (error === '') {

            let countryCodes = [
                'DJ', 'DL', 'DB', 'DW', 'DBL', 'DDZ', 'DGL', 'DGR', 'DJA', 'DJE', 'DKA', 'DKL', 'DLE', 'DLB', 'DLU', 'DLW', 'DMI', 'DOL',
                'DOA', 'DPL', 'DST', 'DSR', 'DSW', 'DTR', 'DBA', 'DWL', 'DWR', 'DZA', 'DZG', 'DZL', 'CB', 'CG', 'CT', 'CW', 'CAL', 'CBR',
                'CBY', 'CCH', 'CGD', 'CGR', 'CIN', 'CLI', 'CMG', 'CNA', 'CRA', 'CRY', 'CSE', 'CSW', 'CTR', 'CTU', 'CWA', 'CWL', 'CZN', 'LB',
                'LC', 'LU', 'LZ', 'LBI', 'LBL', 'LCH', 'LHR', 'LJA', 'LKS', 'LKR', 'LLB', 'LUB', 'LLE', 'LLU', 'LOP', 'LPA', 'LPU', 'LRA',
                'LRY', 'LSW', 'LTM', 'LWL', 'LZA', 'FG', 'FZ', 'FGW', 'FKR', 'FMI', 'FNW', 'FSL', 'FSD', 'FSU', 'FSW', 'FWS', 'FZI', 'FZG',
                'FZA', 'EL', 'ED', 'EP', 'ES', 'EBE', 'EBR', 'EKU', 'ELA', 'ELE', 'ELC', 'ELW', 'EOP', 'EPA', 'EPJ', 'EPI', 'EPD', 'ERA',
                'ERW', 'ESI', 'ESK', 'ETM', 'EWI', 'EWE', 'EZD', 'EZG', 'KR', 'KK', 'KN', 'KT', 'KBC', 'KBA', 'KBR', 'KCH', 'KDA', 'KGR',
                'KRA', 'KLI', 'KMI', 'KMY', 'KNS', 'KNT', 'KOL', 'KOS', 'KPR', 'KSU', 'KTA', 'KTT', 'KWA', 'KWI', 'WB', 'WA', 'WD', 'WE',
                'WU', 'WF', 'WH', 'WI', 'WJ', 'WK', 'WN', 'WT', 'WW', 'WY', 'WX', 'WO', 'WP', 'WR', 'WS', 'WBR', 'WCI', 'WG', 'WGS', 'WGM',
                'WGR', 'WKZ', 'WL', 'WLI', 'WLS', 'WMA', 'WM', 'WML', 'WND', 'WOS', 'WOR', 'WOT', 'WPI', 'WPL', 'WPN', 'WPR', 'WPP', 'WPS',
                'WPZ', 'WPY', 'WPU', 'WRA', 'WSI', 'WSE', 'WSC', 'WSK', 'WSZ', 'WZ', 'WWE', 'WWL', 'WV', 'WWY', 'WZW', 'WZU', 'WZY', 'OP',
                'OB', 'OGL', 'OK', 'OKL', 'OKR', 'ONA', 'ONY', 'OOL', 'OPO', 'OPR', 'OST', 'RK', 'RP', 'RZ', 'RT', 'RBI', 'RBR', 'RDE', 'RJA',
                'RJS', 'RKL', 'RKR', 'RLS', 'RLE', 'RLU', 'RLA', 'RMI', 'RNI', 'RPR', 'RPZ', 'RRS', 'RZE', 'RSA', 'RST', 'RSR', 'RTA', 'BI',
                'BL', 'BS', 'BAU', 'BIA', 'BBI', 'BGR', 'BHA', 'BKL', 'BLM', 'BMN', 'BSE', 'BSI', 'BSK', 'BSU', 'BWM', 'BZA', 'GD', 'GA', 'GS',
                'GSP', 'GBY', 'GCH', 'GCZ', 'GDA', 'GKA', 'GKS', 'GKW', 'GLE', 'GMB', 'GND', 'GPU', 'GSL', 'GST', 'GSZ', 'GTC', 'GWE', 'GWO',
                'SB', 'SY', 'SH', 'SC', 'SD', 'SG', 'SJZ', 'SJ', 'SK', 'SM', 'SPI', 'SL', 'SRS', 'SR', 'SI', 'SO', 'SW', 'ST', 'SZ', 'SZO',
                'SBE', 'SBI', 'SBL', 'STY', 'SCI', 'SCZ', 'SGL', 'SKL', 'SLU', 'SMI', 'SMY', 'SPS', 'SRC', 'SRB', 'STA', 'SWD', 'SWZ', 'SZA',
                'SZY', 'TK', 'TBU', 'TJE', 'TKA', 'TKI', 'TKN', 'TOP', 'TOS', 'TPI', 'TSA', 'TSK', 'TST', 'TSZ', 'TLW', 'NE', 'NO', 'NBA',
                'NBR', 'NDZ', 'NEB', 'NEL', 'NGI', 'NGO', 'NOG', 'NIL', 'NKE', 'NLI', 'NMR', 'NNI', 'NNM', 'NOE', 'NOL', 'NOS', 'NPI', 'NSZ',
                'NWE', 'PK', 'PA', 'PN', 'PKO', 'PL', 'PO', 'PY', 'PCH', 'PCT', 'PGN', 'PGS', 'PGO', 'PJA', 'PKA', 'PKE', 'PKL', 'PKN', 'PKS',
                'PKR', 'PLE', 'PMI', 'PNT', 'POB', 'POS', 'POT', 'PP', 'PPL', 'PZ', 'POZ', 'PRA', 'PSL', 'PSZ', 'PSE', 'PSR', 'PTU', 'PWA',
                'PWL', 'PWR', 'PZL', 'ZK', 'ZS', 'ZZ', 'ZSW', 'ZBI', 'ZCH', 'ZDR', 'ZGL', 'ZGY', 'ZGR', 'ZKA', 'ZKL', 'ZKO', 'ZLO', 'ZMY',
                'ZPL', 'ZPY', 'ZSL', 'ZST', 'ZSZ', 'ZSD', 'ZWA'];

            for (let i = 0; i < countryCodes.length; i++) {
                if (countryCodes[i].length === 2) {
                    if (new RegExp('^' + countryCodes[i] + '[0-9]').test(plateNumbers)) {
                        return '';
                    }
                }
                else {
                    if (new RegExp('^' + countryCodes[i]).test(plateNumbers)) {
                        return '';
                    }
                }
            }
            return "Wyróżnik powiatu jest niepoprawny\n";
        }

        else {
            return error;
        }
    }
});
