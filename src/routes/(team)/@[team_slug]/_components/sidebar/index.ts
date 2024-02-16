import Nav from './nav.svelte';
import Sidebar from "./sidebar.svelte"

type NavLink = {
	title: string;
	label?: string;
	icon: any;
	active: boolean;
	external?: boolean;
	href: string;
};

type Team = {
	id: string;
	name: string;
	slug: string;
	avatarUrl: string;
};

export {Sidebar, type Team, type NavLink, Nav };
