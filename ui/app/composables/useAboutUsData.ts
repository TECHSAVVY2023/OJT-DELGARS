import aboutUsData from "~/data/about-us.json";

export interface AboutUsStat {
  value: string;
  label: string;
}

export interface AboutUsValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface AboutUsSocialLink {
  name: string;
  url: string;
  icon: string;
}

export const useAboutUsData = () => {
  const data = useState("aboutUs", () => aboutUsData as typeof aboutUsData);

  return {
    hero: computed(() => data.value.hero),
    story: computed(() => data.value.story),
    values: computed(() => data.value.values),
    connect: computed(() => data.value.connect),
  };
};
