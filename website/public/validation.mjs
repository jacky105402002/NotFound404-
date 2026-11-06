export function validateRequest(raw) {
 const data = {name: String(raw.name ?? '').trim(), email: String(raw.email ?? '').trim(), scope: String(raw.scope ?? '').trim(), services: Array.isArray(raw.services) ? raw.services.map(String) : []};
 const errors = {};
 if (!data.name) errors.name = '請填寫您的稱呼。';
 else if (data.name.length > 80) errors.name = '稱呼請勿超過 80 字。';
 if (!data.email) errors.email = '請填寫聯絡電子郵件。';
 else if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = '請填寫有效的電子郵件，例如 name@company.com。';
 if (data.scope.length > 2000) errors.scope = '專案簡述請勿超過 2,000 字。';
 return {data, errors, valid: Object.keys(errors).length === 0};
}

