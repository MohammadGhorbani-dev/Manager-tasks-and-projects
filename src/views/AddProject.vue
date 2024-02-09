<script>
import { projects } from "../projectsData";
import router from "@/router";

export default {
  data() {
    return {
      title: "",
      details: "",
      projects,
      titleError: false,
      detailsError: false,
    };
  },
  methods: {
    handleAddProject() {
      try {
        const trimmedTitle = this.title.trim();
        const trimmedDetails = this.details.trim();

        if (trimmedTitle.length > 0 && trimmedDetails.length > 0) {
          this.projects.push({
            title: trimmedTitle,
            details: trimmedDetails,
            completed: false,
          });
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
        console.error("An error occurred while adding the project:", error);
      }
    },
    handleCancel() {
      this.title = "";
      this.details = "";
      this.titleError = false;
      this.detailsError = false;
      router.push("/");
    },
  },
};
</script>
<template>
  <form
    @submit.prevent="handleAddProject"
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
        rows="6"
      ></textarea
      ><span v-if="detailsError" class="text-red-600 text-sm pt-1 pl-1"
        >the details is required</span
      >
    </label>
    <div class="flex gap-x-10">
      <button
        class="w-16 h-9 rounded-md text-center hover:scale-105 border-[1px] transition-all hover:text-white hover:bg-opacity-90 hover:bg-red-500"
        type="button"
        @click="handleCancel"
      >
        Cancel
      </button>
      <button
        class="w-16 h-9 rounded-md text-center hover:scale-105 border-[1px] transition-all hover:text-white hover:bg-opacity-90 hover:bg-green-500"
        type="submit"
      >
        Add
      </button>
    </div>
  </form>
</template>
