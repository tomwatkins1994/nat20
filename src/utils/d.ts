export function d(dice: number): number {
	const result = Math.ceil(Math.random() * dice);
	return result;
}
