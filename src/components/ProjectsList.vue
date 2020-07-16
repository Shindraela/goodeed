<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex v-for="project in allProjects" :key="project._id" xs12 sm6 md4 lg4>
        <v-card>
          <VueSlickCarousel :arrows="false" :dots="true" :autoplay="true">
            <div v-for="(img, index) in project.photos" :key="index">
              <v-img :src="img" aspect-ratio="1"></v-img>
            </div>
          </VueSlickCarousel>
          <v-card-title primary-title>{{ project.title }}</v-card-title>
          <v-card-subtitle>{{ project.description }}</v-card-subtitle>

          <v-card-text class="d-flex justify-space-between">
            <div>
              <b>{{ project.donation_current }}</b>&nbsp;<span>donateurs</span>
            </div>
            <div>
              <b>{{ project.donation_goal }}</b>&nbsp;<span>dons</span>
            </div>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="blue" @click="singleProject(project.asso_id)">Donner gratuitement</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: "ProjectsList",
  components: {
    VueSlickCarousel
  },
  computed: {
    allProjects() {
      return this.$store.getters.allProjects;
    }
  },
  methods: {
    ...mapActions([
      "getProjects"
    ]),
    singleProject(id) {
      this.$router.push("/project/" + id);
    }
  }
};
</script>
