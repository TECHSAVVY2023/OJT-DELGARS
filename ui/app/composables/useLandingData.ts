import landingData from "~/data/landing.json";

export interface NavLink {
  label: string;
  href: string;
}

export interface TrustReason {
  icon: string;
  title: string;
  description: string;
}

export interface BrowseCategory {
  id: number;
  name: string;
  image: string;
  backTitle: string;
  backSubtitle: string;
}

export interface CatalogProduct {
  id: number;
  category: string;
  categoryClass: string;
  subcategory: string;
  name: string;
  price: string;
  stock: number;
  image: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export const useLandingData = () => {
  const data = useState("landing", () => landingData as typeof landingData);

  return {
    site: computed(() => data.value.site),
    nav: computed(() => data.value.nav),
    hero: computed(() => data.value.hero),
    trust: computed(() => data.value.trust),
    browseCategories: computed(() => data.value.browseCategories),
    catalog: computed(() => data.value.catalog),
    about: computed(() => data.value.about),
    contact: computed(() => data.value.contact),
    footer: computed(() => data.value.footer),
    fab: computed(() => data.value.fab),
  };
};
