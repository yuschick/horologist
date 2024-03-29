export default {
    chronograph: {
        errors: {
            mono_pusher_not_found: 'The Chronograph Mono Pusher element could not be found.',
            dual_pusher_not_found: 'The Chronograph Dual Pusher element could not be found.',
            incompatible_pushers: 'The use of a Tri Pusher requires that a Dual Pusher be defined.',
            invalid_sub_seconds_duration: 'The Sub Seconds Duration must be between 2-30.',
            hours_hand_not_found: 'The Chronograph Hours Hand element could not be found.',
            minutes_hand_not_found: 'The Chronograph Minutes Hand element could not be found.',
            mono_pusher_cannot_support_rattrapante:
                'A Mono Pusher chronograph cannot support Rattrapante functionality. The watch much be either a Dual or Tri Pusher."',
            seconds_hand_not_found: 'The Chronograph Seconds Hand element could not be found.',
            split_hours_hand_not_found:
                'The Chronograph Rattrapante Hours Hand element could not be found.',
            split_minutes_hand_not_found:
                'The Chronograph Rattrapante Minutes Hand element could not be found.',
            split_seconds_hand_not_found:
                'The Chronograph Rattrapante Seconds Hand element could not be found.',
            tenth_seconds_hand_not_found: 'The Chronograph Tenths Hand element could not be found.',
            tri_pusher_not_found: 'The Chronograph Tri Pusher element could not be found.',
            invalid_duration: 'Durations must be a valid number greater than 2.',
        },
    },
    date_indicator: {
        errors: {
            element_not_found: 'Date Indicator element could not be found.',
            ones_element_not_found: 'Date Indicator Ones element could not be found.',
            tenths_element_not_found: 'Date Indicator Tenths element could not be found.',
            incompatible_displays:
                'A retrograde Date display can only be used with an id property.',
            incompatible_elements: 'An id cannot be used at the same time as a split Date display.',
            retrograde_exceeds_max:
                'A retrograde display cannot have a max value greater than 360.',
        },
    },
    day_indicator: {
        errors: {
            element_not_found: 'Day Indicator element could not be found.',
            retrograde_exceeds_max:
                'A retrograde display cannot have a max value greater than 360.',
        },
    },
    day_night_indicator: {
        errors: {
            element_not_found: 'Day Night Indicator element could not be found.',
        },
    },
    dial: {
        errors: {
            hours_hand_not_found: 'The Dial Hours Hand element could not be found.',
            hours_ones_hand_not_found: 'The Dial Split Hours Ones element could not be found.',
            hours_tenths_hand_not_found: 'The Dial Split Hours Tenths element could not be found.',
            incompatible_display_types:
                'A Dial Hand cannot have a split property at the same time as id and/or retrograde properties.',
            minutes_hand_not_found: 'The Dial Minutes Hand element could not be found.',
            minutes_ones_hand_not_found: 'The Dial Split Minutes Ones element could not be found.',
            minutes_tenths_hand_not_found:
                'The Dial Split Minutes Tenths element could not be found.',
            retrograde_exceeds_max:
                'A retrograde display cannot have a max value greater than 360.',
            seconds_hand_not_found: 'The Dial Seconds Hand element could not be found.',
            seconds_retrograde_out_of_range:
                'A Seconds Retrograde Duration must be between 10-60 seconds.',
        },
    },
    eq_time: {
        errors: {
            element_not_found: 'Equation of Time element could not be found.',
        },
    },
    foudroyante: {
        errors: {
            element_not_found: 'Foudroyante element could not be found.',
        },
    },
    minute_repeater: {
        errors: {
            element_not_found: 'Minute Repeater element could not be found.',
        },
    },
    month_indicator: {
        errors: {
            element_not_found: 'Month Indicator element could not be found.',
            retrograde_exceeds_max:
                'A retrograde display cannot have a max value greater than 360.',
        },
    },
    moonphase: {
        errors: {
            element_not_found: 'Moonphase element could not be found.',
        },
    },
    power_reserve: {
        errors: {
            element_not_found: 'Power Reserve element could not be found.',
        },
    },
    week_indicator: {
        errors: {
            element_not_found: 'Week Indicator element could not be found.',
            retrograde_exceeds_max:
                'A retrograde display cannot have a max value greater than 360.',
        },
    },
    year_indicator: {
        errors: {
            element_not_found: 'Year Indicator element could not be found.',
            retrograde_exceeds_max:
                'A retrograde display cannot have a max value greater than 360.',
            year_invalid: 'The year value provided to the Year Indicator is invalid.',
        },
    },
};
