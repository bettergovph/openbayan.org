<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { activationEmail } from '$lib/config/site';

	const summary = 'Request activation for meaningful contributors to the OpenBayan community.';

	const eligible = [
		{
			title: 'Project maintainers',
			text: 'Developers and organizations who maintain open source projects.'
		},
		{
			title: 'Contributors',
			text: 'Anyone who wants to contribute to projects or help improve the platform.'
		},
		{
			title: 'Organizations',
			text: 'Non-profit organizations, government agencies, or companies working on digital initiatives.'
		},
		{
			title: 'Technology enthusiasts',
			text: 'Individuals interested in open source technology and community building.'
		}
	];

	const requestDetails = [
		'Your name and brief background',
		'Preferred username for your OpenBayan email account',
		'Your interest in open source technology or community projects',
		'Links to your projects, contributions, or relevant work (optional)',
		'GitHub username (if you want organization access)',
		"How you'd like to contribute to the OpenBayan community"
	];

	const mailServers = [
		{
			title: 'Incoming mail (IMAP/POP3)',
			settings: [
				{ name: 'IMAP Server', value: 'mail.openbayan.org' },
				{ name: 'IMAP SSL Port', value: '993' },
				{ name: 'IMAP Non-SSL Port', value: '143' },
				{ name: 'POP3 SSL Port', value: '995' },
				{ name: 'POP3 Non-SSL Port', value: '110' }
			]
		},
		{
			title: 'Outgoing mail (SMTP)',
			settings: [
				{ name: 'SMTP Server', value: 'mail.openbayan.org' },
				{ name: 'SMTP SSL Port', value: '465' },
				{ name: 'SMTP STARTTLS Port', value: '587' },
				{ name: 'SMTP Non-SSL Port', value: '25' }
			]
		}
	];

	const recommended = [
		{ lead: 'Use IMAP instead of POP3', text: 'for better synchronization across devices' },
		{
			lead: 'Enable SSL/TLS encryption',
			text: 'for secure connections (ports 993 for IMAP, 465 for SMTP)'
		},
		{
			lead: 'Use STARTTLS on port 587',
			text: "if your client doesn't support SSL on port 465"
		},
		{ lead: 'Authentication required', text: 'for both incoming and outgoing mail' }
	];

	const benefits = [
		{
			title: 'OpenBayan Email Account',
			text: 'Your own @openbayan.org email address for community activities and professional use.'
		},
		{
			title: 'GitHub Organization Access',
			text: 'Direct access to our GitHub organization for contributing to projects and repositories.'
		},
		{
			title: 'Community Coordination',
			text: 'Join our internal coordination channels and planning discussions.'
		},
		{
			title: 'Early Access',
			text: 'Be the first to know about new features, projects, and community initiatives.'
		}
	];

	const rules = [
		{
			title: '400 outbound emails per hour maximum',
			detail: 'This helps prevent our domain from being flagged as spam'
		},
		{
			title: 'No marketing emails',
			detail:
				'Use your OpenBayan email only for community activities and professional correspondence'
		},
		{
			title: 'Do not circumvent rules 1 and 2',
			detail: 'No workarounds or attempts to bypass these limitations'
		},
		{
			title: 'Maintain our reputation',
			detail: 'Violations hurt our email deliverability and affect the entire community'
		},
		{
			title: 'Change your password immediately',
			detail: 'Update your credentials after receiving the initial login details'
		}
	];
</script>

<Meta title="Email Activation" description={summary} />

<div class="page">
	<h1 class="poster">Email activation</h1>
	<p class="lead">{summary}</p>
	<p class="actions">
		<a class="button" href="mailto:{activationEmail}">Send activation request</a>
	</p>

	<div class="prose">
		<p>
			Email activation is available for anyone who wants to be more involved in the OpenBayan
			community.
		</p>
		<p>
			<strong>Quick turnaround:</strong> We'll try to activate your account within 2-3 days at most.
			Usually much faster!
		</p>

		<h2>Who can request activation?</h2>
		{#each eligible as group (group.title)}
			<h3>{group.title}</h3>
			<p>{group.text}</p>
		{/each}

		<h2>How to request activation</h2>
		<p>
			Send an email to <a href="mailto:{activationEmail}">{activationEmail}</a> with the following information:
		</p>
		<ul>
			{#each requestDetails as detail (detail)}
				<li>{detail}</li>
			{/each}
		</ul>

		<h2>Setting up with an email client</h2>
		<p>
			<strong>Server Configuration:</strong> Use these settings to configure your email client (Outlook,
			Thunderbird, Apple Mail, etc.) with your OpenBayan email account.
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

	<div class="prose">
		<h3>Recommended settings</h3>
		<ul>
			{#each recommended as item (item.lead)}
				<li><strong>{item.lead}</strong> {item.text}</li>
			{/each}
		</ul>

		<h2>What activation provides</h2>
		{#each benefits as benefit (benefit.title)}
			<h3>{benefit.title}</h3>
			<p>{benefit.text}</p>
		{/each}

		<h2>Email usage guidelines</h2>
		<p>Important: Please follow these rules to maintain our email reputation</p>
		<ol>
			{#each rules as rule (rule.title)}
				<li><strong>{rule.title}</strong><br />{rule.detail}</li>
			{/each}
		</ol>
	</div>
</div>
