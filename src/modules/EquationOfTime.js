// Equation of Time Class
// @params settings: object
// @params parentWatch: Watch instance
//
// Notes
// Logic taken from: http://www2.arnes.si/~gljsentvid10/sunset_rise.html

const Timezone = require('moment-timezone');

class EquationOfTime {
    constructor(settings, parentWatch) {
        this.errorChecking(settings);

        this.element = document.getElementById(settings.id);
        this.parent = parentWatch;

        this.range = settings.range || [-45, 45];
        this.minRange = this.range[0];
        this.maxRange = this.range[1];
        this.minIncrement = this.minRange / 14;
        this.maxIncrement = this.maxRange / 16;

        this.timezone = Timezone.tz.guess();
        this.rightNow = this.parent.rightNow.tz(this.timezone);

        this.dateObj = {
            hours: this.rightNow.hours(),
            minutes: this.rightNow.minutes(),
            seconds: this.rightNow.seconds(),
            date: this.rightNow.date(),
            month: this.rightNow.month() + 1,
            year: this.rightNow.year(),
        };
        this.UT = this.dateObj.hours + this.dateObj.minutes / 60 + this.dateObj.seconds / 3600;
        this.RA = null;
        this.A = null;
        this.JD = null;
        this.eqTime = null;

        this.init();
    }

    errorChecking(settings) {
        try {
            if (!settings.id)
                throw "The Equation of Time Class requires that an ID of the indicator element be provided.";
        } catch (errorMsg) {
            console.error(errorMsg);
            return;
        }
    }

    rotateHands() {
        const increment = this.eqTime > 0 ? this.maxIncrement : this.minIncrement;
        const rotateVal = this.eqTime * increment;
        this.element.style.transform = `rotate(${rotateVal}deg)`;
    }

    JulDay() {
        let d = this.dateObj.date;
        let m = this.dateObj.month;
        let y = this.dateObj.year;
        let u = this.UT;

        if (y < 1900) y = y + 1900
        if (m <= 2) {
            m = m + 12;
            y = y - 1
        }
        this.A = Math.floor(y / 100);
        this.JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d - 13 - 1524.5 + u / 24.0;
        return this.JD;
    }

    EPS(T) {
        let K = Math.PI / 180.0;
        let LS = this.sunL(T);
        let LM = 218.3165 + 481267.8813 * T;
        let eps0 = 23.0 + 26.0 / 60.0 + 21.448 / 3600.0 - (46.8150 * T + 0.00059 * T * T - 0.001813 * T * T * T) / 3600;
        let omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + T * T * T / 450000;
        let deltaEps = (9.20 * Math.cos(K * omega) + 0.57 * Math.cos(K * 2 * LS) + 0.10 * Math.cos(K * 2 * LM) - 0.09 * Math.cos(K * 2 * omega)) / 3600;
        return eps0 + deltaEps;
    }

    sunL(T) {
        let L = 280.46645 + 36000.76983 * T + 0.0003032 * T * T;
        L = L % 360;
        if (L < 0) L = L + 360;
        return L;
    }

    declination() {
        let K = Math.PI / 180.0;
        let jd = this.JulDay();
        let T = (jd - 2451545.0) / 36525.0;
        let L0 = 280.46645 + (36000.76983 + 0.0003032 * T) * T;
        let M = 357.52910 + (35999.05030 - (0.0001559 * T + 0.00000048 * T) * T) * T;
        M = K * M;
        let C = (1.914600 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) + (0.019993 - 0.000101 * T) * Math.sin(2 * M) + 0.000290 * Math.sin(3 * M);
        let theta = L0 + C;
        let omega = 125.04 - 1934.136 * T;
        let lambda = theta - 0.00569 - 0.00478 * Math.sin(K * omega);
        let eps0 = 23.0 + 26.0 / 60.0 + 21.448 / 3600.0 - (46.8150 * T + 0.00059 * T * T - 0.001813 * T * T * T) / 3600;
        let eps = eps0 + 0.00256 * Math.cos(K * omega);
        // let declin = Math.sin(K * eps) * Math.sin(K * lambda);
        // declin = Math.asin(declin) / K;
        this.RA = Math.atan2(Math.cos(K * eps) * Math.sin(K * lambda), Math.cos(K * lambda)) / K;
        if (this.RA < 0) this.RA = this.RA + 360;
    }

    deltaPSI(T) {
        let K = Math.PI / 180.0;
        let deltaPsi, omega, LS, LM;
        LS = this.sunL(T);
        LM = 218.3165 + 481267.8813 * T;
        LM = LM % 360;
        if (LM < 0) LM = LM + 360;
        omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + T * T * T / 450000;
        deltaPsi = -17.2 * Math.sin(K * omega) - 1.32 * Math.sin(K * 2 * LS) - 0.23 * Math.sin(K * 2 * LM) + 0.21 * Math.sin(K * 2 * omega);
        deltaPsi = deltaPsi / 3600.0;
        return deltaPsi;
    }

    getEOT() {
        let K = Math.PI / 180.0;
        let T = (this.JulDay() - 2451545.0) / 36525.0;
        let eps = this.EPS(T);
        this.declination(this.dateObj);
        let LS = this.sunL(T);
        let deltaPsi = this.deltaPSI(T);
        let E = LS - 0.0057183 - this.RA + deltaPsi * Math.cos(K * eps);

        if (E > 5) E = E - 360.0;
        E = E * 4;
        E = Math.round(1000 * E) / 1000;

        this.eqTime = E.toFixed(2);

        this.rotateHands();
    }

    init() {
        this.getEOT();
    }

}

module.exports = EquationOfTime;