<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { activationEmail } from '$lib/config/site';

	const summary =
		'People who maintain or contribute to a project can ask for an @openbayan.org email address.';

	const mailServers = [
		{
			title: 'Incoming mail (IMAP/POP3)',
			settings: [
				{ name: 'IMAP server', value: 'mail.openbayan.org' },
				{ name: 'IMAP SSL port', value: '993' },
				{ name: 'IMAP non-SSL port', value: '143' },
				{ name: 'POP3 SSL port', value: '995' },
				{ name: 'POP3 non-SSL port', value: '110' }
			]
		},
		{
			title: 'Outgoing mail (SMTP)',
			settings: [
				{ name: 'SMTP server', value: 'mail.openbayan.org' },
				{ name: 'SMTP SSL port', value: '465' },
				{ name: 'SMTP STARTTLS port', value: '587' },
				{ name: 'SMTP non-SSL port', value: '25' }
			]
		}
	];
</script>

<Meta title="Email activation" description={summary} />

<div class="hero">
	<div class="hero-inner">
		<h1 class="poster">Email activation</h1>
		<p class="lead">
			{summary} Write to {activationEmail}. Requests are usually answered within 2 to 3 days.
		</p>
		<p class="actions">
			<a class="button" href="mailto:{activationEmail}">Send a request</a>
		</p>
	</div>
</div>

<div class="page">
	<div class="prose">
		<h2>What to send</h2>
		<ul>
			<li>Your name and a short background</li>
			<li>The username you want for your address</li>
			<li>Links to your projects or contributions, if you have any</li>
			<li>Your GitHub username, if you want access to the GitHub organization</li>
			<li>How you want to contribute</li>
		</ul>

		<h2>What you get</h2>
		<ul>
			<li>An @openbayan.org email address</li>
			<li>Access to the GitHub organization, if you asked for it</li>
			<li>Access to the channels where volunteers coordinate</li>
		</ul>

		<h2>Rules</h2>
		<ol>
			<li>Send at most 400 emails an hour. More than that gets the domain flagged as spam.</li>
			<li>Do not send marketing email.</li>
			<li>Do not work around the first two rules.</li>
			<li>Change your password as soon as you receive your first login details.</li>
		</ol>

		<h2>Mail client settings</h2>
		<p>
			Use IMAP so that mail stays in sync across devices, and use the SSL ports. If your client
			cannot use SSL on port 465, use STARTTLS on port 587. Both servers need your username and
			password.
		</p>
	</div>

	{#each mailServers as server (server.title)}
		<h3>{server.title}</h3>
		<dl class="facts">
			{#each server.settings as setting (setting.name)}
				<div>
					<dt>{setting.name}</dt>
					<dd>{setting.value}</dd>
				</div>
			{/each}
		</dl>
	{/each}
</div>
