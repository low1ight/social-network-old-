export const required = value => (value || typeof value === 'number' ? undefined : 'Empty');

export const email = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

const maxLength = (max) => (value) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;




export const descriptionMaxLength = maxLength(400);
export const fullNameMaxLength = maxLength(20)