<script>
import router from "@/router";

export default {
  props: ["project", "projects"],
  data() {
    return {
      showDetails: false,
      newClass:
        " text-[#bbb] cursor-pointer hover:text-[#777] hover:scale-105 transition-all",
    };
  },
  methods: {
    changeCompleted() {
      this.project.completed = !this.project.completed;
    },
    edit() {
      const sanitizedTitle = this.project.title.replace(/\s+/g, "");
      router.push("/editProject/" + sanitizedTitle);
    },
  },
};
</script>

<template>
  <div
    class="w-[32rem] h-fit my-3 border-l-[10px] p-3 rounded-lg hover:scale-105 transition-all mx-auto bg-gray-500 bg-opacity-5 backdrop-blur-sm flex flex-col"
    :class="project.completed ? 'border-l-green-600' : 'border-l-red-600'"
  >
    <div class="flex">
      <h1 class="cursor-pointer text-2xl" @click="showDetails = !showDetails">
        {{ project.title }}
      </h1>
      <div class="flex flex-1 justify-end min-w-32 gap-x-3">
        <span
          class="material-icons"
          :class="newClass"
          @click="$emit('delete', project)"
        >
          delete
        </span>
        <span class="material-icons" :class="newClass" @click="edit">
          edit
        </span>
        <span class="material-icons" :class="newClass" @click="changeCompleted">
          done
        </span>
      </div>
    </div>
    <div class="mt-5" v-if="showDetails">{{ project.details }}</div>
  </div>
</template>
