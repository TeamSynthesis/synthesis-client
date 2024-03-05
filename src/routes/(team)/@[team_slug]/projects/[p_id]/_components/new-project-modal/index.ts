import { BoxSelect, LibraryBig, Sparkles } from "lucide-svelte";
import NewProjectModal from "./new-project-modal.svelte";



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

export { NewProjectModal, pages };
