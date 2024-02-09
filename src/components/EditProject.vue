<script>
import router from "@/router";
import { projects } from "../projectsData";

export default {
  data() {
    return {
      title: "",
      details: "",
      projects,
      project: null,
      titleError: false,
      detailsError: false,
      titleParams: null,
    };
  },
  mounted() {
    this.titleParams = this.$route.params;
    this.project = this.projects.find((i) => {
      if (i.title.replace(/\s+/g, "") === this.titleParams.title) {
        return i;
      }
    });
    this.title = this.project.title;
    this.details = this.project.details;
  },
  methods: {
    handleUpdateProject() {
      try {
        const trimmedTitle = this.title.trim();
        const trimmedDetails = this.details.trim();

        if (trimmedTitle.length > 0 && trimmedDetails.length > 0) {
          // Find the index of the project to be updated
          const projectIndex = this.projects.findIndex(
            (p) => p.title === this.project.title
          );
          if (projectIndex !== -1) {
            this.projects[projectIndex].title = trimmedTitle;
            this.projects[projectIndex].details = trimmedDetails;
          } else {
            this.projects.push({
              title: trimmedTitle,
              details: trimmedDetails,
              completed: false,
            });
          }
          this.title = "";
          this.details = "";
          this.titleError = false;
          this.detailsError = false;
          router.push("/");
        } else {
          this.titleError = !trimmedTitle;
          this.detailsError = !trimmedDetails;
        }
      } catch (error) {
        console.error("An error occurred while updating the project:", error);
      }
    },
  },
};
</script>
<template>
  <form
    @submit.prevent="handleUpdateProject"
    class="backdrop-blur-md bg-gray-500 bg-opacity-5 shadow-lg flex flex-col py-9 gap-y-9 w-[40rem] m-auto relative top-32 h-fit rounded-xl items-center justify-center"
  >
    <label class="flex flex-col"
      >title
      <input
        v-model="title"
        class="w-96 h-10 rounded-lg backdrop-blur-md bg-green-500 bg-opacity-15 outline-none px-2 py-1 focus:bg-opacity-50"
        type="text"
      />
      <span v-if="titleError" class="text-red-600 text-sm pt-1 pl-1"
        >the title is required</span
      >
    </label>
    <label class="flex flex-col">
      details
      <textarea
        v-model="details"
        class="w-96 rounded-lg backdrop-blur-md bg-green-500 bg-opacity-15 outline-none px-2 py-1 focus:bg-opacity-50"
        cols="30"
        rows="10"
      ></textarea
      ><span v-if="detailsError" class="text-red-600 text-sm pt-1 pl-1"
        >the details is required</span
      >
    </label>
    <button
      class="w-16 h-9 rounded-md text-center hover:scale-105 border-[1px] transition-all hover:text-white hover:bg-opacity-90 hover:bg-green-500"
      type="submit"
    >
      Update
    </button>
  </form>
</template>
