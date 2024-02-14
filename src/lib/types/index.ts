type Provider<I extends object, O, E = string> = (
  args: I
) => Promise<import("ts-results").Result<O, E>>;

type UserProfile = Pick<
  import("$lib/models/user/user").TUser,
  | "id"
  | "email"
  | "createdAt"
  | "username"
  | "fullname"
  | "avatarUrl"
  | "onboardingProgress"
>;

// type CurrentWorkspace = {
// 	id: string;
// 	name: string;
// 	slug: string;
// 	avatarUrl: string | null;
// 	createdAt: number;
// 	members: {
// 		id: string;
// 		role: import('$lib/models/workspace/workspace-member').TWorkspaceMember['role'];
// 		username: string;
// 		avatarUrl: string | null;
// 		joinedAt: number;
// 	}[];
// };

export type { Provider, UserProfile };
