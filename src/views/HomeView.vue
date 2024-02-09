<script>
import { projects } from "../projectsData";
import SingleProject from "../components/SingleProject.vue";
import AddProject from "./AddProject.vue";
export default {
  data() {
    return {
      projects,
      displayedProjects: [],
      searchTerm: "", // New data property for the search term
      activeFilter: "all",
    };
  },
  components: {
    SingleProject,
    AddProject,
  },
  computed: {
    filteredProjects() {
      if (!this.searchTerm) {
        return this.allProjects;
      }
      return this.allProjects.filter((project) =>
        project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    allProjects() {
      return this.projects;
    },
    completedProjects() {
      return this.projects.filter((item) => item.completed === true);
    },
    uncompletedProjects() {
      return this.projects.filter((item) => item.completed === false);
    },
  },
  created() {
    // Set the initial state to show all tasks
    this.showFilteredTasks();
  },
  methods: {
    setActiveFilter(filterType) {
      this.activeFilter = filterType;
      switch (filterType) {
        case "all":
          this.showAllTasks();
          break;
        case "completed":
          this.showCompletedTasks();
          break;
        case "uncompleted":
          this.showUncompletedTasks();
          break;
      }
    },
    showFilteredTasks() {
      this.displayedProjects = this.filteredProjects;
    },
    showAllTasks() {
      this.displayedProjects = this.allProjects;
    },
    showCompletedTasks() {
      this.displayedProjects = this.completedProjects;
    },
    showUncompletedTasks() {
      this.displayedProjects = this.uncompletedProjects;
    },
    handleDelete(i) {
      this.projects = this.projects.filter((item) => {
        return item.title !== i.title;
      });
      // After deleting, reset the displayed projects to reflect the changes
      this.showAllTasks();
    },
  },
};
</script>
<template>
  <div class="py-14 w-full" v-if="$route.path === '/'">
    <div
      class="flex justify-center h-14 gap-x-5 items-center bg-gray-500 bg-opacity-5 z-20 backdrop-blur-sm fixed left-0 right-0"
    >
      <button
        @click="setActiveFilter('all')"
        :class="{ 'border-b-2 border-green-500': activeFilter === 'all' }"
        class="focus:outline-none"
      >
        All Tasks
      </button>
      <button
        @click="setActiveFilter('completed')"
        :class="{ 'border-b-2 border-green-500': activeFilter === 'completed' }"
        class="focus:outline-none"
      >
        Completed
      </button>
      <button
        @click="setActiveFilter('uncompleted')"
        :class="{
          'border-b-2 border-green-500': activeFilter === 'uncompleted',
        }"
        class="focus:outline-none"
      >
        Uncompleted
      </button>
      <input
        type="text"
        placeholder="Search Task..."
        v-model="searchTerm"
        @input="showFilteredTasks"
        class="border-[1px] pl-1 h-8 rounded-md focus:outline-none focus:border-green-600"
      />
    </div>
    <div
      class="overflow-y-auto overflow-x-hidden relative top-14"
      v-for="project in displayedProjects"
      :key="project.title"
    >
      <SingleProject
        :projects="projects"
        :project="project"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>
