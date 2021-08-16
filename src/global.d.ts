/// <reference types="@sveltejs/kit" />

type Gym = {
  id: string;
  address: string;
  email: string;
  name: string;
  phone: string;
  slug: string;
};

type Session = {
  id: string;
  spaces: number;
  starts_at: Date;
  ends_at: Date;
  gym: Gym;
};
