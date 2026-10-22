// Core site data. Edit name, links and stack here.
export const site = {
  name: 'Miguel Duran',
  role: 'Computer Engineer',
  // Two GitHub accounts: the first one is the one in use now, the second one is
  // the one from university. The label is translated in src/i18n/ui.ts.
  githubAccounts: [
    { handle: 'MikeDuran23', url: 'https://github.com/MikeDuran23', kind: 'current' },
    { handle: 'MiguelDuranAltes', url: 'https://github.com/MiguelDuranAltes', kind: 'student' },
  ] as { handle: string; url: string; kind: 'current' | 'student' }[],
  // Fill these in and they will appear automatically in the contact section.
  email: '',
  linkedin: 'https://www.linkedin.com/in/miguelduranaltes/',
  // `key` picks the translated label, `href` is the English path (the Spanish one is /es + href).
  nav: [
    { key: 'home', href: '/' },
    { key: 'projects', href: '/projects' },
  ] as { key: 'home' | 'projects'; href: string }[],
  stack: [
    { title: 'Frontend', items: ['Vue.js', 'React', 'Astro', 'Tailwind CSS'] },
    { title: 'Backend', items: ['Java', 'Spring Boot', 'GraphQL', 'JWT'] },
    { title: 'Data', items: ['MongoDB', 'Python'] },
    { title: 'Tools', items: ['Git & GitHub', 'Scrum', 'Figma', 'Postman'] },
  ],
};
