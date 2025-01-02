
/**
 * Takes a date string in specific formats and attempts to output the date.
 * This function expects the date to be in one of the following formats:
 *  Year only: 2020
 *  Year and month: 2020-10
 *  Year, month, and day: 2020-10-01
 * 
 * The output displays a date formatted in the user's locale containing
 * the year and month (if specified) only.
 * 
 * @param {string} standardizedDateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
export function standardDateStringToLocalizedDateString(standardizedDateString: string | null | undefined) {
    if (!standardizedDateString) {
        return '';
    }

    const parsedTimestamp = Date.parse(standardizedDateString);
    if ( Number.isNaN( parsedTimestamp ) ) {
        return '';
    }

    const dateFormatOptions: Intl.DateTimeFormatOptions = { timeZone: 'UTC', year: 'numeric' };

    // If a month was specified, include the month in the output, but don't
    // include the day.
    if ( standardizedDateString.split(/[-/]/).length > 1 ) {
        dateFormatOptions.month = 'short';
    }

    // Use the user's default locale to format the string
    return new Date(parsedTimestamp).toLocaleDateString(undefined,dateFormatOptions);
}