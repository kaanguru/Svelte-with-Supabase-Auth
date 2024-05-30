import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createBrowserClient, createServerClient, isBrowser, parse } from '@supabase/ssr';

export const load = async ({ data, depends, fetch }) => {
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get(key) {
						const cookie = parse(document.cookie);
						return cookie[key];
					}
				}
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get() {
						return JSON.stringify(data.session);
					}
				}
			});
	// Attempt to get the session
	let session = null;
	try {
		const {
			data: { session: fetchedSession }
		} = await supabase.auth.getSession();
		session = fetchedSession;
	} catch (error) {
		console.error('Failed to get session:', error);
	}

	// Validate the session by attempting to get the user
	let user = null;
	if (session) {
		const {
			data: { user: fetchedUser },
			error
		} = await supabase.auth.getUser();
		if (error) {
			console.error('Failed to validate session:', error);
		} else {
			user = fetchedUser;
		}
	}

	return { session, supabase, user };
};
