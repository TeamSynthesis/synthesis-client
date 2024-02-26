import { BoxSelect, LibraryBig, Sparkles } from "lucide-svelte";
import NewProjectModal from "./new-project-modal.svelte";

const createProjectFromOptions: {
  icon: any;
  name: "scratch" | "template" | "ai";
  title: string;
  subTitle: string;
}[] = [
  {
    title: "AI-Assisted",
    subTitle: "Describe your goal and let AI do the heavy lifting for you.",
    icon: Sparkles,
    name: "ai",
  },
  {
    title: "Choose a template",
    subTitle: "Start with a template from our curated list.",
    icon: LibraryBig,
    name: "template",
  },
  {
    title: "Start from scratch",
    subTitle: "Craft and design your own unique project from scratch.",
    icon: BoxSelect,
    name: "scratch",
  },
];

const pages = {
  initial: {
    header: {
      title: "Create a new project",
      description: "Pick an option from below to get started",
    },
  },
  ai: {
    header: {
      title: "Create new project using AI",
      description: "",
    },
  },
  template: {
    header: {
      title: "",
      description: "",
    },
  },
  scratch: {
    header: {
      title: "",
      description: "",
    },
  },
};

export { NewProjectModal, pages, createProjectFromOptions };
