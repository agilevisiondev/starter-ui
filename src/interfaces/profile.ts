interface UserProfile {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  bio: string; //character limit 200 and optional
  links: string; // can be multiple
  font: string;
  theme: string;
  activeModules: string[]; // eg. courses, tests, reports
}
