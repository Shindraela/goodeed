<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex v-for="(project, projectIndex) in allProjects" :key="project._id" xs12 sm6 md4 lg4>
        <v-card>
          <VueSlickCarousel :arrows="false" :dots="true" :autoplay="true">
            <div v-for="(img, index) in project.photos" :key="index">
              <v-img :src="img" aspect-ratio="1"></v-img>
            </div>
          </VueSlickCarousel>
          <v-card-title primary-title>{{ project.title }}</v-card-title>
          <v-card-subtitle>{{ project.description }}</v-card-subtitle>

          <v-card-text class="d-flex flex-column">
            <div v-for="(percentage, index) in percentages" :key="index">
              <div v-if="index === projectIndex">
                <div class="d-flex flex-row justify-space-between">
                  <div>
                    <b>{{ project.donation_current }}</b>&nbsp;<span>donateurs</span>
                  </div>
                  <div>
                    <b>{{ percentage }}</b>&nbsp;<span>%</span>
                  </div>
                </div>


                <v-progress-linear class="justify-center" rounded height="4" :value="percentage"></v-progress-linear>
              </div>
            </div>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="blue" @click="singleProject(project._id)">Donner gratuitement</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: "ProjectsList",
  components: {
    VueSlickCarousel
  },
  computed: {
    ...mapGetters([
      "allProjects",
      "percentages",
    ])
  },
  methods: {
    ...mapActions([
      "getProjects",
    ]),
    singleProject(id) {
      this.$router.push("/project/" + id);
    }
  }
};
</script>
