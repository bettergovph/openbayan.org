const dateFormat = new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeZone: 'UTC' });

/** Formats a YYYY-MM-DD date the same way on the server and in every browser. */
export function formatDate(isoDate: string): string {
	return dateFormat.format(new Date(isoDate));
}

export function plural(count: number, singular: string, pluralForm = `${singular}s`): string {
	return `${count} ${count === 1 ? singular : pluralForm}`;
}
