/// <reference types="@sveltejs/kit" />

type Gym = {
  id: string;
  booking_url: string;
  address: string;
  email: string;
  image_url: string;
  instagram_url: string;
  map_url: string;
  name: string;
  phone: string;
  slug: string;
  website_url: string;
};

type Session = {
  id: string;
  spaces: number;
  starts_at: Date;
  ends_at: Date;
  gym: Gym;
};
