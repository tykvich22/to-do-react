type GenerateId = () => string;

export const generatedId: GenerateId = () => {
	return new Date().getTime().toString();
};
