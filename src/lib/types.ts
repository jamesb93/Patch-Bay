export interface PatchData {
	name: string;
	description: string;
	patch: string;
}

export interface PatchObject {
	id: string;
	data: PatchData;
}
