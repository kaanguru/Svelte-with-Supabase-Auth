export const load = async ({ locals: { supabase } }) => {
	const { data: countries } = await supabase.from('countries').select('name,continent').limit(16);

	return { countries: countries ?? [] };
};
