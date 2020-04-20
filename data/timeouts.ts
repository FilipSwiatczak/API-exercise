let multiplier = 1;

export enum implicitTimeout {
    "microWait" = 500 * multiplier,
    "miniWait" = 1000 * multiplier,
    "shortWait" = 2 * 1000 * multiplier,
    "defaultAction" = 5 * 1000 * multiplier,
    "documentDownload" = 20 * 1000 * multiplier,
    "visibility" = 20 * 1000 * multiplier,
    "hooks" = 15 * 1000 * multiplier
}

export enum explicitTimeout {
    'fifteenSec' = 15 * 1000 * multiplier,
    'halfMinute' = 30 * 1000 * multiplier,
    'minute' = 60 * 1000 * multiplier,
    'minuteAndHalf' = 90 * 1000 * multiplier,
    'twoMinutes' = 120 * 1000 * multiplier,
}

/**
 * Single point of control for adjusting all your wait times proportionately.
 * Example: you detect environment slowing down, pass 1.3 for 30% longer waiting time
 */
export class Timeouts {
    public static setTimeoutMultiplier(factor: number){
        multiplier = factor;
    }
}